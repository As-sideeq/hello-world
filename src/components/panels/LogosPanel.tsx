"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { GoldButton } from "@/components/ui/GoldButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { LogoItem, LogoPlacement } from "@/types/configurator";

const PLACEMENTS: Array<{ value: LogoPlacement; label: string }> = [
  { value: "frontChest", label: "Front Chest" },
  { value: "back", label: "Back" },
  { value: "leftSleeve", label: "Left Sleeve" },
  { value: "rightSleeve", label: "Right Sleeve" },
];

function LogoCard({ logo }: { logo: LogoItem }) {
  const updateLogo = useConfiguratorStore((s) => s.updateLogo);
  const removeLogo = useConfiguratorStore((s) => s.removeLogo);
  const selectedLogoId = useConfiguratorStore((s) => s.selectedLogoId);
  const setSelectedLogo = useConfiguratorStore((s) => s.setSelectedLogo);
  const isSelected = selectedLogoId === logo.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={() => setSelectedLogo(isSelected ? null : logo.id)}
      className="p-3 rounded-xl cursor-pointer transition-all"
      style={{
        background: isSelected ? "rgba(212,175,55,0.08)" : "#0a1525",
        border: `1px solid ${isSelected ? "rgba(212,175,55,0.4)" : "#1a2535"}`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
          style={{ background: "#0b1220", border: "1px solid #1a2535" }}
        >
          <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">{logo.name}</p>
          <p className="text-[10px] text-[#556677] mt-0.5">
            {PLACEMENTS.find((p) => p.value === logo.placement)?.label}
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); removeLogo(logo.id); }}
          className="w-6 h-6 rounded-full flex items-center justify-center text-[#556677] hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {isSelected && (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] text-[#556677] block mb-1">Placement</label>
            <select
              value={logo.placement}
              onChange={(e) => updateLogo(logo.id, { placement: e.target.value as LogoPlacement })}
              className="w-full text-xs"
            >
              {PLACEMENTS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-[#556677] block mb-1">
              Scale: {logo.scale.toFixed(1)}x
            </label>
            <input
              type="range" min="0.1" max="3" step="0.1"
              value={logo.scale}
              onChange={(e) => updateLogo(logo.id, { scale: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-[10px] text-[#556677] block mb-1">
              Opacity: {Math.round(logo.opacity * 100)}%
            </label>
            <input
              type="range" min="0.1" max="1" step="0.05"
              value={logo.opacity}
              onChange={(e) => updateLogo(logo.id, { opacity: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-[10px] text-[#556677] block mb-1">
              Rotation: {logo.rotation}°
            </label>
            <input
              type="range" min="-180" max="180" step="5"
              value={logo.rotation}
              onChange={(e) => updateLogo(logo.id, { rotation: parseInt(e.target.value) })}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function LogosPanel() {
  const logos = useConfiguratorStore((s) => s.config.logos);
  const addLogo = useConfiguratorStore((s) => s.addLogo);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      const newLogo: LogoItem = {
        id: crypto.randomUUID(),
        url,
        placement: "frontChest",
        x: 0.5,
        y: 0.35,
        scale: 1,
        rotation: 0,
        opacity: 1,
        name: file.name.replace(/\.[^/.]+$/, ""),
      };
      addLogo(newLogo);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileRef.current?.click()}
        className="w-full p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-[#d4af37]/50 hover:bg-[rgba(212,175,55,0.03)]"
        style={{ borderColor: "rgba(212,175,55,0.2)" }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.1)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm text-white font-medium">Upload Logo</p>
          <p className="text-[10px] text-[#556677]">PNG, JPG, SVG supported</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.webp"
          onChange={handleFileChange}
        />
      </div>

      {logos.length > 0 && (
        <div>
          <SectionLabel>{logos.length} Logo{logos.length !== 1 ? "s" : ""} Added</SectionLabel>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {logos.map((logo) => (
                <LogoCard key={logo.id} logo={logo} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {logos.length === 0 && (
        <p className="text-center text-[#556677] text-xs py-4">
          Upload logos to place them on your jersey
        </p>
      )}
    </div>
  );
}
