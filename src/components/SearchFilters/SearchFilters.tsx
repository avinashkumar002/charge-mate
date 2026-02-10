"use client";
import { memo, useCallback } from "react";
import Typography from "@/components/Typography/Typography";
import SelectGroup from "@/components/SelectGroup/SelectGroup";
import { CHARGER_TYPES, POWER_OUTPUTS } from "@/schemas/chargerSchema";

interface SearchFiltersProps {
  filters: {
    pincode: string;
    charger_type: string;
    min_price: string;
    max_price: string;
    min_power: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
}

const PRICE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "25", label: "₹25" },
  { value: "50", label: "₹50" },
  { value: "75", label: "₹75" },
  { value: "100", label: "₹100" },
  { value: "150", label: "₹150" },
  { value: "200", label: "₹200" },
];

function SearchFilters({ filters, onFilterChange, onClear }: SearchFiltersProps) {
  const chargerTypeOptions = [
    { value: "", label: "All Types" },
    ...CHARGER_TYPES.map((type) => ({
      value: type.value,
      label: type.label,
    })),
  ];

  const powerOptions = [
    { value: "", label: "Any Power" },
    ...POWER_OUTPUTS.map((power) => ({
      value: String(power.value),
      label: power.label,
    })),
  ];

  const handleInputChange = useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onFilterChange(key, e.target.value);
    },
    [onFilterChange]
  );

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" weight={600} className="text-black-900">
          Filters
        </Typography>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-[#2C7FFF] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Pincode Search */}
        <div className="flex flex-col gap-1.5">
          <Typography variant="chip" weight={500} className="text-black-700">
            Pincode
          </Typography>
          <input
            type="text"
            placeholder="Enter pincode"
            value={filters.pincode}
            onChange={handleInputChange("pincode")}
            maxLength={6}
            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314]"
          />
        </div>

        {/* Charger Type */}
        <div className="flex flex-col gap-1.5">
          <Typography variant="chip" weight={500} className="text-black-700">
            Charger Type
          </Typography>
          <select
            value={filters.charger_type}
            onChange={handleInputChange("charger_type")}
            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer"
          >
            {chargerTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col gap-1.5">
          <Typography variant="chip" weight={500} className="text-black-700">
            Min Price
          </Typography>
          <select
            value={filters.min_price}
            onChange={handleInputChange("min_price")}
            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-1.5">
          <Typography variant="chip" weight={500} className="text-black-700">
            Max Price
          </Typography>
          <select
            value={filters.max_price}
            onChange={handleInputChange("max_price")}
            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Power */}
        <div className="flex flex-col gap-1.5">
          <Typography variant="chip" weight={500} className="text-black-700">
            Min Power
          </Typography>
          <select
            value={filters.min_power}
            onChange={handleInputChange("min_power")}
            className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-sm font-medium text-black-800 outline-none focus:border-[#365314] cursor-pointer"
          >
            {powerOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent re-renders when parent state changes
export default memo(SearchFilters);