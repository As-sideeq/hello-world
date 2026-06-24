"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { ColorsPanel } from "./ColorsPanel";
import { LogosPanel } from "./LogosPanel";
import { TextPanel } from "./TextPanel";
import { NumbersPanel } from "./NumbersPanel";
import { SublimationPanel } from "./SublimationPanel";
import { BasePanel } from "./BasePanel";
import { PreviewPanel } from "./PreviewPanel";

const STEP_TITLES: Record<string, string> = {
  base: "Jersey Base",
  colors: "Colors",
  logos: "Logos",
  text: "Text",
  numbers: "Numbers",
  sublimation: "Design Studio",
  preview: "Order Summary",
};

export function RightPanel() {
  const activeStep = useConfiguratorStore((s) => s.activeStep);
  const activeTab = useConfiguratorStore((s) => s.config.activeTab);
  const setActiveTab = useConfiguratorStore((s) => s.setActiveTab);

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex-shrink-0">
        <div className="flex gap-1 p-1 rounded-xl mb-4" style={{ background: "#0a1525", border: "1px solid #1a2535" }}>
          {(["jersey", "shorts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #b8962e, #d4af37)" : "transparent",
                color: activeTab === tab ? "#000" : "#556677",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <h3 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#556677]">
          {STEP_TITLES[activeStep]}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {activeStep === "base" && <BasePanel />}
            {activeStep === "colors" && <ColorsPanel />}
            {activeStep === "logos" && <LogosPanel />}
            {activeStep === "text" && <TextPanel />}
            {activeStep === "numbers" && <NumbersPanel />}
            {activeStep === "sublimation" && <SublimationPanel />}
            {activeStep === "preview" && <PreviewPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
