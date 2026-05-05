/** @format */

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700 ${className}`}>
    {children}
  </span>
);

export default Badge;
