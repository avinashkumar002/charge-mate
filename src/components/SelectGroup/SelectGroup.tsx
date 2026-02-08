"use client";
import React from "react";
import Typography from "@/components/Typography/Typography";

interface Option {
  value: string | number;
  label: string;
}

interface SelectGroupProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  error?: string;
  register: any;
  className?: string;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  placeholder = "Select an option",
  options,
  error,
  register,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <Typography variant="chip" weight={500} className="text-black-900">
          {label}
        </Typography>
      )}
      <select
        {...register}
        className={`w-full px-4 py-3.5 bg-[#F9F9F9] border rounded-lg text-sm font-medium text-black-800 outline-none appearance-none cursor-pointer
          ${error ? "border-red-500" : "border-[#F9F9F9] focus:border-[#2C7FFF]"}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <Typography variant="chip" className="text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default SelectGroup;