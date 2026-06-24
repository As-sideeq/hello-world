"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { SectionLabel } from "@/components/ui/SectionLabel";

const COLOR_FIELDS: Array<{ key: keyof import("@/types/configurator").ColorConfig; label: string }> = [
  { key: "primary", label: "Primary Color" },
  { key: "secondary", label: "Secondary Color" },
  { key: "sleeve", label: "Sleeve Color" },
  { key: "collar", label: "Collar Color" },
  { key: "sidePanel", label: "Side Panel" },
  { key: "accent", label: "Accent / Stripe" },
];

export function ColorsPanel() {
  const colors = useConfiguratorStore((s) => s.config.colors);
  const updateColors = useConfiguratorStore((s) => s.updateColors);

  return (
    <div className="space-y-5">
      {COLOR_FIELDS.map(({ key, label }) => (
        <div key={key}>
          <SectionLabel>{label}</SectionLabel>
          <ColorSwatch
            color={colors[key]}
            onChange={(color) => updateColors({ [key]: color })}
          />
        </div>
      ))}
    </div>
  );
}
