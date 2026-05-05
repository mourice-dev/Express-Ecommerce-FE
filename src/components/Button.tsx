/** @format */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer";
  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30",
    secondary:
      "bg-white text-orange-600 border-2 border-orange-100 hover:border-orange-500",
    ghost:
      "bg-transparent text-gray-600 hover:bg-orange-50 hover:text-orange-600",
    outline:
      "border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
