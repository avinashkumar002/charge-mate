"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { bookingApi } from "@/store/services/bookingApi";
import { isSelfMutated } from "@/lib/realtimeUtils";
import toast from "react-hot-toast";

export default function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [hostChargerIds, setHostChargerIds] = useState<string[]>([]);
  const [isRealtimeReady, setIsRealtimeReady] = useState(false);

  // 🔐 SET AUTH TOKEN - This is critical!
  useEffect(() => {
    if (!user?.id) {
      setIsRealtimeReady(false);
      return;
    }

    const setRealtimeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        console.log("[RT] 🔐 Setting auth for user:", user.id, "role:", user.role);
        supabase.realtime.setAuth(session.access_token);
        setIsRealtimeReady(true);
      } else {
        console.warn("[RT] ⚠️ No session token");
      }
    };

    setRealtimeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.access_token) {
          console.log("[RT] 🔄 Auth refreshed");
          supabase.realtime.setAuth(session.access_token);
          setIsRealtimeReady(true);
        } else {
          setIsRealtimeReady(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, user?.role]);

  // Fetch host's charger IDs once
  useEffect(() => {
    if (user?.role !== "host" || !user?.id) return;

    fetch(`/api/chargers?hostId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ids = data.map((c: any) => c.id);
          setHostChargerIds(ids);
          console.log("[RT] 📋 Host charger IDs loaded:", ids);
        }
      })
      .catch((err) => console.error("[RT] Failed to fetch charger IDs:", err));
  }, [user?.id, user?.role]);

  // Driver: listen for status changes on their bookings
  useEffect(() => {
    if (!user?.id || user?.role !== "driver" || !isRealtimeReady) return;

    console.log("[RT] 👤 Driver subscribing to channel...");

    const channel = supabase
      .channel(`driver-bookings-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Booking",
          filter: `driver_id=eq.${user.id}`,
        },
        (payload: any) => {
          console.log("[RT] 📨 Driver received UPDATE:", payload);

          const bookingId = payload.new?.id;
          const newStatus = payload.new?.status;

          dispatch(
            bookingApi.util.invalidateTags([
              { type: "BookingList", id: "DRIVER" },
              ...(bookingId ? [{ type: "Booking" as const, id: bookingId }] : []),
            ])
          );

          if (isSelfMutated(bookingId)) {
            console.log("[RT] ⏭️ Skipping self-mutation");
            return;
          }

          if (newStatus === "confirmed") {
            toast.success("Your booking has been accepted! 🎉");
          } else if (newStatus === "cancelled") {
            toast.error("Your booking has been rejected");
          }
        }
      )
      .subscribe((status) => {
        console.log("[RT] Driver channel status:", status);
      });

    return () => {
      console.log("[RT] 🔌 Driver unsubscribing");
      supabase.removeChannel(channel);
    };
  }, [user?.id, user?.role, isRealtimeReady, dispatch]);

// Host: listen for new bookings and cancellations
useEffect(() => {
  if (!user?.id || user?.role !== "host" || !isRealtimeReady) {
    console.log("[RT] 🏠 Host channel waiting... ready:", isRealtimeReady, "user:", !!user?.id);
    return;
  }

  if (hostChargerIds.length === 0) {
    console.log("[RT] 🏠 Host channel waiting... no chargers yet");
    return;
  }

  console.log("[RT] 🏠 Host subscribing to channel for chargers:", hostChargerIds);

  const channel = supabase
    .channel(`host-bookings-${user.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "Booking",
      },
      (payload: any) => {
        console.log("[RT] 📨 Host received INSERT - FULL PAYLOAD:", JSON.stringify(payload, null, 2));
        console.log("[RT] 🔍 payload.new:", payload.new);
        console.log("[RT] 🔍 Charger ID:", payload.new?.charger_id);
        console.log("[RT] 🔍 All keys in payload.new:", Object.keys(payload.new || {}));
        console.log("[RT] 🔍 My chargers:", hostChargerIds);

        if (hostChargerIds.includes(payload.new?.charger_id)) {
          console.log("[RT] ✅ Match! Showing toast");
          dispatch(
            bookingApi.util.invalidateTags([
              { type: "HostBookingList", id: "HOST" },
            ])
          );
          toast.success("New booking request received! ⚡");
        } else {
          console.log("[RT] ⏭️ Skipping - not our charger");
        }
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "Booking",
      },
      (payload: any) => {
        console.log("[RT] 📨 Host received UPDATE:", payload);

        if (!hostChargerIds.includes(payload.new?.charger_id)) {
          console.log("[RT] ⏭️ Skipping - not our charger");
          return;
        }

        const bookingId = payload.new?.id;

        dispatch(
          bookingApi.util.invalidateTags([
            { type: "HostBookingList", id: "HOST" },
          ])
        );

        if (isSelfMutated(bookingId)) {
          console.log("[RT] ⏭️ Skipping self-mutation");
          return;
        }

        if (payload.new?.status === "cancelled") {
          toast.error("A booking was cancelled by the driver");
        }
      }
    )
    .subscribe((status) => {
      console.log("[RT] Host channel status:", status);
    });

  return () => {
    console.log("[RT] 🔌 Host unsubscribing");
    supabase.removeChannel(channel);
  };
}, [user?.id, user?.role, isRealtimeReady, hostChargerIds, dispatch]); // ← Added hostChargerIds here

  return <>{children}</>;
}