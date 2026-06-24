"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { JerseyConfig } from "@/types/configurator";

const JERSEY_TYPES: Array<{
  value: JerseyConfig["jerseyType"];
  label: string;
  desc: string;
  price: number;
}> = [
  { value: "regular", label: "Performance", desc: "Lightweight mesh fabric", price: 39 },
  { value: "premium", label: "Premium Elite", desc: "Luxury woven fabric", price: 49 },
  { value: "goalkeeper", label: "Goalkeeper", desc: "Padded protection", price: 59 },
];

export function BasePanel() {
  const jerseyType = useConfiguratorStore((s) => s.config.jerseyType);
  const premiumFabric = useConfiguratorStore((s) => s.config.premiumFabric);
  const setJerseyType = useConfiguratorStore((s) => s.setJerseyType);
  const setPremiumFabric = useConfiguratorStore((s) => s.setPremiumFabric);

  return (
    <div className="space-y-5">
      <div>
        <SectionLabel>Jersey Type</SectionLabel>
        <div className="space-y-2">
          {JERSEY_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setJerseyType(type.value)}
              className="w-full p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer text-left"
              style={{
                background: jerseyType === type.value ? "rgba(212,175,55,0.08)" : "#0a1525",
                border: `1px solid ${jerseyType === type.value ? "rgba(212,175,55,0.5)" : "#1a2535"}`,
              }}
            >
              <div>
                <p className="text-sm font-semibold text-white">{type.label}</p>
                <p className="text-[10px] text-[#556677] mt-0.5">{type.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#d4af37" }} className="text-sm font-bold">
                  ${type.price}
                </span>
                {jerseyType === type.value && (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#d4af37" }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#1a2535]">
        <div
          className="p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all"
          onClick={() => setPremiumFabric(!premiumFabric)}
          style={{
            background: premiumFabric ? "rgba(212,175,55,0.08)" : "#0a1525",
            border: `1px solid ${premiumFabric ? "rgba(212,175,55,0.5)" : "#1a2535"}`,
          }}
        >
          <div>
            <p className="text-sm font-semibold text-white">Premium Fabric Upgrade</p>
            <p className="text-[10px] text-[#556677] mt-0.5">Italian woven microfiber + $15</p>
          </div>
          <div
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
            style={{ background: premiumFabric ? "#d4af37" : "#1a2535" }}
          >
            <span
              className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
              style={{ transform: `translateX(${premiumFabric ? "18px" : "4px"})` }}
            />
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
        <p className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase mb-2">Delivery</p>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#556677" strokeWidth="1.5">
            <rect x="1" y="3" width="15" height="13" rx="1"/>
            <path d="M16 8h4l3 3v5h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <p className="text-xs text-[#8899aa]">Estimated delivery: 7–10 business days</p>
        </div>
      </div>
    </div>
  );
}
