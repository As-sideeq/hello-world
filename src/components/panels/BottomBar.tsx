"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { GoldButton } from "@/components/ui/GoldButton";
import type { CameraView } from "@/types/configurator";

const THUMB_VIEWS: Array<{ id: CameraView; label: string }> = [
  { id: "front", label: "FRONT" },
  { id: "back", label: "BACK" },
  { id: "left", label: "LEFT" },
  { id: "right", label: "RIGHT" },
];

export function BottomBar() {
  const getPrice = useConfiguratorStore((s) => s.getPrice);
  const addToCart = useConfiguratorStore((s) => s.addToCart);
  const setCameraView = useConfiguratorStore((s) => s.setCameraView);
  const cameraView = useConfiguratorStore((s) => s.cameraView);
  const config = useConfiguratorStore((s) => s.config);
  const price = getPrice();

  return (
    <div
      className="flex items-center gap-4 px-6 py-3"
      style={{ background: "#0b1220", borderTop: "1px solid #1a2535" }}
    >
      <div className="flex gap-2 overflow-x-auto flex-shrink-0">
        {THUMB_VIEWS.map((view) => (
          <button
            key={view.id}
            onClick={() => setCameraView(view.id)}
            className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center transition-all"
              style={{
                background: "#0a1525",
                border: `2px solid ${cameraView === view.id ? "#d4af37" : "#1a2535"}`,
                boxShadow: cameraView === view.id ? "0 0 12px rgba(212,175,55,0.3)" : "none",
              }}
            >
              <div
                className="w-8 h-10 rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.sidePanel})`,
                  border: `1px solid ${config.colors.accent}30`,
                }}
              />
            </div>
            <span
              className="text-[9px] font-bold tracking-widest"
              style={{ color: cameraView === view.id ? "#d4af37" : "#556677" }}
            >
              {view.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4 flex-shrink-0">
        <div>
          <p className="text-[10px] text-[#556677] tracking-widest uppercase">Total Price</p>
          <motion.p
            key={price.total}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-2xl font-black"
            style={{ color: "#d4af37" }}
          >
            ${price.total}.00
          </motion.p>
        </div>

        <GoldButton size="lg" onClick={addToCart} className="whitespace-nowrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Cart
        </GoldButton>
      </div>
    </div>
  );
}
