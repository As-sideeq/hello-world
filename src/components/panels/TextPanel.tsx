"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { SectionLabel } from "@/components/ui/SectionLabel";

const FONTS = [
  "Arial Black",
  "Impact",
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Barlow Condensed",
  "Roboto Condensed",
];

export function TextPanel() {
  const text = useConfiguratorStore((s) => s.config.text);
  const updateText = useConfiguratorStore((s) => s.updateText);

  return (
    <div className="space-y-5">
      <div>
        <SectionLabel>Player Name</SectionLabel>
        <input
          type="text"
          value={text.playerName}
          onChange={(e) => updateText({ playerName: e.target.value })}
          placeholder="PLAYER"
          maxLength={20}
        />
      </div>

      <div>
        <SectionLabel>Team Name</SectionLabel>
        <input
          type="text"
          value={text.teamName}
          onChange={(e) => updateText({ teamName: e.target.value })}
          placeholder="LUXE SPORTS"
          maxLength={24}
        />
      </div>

      <div>
        <SectionLabel>Captain (optional)</SectionLabel>
        <input
          type="text"
          value={text.captainName}
          onChange={(e) => updateText({ captainName: e.target.value })}
          placeholder="C"
          maxLength={10}
        />
      </div>

      <div>
        <SectionLabel>Font</SectionLabel>
        <select value={text.font} onChange={(e) => updateText({ font: e.target.value })}>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <SectionLabel>Text Color</SectionLabel>
        <ColorSwatch
          color={text.color}
          onChange={(color) => updateText({ color })}
        />
      </div>

      <div>
        <SectionLabel>Font Size: {text.fontSize}px</SectionLabel>
        <input
          type="range" min="24" max="80" step="2"
          value={text.fontSize}
          onChange={(e) => updateText({ fontSize: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <SectionLabel>Letter Spacing: {text.letterSpacing}px</SectionLabel>
        <input
          type="range" min="0" max="20" step="1"
          value={text.letterSpacing}
          onChange={(e) => updateText({ letterSpacing: parseInt(e.target.value) })}
        />
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-[#8899aa]">Uppercase</span>
        <button
          onClick={() => updateText({ uppercase: !text.uppercase })}
          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer"
          style={{ background: text.uppercase ? "#d4af37" : "#1a2535" }}
        >
          <span
            className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
            style={{ transform: `translateX(${text.uppercase ? "18px" : "4px"})` }}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-[#8899aa]">Curved Text</span>
        <button
          onClick={() => updateText({ curved: !text.curved })}
          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer"
          style={{ background: text.curved ? "#d4af37" : "#1a2535" }}
        >
          <span
            className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
            style={{ transform: `translateX(${text.curved ? "18px" : "4px"})` }}
          />
        </button>
      </div>
    </div>
  );
}
