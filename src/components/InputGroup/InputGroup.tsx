"use client";

import { useState } from "react";

interface InputGroupProps {
  placeholder?: string;
  type?: string;
  Icon: React.FC<{ stroke: string }>;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

const InputGroup: React.FC<InputGroupProps> = ({ placeholder = "Your name", type = "text", Icon, error,
  register, }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const strokeColor = isFocused || value ? "#365314" : "#727272";

  return (
    <div className="flex flex-col gap-1">
      {/* Wrapper */}
      <div
        className={`py-[15px] px-[18px] md:p-[18px] border-[1.5px] rounded-xl flex gap-2.5 items-center ${error ? "border-red-500" : "border-[#365314]"
          }`}
      >
        <div className="min-w-5">
          <Icon stroke={strokeColor} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          {...register} // RHF registration
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="placeholder:text-[#727272] placeholder:text-[16px] [@media(max-width:390px)]:placeholder:text-[12px] outline-none text-lime-900 flex-1"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputGroup;
