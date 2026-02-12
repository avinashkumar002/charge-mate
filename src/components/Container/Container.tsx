import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  pl?: string; 
  pr?: string; 
}

const Container: React.FC<ContainerProps> = ({ children, className = "",pl = "pl-6",
  pr = "pr-6", }) => {
  return (
    <div
      className={`
        mx-auto w-full ${pl} ${pr}
        sm:max-w-xl
        md:max-w-3xl
        lg:max-w-248
        xl:max-w-300
        2xl:max-w-302
        ${className}
      `}
      style={{
        maxWidth: "1208px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Container;


