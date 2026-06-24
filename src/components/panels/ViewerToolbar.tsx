"use client";

import { useConfiguratorStore } from "@/store/configuratorStore";
import type { CameraView } from "@/types/configurator";

const VIEWS: Array<{ id: CameraView; label: string }> = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
  { id: "perspective", label: "Persp." },
];

interface ViewerToolbarProps {
  onScreenshot?: () => void;
  onFullscreen?: () => void;
}

export function ViewerToolbar({ onScreenshot, onFullscreen }: ViewerToolbarProps) {
  const cameraView = useConfiguratorStore((s) => s.cameraView);
  const setCameraView = useConfiguratorStore((s) => s.setCameraView);
  const autoRotate = useConfiguratorStore((s) => s.autoRotate);
  const setAutoRotate = useConfiguratorStore((s) => s.setAutoRotate);

  return (
    <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-10 pointer-events-none">
      <div className="flex gap-1 p-1 rounded-xl pointer-events-auto" style={{ background: "rgba(5,8,15,0.8)", border: "1px solid #1a2535", backdropFilter: "blur(12px)" }}>
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setCameraView(v.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: cameraView === v.id ? "linear-gradient(135deg, #b8962e, #d4af37)" : "transparent",
              color: cameraView === v.id ? "#000" : "#556677",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 pointer-events-auto">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
          style={{
            background: autoRotate ? "rgba(212,175,55,0.15)" : "rgba(5,8,15,0.8)",
            border: `1px solid ${autoRotate ? "rgba(212,175,55,0.4)" : "#1a2535"}`,
            backdropFilter: "blur(12px)",
          }}
          title="Auto Rotate"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={autoRotate ? "#d4af37" : "#556677"} strokeWidth="1.5"
            className={autoRotate ? "animate-spin-slow" : ""}
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {onScreenshot && (
          <button
            onClick={onScreenshot}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:border-[#d4af37]/30 cursor-pointer"
            style={{ background: "rgba(5,8,15,0.8)", border: "1px solid #1a2535", backdropFilter: "blur(12px)" }}
            title="Screenshot"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#556677" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
        )}

        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:border-[#d4af37]/30 cursor-pointer"
            style={{ background: "rgba(5,8,15,0.8)", border: "1px solid #1a2535", backdropFilter: "blur(12px)" }}
            title="Fullscreen"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#556677" strokeWidth="1.5">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
