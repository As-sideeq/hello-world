"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { NumberStyle } from "@/types/configurator";

const NUMBER_STYLES: Array<{ value: NumberStyle; label: string }> = [
  { value: "solid", label: "Solid" },
  { value: "outline", label: "Outline" },
  { value: "shadow", label: "Shadow" },
  { value: "collegiate", label: "Collegiate" },
];

const NUMBER_FONTS = [
  "Arial Black",
  "Impact",
  "Oswald",
  "Anton",
  "Bebas Neue",
];

export function NumbersPanel() {
  const numbers = useConfiguratorStore((s) => s.config.numbers);
  const updateNumbers = useConfiguratorStore((s) => s.updateNumbers);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: "front" as const, label: "Front" },
          { key: "back" as const, label: "Back" },
          { key: "sleeve" as const, label: "Sleeve" },
        ].map(({ key, label }) => (
          <div key={key}>
            <SectionLabel>{label}</SectionLabel>
            <input
              type="text"
              value={numbers[key]}
              onChange={(e) => updateNumbers({ [key]: e.target.value.slice(0, 3) })}
              placeholder="–"
              maxLength={3}
              className="text-center text-lg font-bold"
            />
          </div>
        ))}
      </div>

      <div>
        <SectionLabel>Number Font</SectionLabel>
        <select value={numbers.font} onChange={(e) => updateNumbers({ font: e.target.value })}>
          {NUMBER_FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <SectionLabel>Style</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {NUMBER_STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateNumbers({ style: s.value })}
              className="py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={{
                background: numbers.style === s.value ? "rgba(212,175,55,0.15)" : "#0a1525",
                border: `1px solid ${numbers.style === s.value ? "#d4af37" : "#1a2535"}`,
                color: numbers.style === s.value ? "#d4af37" : "#8899aa",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <SectionLabel>Number Color</SectionLabel>
          <ColorSwatch
            color={numbers.color}
            onChange={(color) => updateNumbers({ color })}
          />
        </div>
        <div>
          <SectionLabel>Outline Color</SectionLabel>
          <ColorSwatch
            color={numbers.strokeColor}
            onChange={(strokeColor) => updateNumbers({ strokeColor })}
          />
        </div>
      </div>

      <div>
        <SectionLabel>Font Size: {numbers.fontSize}px</SectionLabel>
        <input
          type="range" min="40" max="200" step="5"
          value={numbers.fontSize}
          onChange={(e) => updateNumbers({ fontSize: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <SectionLabel>Stroke Width: {numbers.strokeWidth}px</SectionLabel>
        <input
          type="range" min="0" max="10" step="0.5"
          value={numbers.strokeWidth}
          onChange={(e) => updateNumbers({ strokeWidth: parseFloat(e.target.value) })}
        />
      </div>
    </div>
  );
}
