"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import { GoldButton } from "@/components/ui/GoldButton";

export function PreviewPanel() {
  const config = useConfiguratorStore((s) => s.config);
  const getPrice = useConfiguratorStore((s) => s.getPrice);
  const addToCart = useConfiguratorStore((s) => s.addToCart);
  const resetConfig = useConfiguratorStore((s) => s.resetConfig);
  const cart = useConfiguratorStore((s) => s.cart);
  const price = getPrice();

  const exportConfig = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jersey-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl space-y-3" style={{ background: "#0a1525", border: "1px solid #1a2535" }}>
        <p className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase">Price Breakdown</p>
        {[
          { label: "Base Jersey", value: price.base },
          { label: "Front Logo", value: price.frontLogo },
          { label: "Back Logo", value: price.backLogo },
          { label: "Sleeve Logo", value: price.sleeveLogo },
          { label: "Player Name", value: price.playerName },
          { label: "Number", value: price.number },
          { label: "Premium Fabric", value: price.premiumFabric },
        ]
          .filter((item) => item.value > 0)
          .map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-[#8899aa]">{item.label}</span>
              <span className="text-white">${item.value}</span>
            </div>
          ))}
        <div className="border-t border-[#1a2535] pt-3 flex justify-between">
          <span className="font-bold text-white">Total</span>
          <span className="font-bold text-[#d4af37] text-lg">${price.total}</span>
        </div>
      </div>

      <div className="space-y-2">
        <GoldButton fullWidth size="lg" onClick={addToCart}>
          Add to Cart — ${price.total}
        </GoldButton>
        <GoldButton fullWidth variant="secondary" onClick={exportConfig}>
          Export Configuration
        </GoldButton>
        <GoldButton fullWidth variant="ghost" onClick={resetConfig}>
          Reset to Default
        </GoldButton>
      </div>

      {cart.length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] font-bold tracking-widest text-[#556677] uppercase mb-2">
            Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})
          </p>
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-lg mb-2 flex justify-between text-xs"
              style={{ background: "#0a1525", border: "1px solid #1a2535" }}
            >
              <span className="text-[#8899aa]">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-[#d4af37] font-bold">${item.price.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
