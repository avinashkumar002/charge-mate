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

  // Fetch host's charger IDs once (to filter incoming events)
  useEffect(() => {
    if (user?.role !== "host" || !user?.id) return;

    fetch(`/api/chargers?hostId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHostChargerIds(data.map((c: any) => c.id));
        }
      })
      .catch(() => {});
  }, [user?.id, user?.role]);

  // Driver: listen for status changes on their bookings
  useEffect(() => {
    if (!user?.id || user?.role !== "driver") return;

    const channel = supabase
      .channel(`driver-global-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Booking",
          filter: `driver_id=eq.${user.id}`,
        },
        (payload: any) => {
          const bookingId = payload.new?.id;
          const newStatus = payload.new?.status;

          // Always invalidate cache for fresh data
          dispatch(
            bookingApi.util.invalidateTags([
              { type: "BookingList", id: "DRIVER" },
              ...(bookingId
                ? [{ type: "Booking" as const, id: bookingId }]
                : []),
            ])
          );

          // Skip toast if driver initiated this action themselves
          if (isSelfMutated(bookingId)) return;

          if (newStatus === "confirmed") {
            toast.success("Your booking has been accepted! 🎉");
          } else if (newStatus === "cancelled") {
            toast.error("Your booking has been rejected");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, user?.role, dispatch]);

  // Host: listen for new bookings and cancellations on their chargers
  useEffect(() => {
    if (!user?.id || user?.role !== "host" || hostChargerIds.length === 0) return;

    const channel = supabase
      .channel(`host-global-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Booking",
        },
        (payload: any) => {
          if (hostChargerIds.includes(payload.new?.charger_id)) {
            dispatch(
              bookingApi.util.invalidateTags([
                { type: "HostBookingList", id: "HOST" },
              ])
            );
            toast.success("New booking request received! ⚡");
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
          if (!hostChargerIds.includes(payload.new?.charger_id)) return;

          const bookingId = payload.new?.id;

          dispatch(
            bookingApi.util.invalidateTags([
              { type: "HostBookingList", id: "HOST" },
            ])
          );

          // Skip toast if host initiated this action themselves
          if (isSelfMutated(bookingId)) return;

          // Driver cancelled their booking
          if (payload.new?.status === "cancelled") {
            toast.error("A booking was cancelled by the driver");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, user?.role, hostChargerIds, dispatch]);

  return <>{children}</>;
}