"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import { CHARGER_TYPES, POWER_OUTPUTS } from "@/schemas/chargerSchema";
import type { Charger } from "@/types/charger";

interface ChargerListItemProps {
  charger: Charger;
}

function ChargerListItem({ charger }: ChargerListItemProps) {
  const chargerTypeLabel =
    CHARGER_TYPES.find((t) => t.value === charger.charger_type)?.label ||
    charger.charger_type;
  
  const powerOutputLabel =
    POWER_OUTPUTS.find((p) => p.value === charger.power_output)?.label ||
    `${charger.power_output} kW`;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] hover:border-[#d9f99d] hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto bg-[#F9F9F9] shrink-0">
          {charger.photo_url ? (
            <Image
              src={charger.photo_url}
              alt={charger.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🔌</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <Typography variant="h4" weight={600} className="text-black-900">
                {charger.title}
              </Typography>
              <Typography variant="chip" className="text-black-500 mt-1">
                {charger.address}
              </Typography>
              {charger.host && (
                <Typography variant="chip" className="text-black-400 mt-1">
                  Hosted by {charger.host.name}
                </Typography>
              )}
            </div>
            <div className="text-right">
              <Typography variant="h3" weight={600} className="text-[#365314]">
                ₹{charger.price_per_hour}
              </Typography>
              <Typography variant="chip" className="text-black-500">
                per hour
              </Typography>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#ECF5FF] text-[#2C7FFF] text-xs font-medium rounded-full">
              {chargerTypeLabel}
            </span>
            <span className="px-3 py-1 bg-[#f5f9f0] text-[#365314] text-xs font-medium rounded-full">
              {powerOutputLabel}
            </span>
            <span className="px-3 py-1 bg-[#F9F9F9] text-black-600 text-xs font-medium rounded-full">
              {charger.available_start} - {charger.available_end}
            </span>
            <span className="px-3 py-1 bg-[#F9F9F9] text-black-600 text-xs font-medium rounded-full">
              📍 {charger.pincode}
            </span>
          </div>

          {/* Action */}
          <div className="flex justify-end mt-auto">
            <Link href={`/driver/charger/${charger.id}`}>
              <Button
                text="View Details"
                bg="#d9f99d"
                color="#101010"
                hoverBg="#bef264"
                variant="sm"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(ChargerListItem);