import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import { CHARGER_TYPES, POWER_OUTPUTS } from "@/schemas/chargerSchema";

interface Charger {
  id: string;
  title: string;
  address: string;
  pincode: string;
  price_per_hour: number;
  charger_type: string;
  power_output: number;
  available_start: string;
  available_end: string;
  status: string;
  photo_url?: string | null;
}

interface ChargerCardProps {
  charger: Charger;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ChargerCard({ charger, onEdit, onDelete }: ChargerCardProps) {
  const chargerTypeLabel = CHARGER_TYPES.find(t => t.value === charger.charger_type)?.label || charger.charger_type;
  const powerOutputLabel = POWER_OUTPUTS.find(p => p.value === charger.power_output)?.label || `${charger.power_output} kW`;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] hover:border-[#d9f99d] transition-colors">
      {/* Image Section */}
      {charger.photo_url && (
        <div className="relative w-full h-48 bg-[#F9F9F9]">
          <Image
            src={charger.photo_url}
            alt={charger.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h4" weight={600} className="text-black-900">
              {charger.title}
            </Typography>
            <Typography variant="chip" className="text-black-500 mt-1">
              {charger.address}
            </Typography>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            charger.status === "active" 
              ? "bg-green-100 text-green-700" 
              : "bg-gray-100 text-gray-600"
          }`}>
            {charger.status === "active" ? "Active" : "Paused"}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#F9F9F9] rounded-lg p-3">
            <Typography variant="chip" className="text-black-500">
              Price
            </Typography>
            <Typography variant="para" weight={600} className="text-black-900">
              ₹{charger.price_per_hour}/hr
            </Typography>
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-3">
            <Typography variant="chip" className="text-black-500">
              Type
            </Typography>
            <Typography variant="para" weight={600} className="text-black-900">
              {chargerTypeLabel}
            </Typography>
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-3">
            <Typography variant="chip" className="text-black-500">
              Power
            </Typography>
            <Typography variant="para" weight={600} className="text-black-900">
              {powerOutputLabel}
            </Typography>
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-3">
            <Typography variant="chip" className="text-black-500">
              Hours
            </Typography>
            <Typography variant="para" weight={600} className="text-black-900">
              {charger.available_start} - {charger.available_end}
            </Typography>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            text="Edit"
            bg="#FFFFFF"
            color="#365314"
            hoverBg="#F9F9F9"
            variant="sm"
            boxShadow="inset 0 0 0 1px #E5E5E5"
            onClick={() => onEdit?.(charger.id)}
          />
          <Button
            text="Delete"
            bg="#FFFFFF"
            color="#DC2626"
            hoverBg="#FEE2E2"
            variant="sm"
            boxShadow="inset 0 0 0 1px #E5E5E5"
            onClick={() => onDelete?.(charger.id)}
          />
        </div>
      </div>
    </div>
  );
}