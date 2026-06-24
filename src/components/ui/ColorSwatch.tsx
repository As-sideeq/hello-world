"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";

interface ColorSwatchProps {
  color: string;
  onChange: (color: string) => void;
  size?: "sm" | "md";
}

const PRESET_COLORS = [
  "#0d0d0d",
  "#ffffff",
  "#1a3a6b",
  "#c0392b",
  "#27ae60",
  "#d4af37",
  "#8e44ad",
  "#e67e22",
  "#2c3e50",
  "#16a085",
];

export function ColorSwatch({ color, onChange, size = "md" }: ColorSwatchProps) {
  const [open, setOpen] = useState(false);
  const sizeClass = size === "sm" ? "w-7 h-7" : "w-9 h-9";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`${sizeClass} rounded-full border-2 transition-all duration-200 hover:scale-110 cursor-pointer`}
        style={{
          backgroundColor: color,
          borderColor: open ? "#d4af37" : "rgba(255,255,255,0.15)",
          boxShadow: open ? "0 0 0 3px rgba(212,175,55,0.25)" : "none",
        }}
      />

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 z-50 p-3 rounded-xl shadow-2xl"
              style={{
                background: "#0b1220",
                border: "1px solid rgba(212,175,55,0.25)",
                minWidth: "220px",
              }}
            >
              <HexColorPicker color={color} onChange={onChange} style={{ width: "100%" }} />
              <div className="mt-3 grid grid-cols-5 gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => { onChange(c); setOpen(false); }}
                    className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      borderColor: color === c ? "#d4af37" : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
              <input
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 w-full text-xs font-mono"
                placeholder="#000000"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
