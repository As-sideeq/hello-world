"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { PatternType } from "@/types/configurator";

const PATTERNS: Array<{ value: PatternType; label: string; icon: string }> = [
  { value: "none", label: "None", icon: "○" },
  { value: "stripes", label: "Stripes", icon: "≡" },
  { value: "diamonds", label: "Diamonds", icon: "◇" },
  { value: "chevron", label: "Chevron", icon: "∧" },
  { value: "hexagon", label: "Hexagon", icon: "⬡" },
  { value: "waves", label: "Waves", icon: "∿" },
  { value: "gradient", label: "Gradient", icon: "◑" },
];

export function SublimationPanel() {
  const sublimation = useConfiguratorStore((s) => s.config.sublimation);
  const updateSublimation = useConfiguratorStore((s) => s.updateSublimation);

  const updatePattern = (updates: Partial<typeof sublimation.pattern>) => {
    updateSublimation({ pattern: { ...sublimation.pattern, ...updates } });
  };

  const updateGradient = (updates: Partial<typeof sublimation.backgroundGradient>) => {
    updateSublimation({
      backgroundGradient: { ...sublimation.backgroundGradient, ...updates },
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <SectionLabel>Pattern</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.value}
              onClick={() => updatePattern({ type: p.value })}
              className="p-2 rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer"
              style={{
                background: sublimation.pattern.type === p.value ? "rgba(212,175,55,0.15)" : "#0a1525",
                border: `1px solid ${sublimation.pattern.type === p.value ? "#d4af37" : "#1a2535"}`,
              }}
            >
              <span className="text-lg" style={{ color: sublimation.pattern.type === p.value ? "#d4af37" : "#556677" }}>
                {p.icon}
              </span>
              <span className="text-[9px] font-semibold" style={{ color: sublimation.pattern.type === p.value ? "#d4af37" : "#556677" }}>
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {sublimation.pattern.type !== "none" && (
        <>
          <div>
            <SectionLabel>Pattern Color</SectionLabel>
            <ColorSwatch
              color={sublimation.pattern.color}
              onChange={(color) => updatePattern({ color })}
            />
          </div>
          <div>
            <SectionLabel>Opacity: {Math.round(sublimation.pattern.opacity * 100)}%</SectionLabel>
            <input
              type="range" min="0.02" max="0.5" step="0.01"
              value={sublimation.pattern.opacity}
              onChange={(e) => updatePattern({ opacity: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <SectionLabel>Scale: {sublimation.pattern.scale.toFixed(1)}x</SectionLabel>
            <input
              type="range" min="0.3" max="3" step="0.1"
              value={sublimation.pattern.scale}
              onChange={(e) => updatePattern({ scale: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <SectionLabel>Rotation: {sublimation.pattern.rotation}°</SectionLabel>
            <input
              type="range" min="-180" max="180" step="5"
              value={sublimation.pattern.rotation}
              onChange={(e) => updatePattern({ rotation: parseInt(e.target.value) })}
            />
          </div>
        </>
      )}

      <div className="pt-2 border-t border-[#1a2535]">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Background Gradient</SectionLabel>
          <button
            onClick={() => updateGradient({ enabled: !sublimation.backgroundGradient.enabled })}
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer"
            style={{ background: sublimation.backgroundGradient.enabled ? "#d4af37" : "#1a2535" }}
          >
            <span
              className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
              style={{ transform: `translateX(${sublimation.backgroundGradient.enabled ? "18px" : "4px"})` }}
            />
          </button>
        </div>

        {sublimation.backgroundGradient.enabled && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-[#556677] mb-2">Start Color</p>
                <ColorSwatch
                  color={sublimation.backgroundGradient.color1}
                  onChange={(c) => updateGradient({ color1: c })}
                />
              </div>
              <div>
                <p className="text-[10px] text-[#556677] mb-2">End Color</p>
                <ColorSwatch
                  color={sublimation.backgroundGradient.color2}
                  onChange={(c) => updateGradient({ color2: c })}
                />
              </div>
            </div>
            <div>
              <SectionLabel>Angle: {sublimation.backgroundGradient.angle}°</SectionLabel>
              <input
                type="range" min="0" max="360" step="5"
                value={sublimation.backgroundGradient.angle}
                onChange={(e) => updateGradient({ angle: parseInt(e.target.value) })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
