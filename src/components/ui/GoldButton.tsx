"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function GoldButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
  icon,
}: GoldButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: `bg-gradient-to-r from-[#b8962e] via-[#d4af37] to-[#f0d27a] text-black font-bold
      hover:from-[#d4af37] hover:via-[#f0d27a] hover:to-[#d4af37]
      shadow-[0_4px_20px_rgba(212,175,55,0.35)]
      hover:shadow-[0_6px_30px_rgba(212,175,55,0.55)]`,
    secondary: `bg-transparent border border-[#d4af37] text-[#d4af37] font-semibold
      hover:bg-[rgba(212,175,55,0.1)]
      hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]`,
    ghost: `bg-transparent text-[#8899aa] font-medium
      hover:text-[#d4af37] hover:bg-[rgba(212,175,55,0.05)]`,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg
        tracking-wider uppercase transition-all duration-200
        ${sizes[size]} ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
