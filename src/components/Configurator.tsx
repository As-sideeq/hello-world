"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { StepsSidebar } from "./panels/StepsSidebar";
import { RightPanel } from "./panels/RightPanel";
import { BottomBar } from "./panels/BottomBar";
import { ViewerToolbar } from "./panels/ViewerToolbar";
import { Scene } from "./3d/Scene";
import { useConfiguratorStore } from "@/store/configuratorStore";

export function Configurator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isFullscreen = useConfiguratorStore((s) => s.isFullscreen);
  const setFullscreen = useConfiguratorStore((s) => s.setFullscreen);

  const handleScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "jersey-design.png";
    a.click();
  }, []);

  const handleFullscreen = useCallback(() => {
    setFullscreen(!isFullscreen);
  }, [isFullscreen, setFullscreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#05080f" }}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-64 flex-shrink-0 overflow-y-auto"
          style={{ background: "#0b1220", borderRight: "1px solid #1a2535" }}
        >
          <StepsSidebar />
        </motion.div>

        {/* 3D Viewer */}
        <div className="flex-1 relative canvas-container" style={{ background: "#05080f" }}>
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
            }}
          />

          <ViewerToolbar
            onScreenshot={handleScreenshot}
            onFullscreen={handleFullscreen}
          />

          <Scene canvasRef={canvasRef} onScreenshot={handleScreenshot} />
        </div>

        {/* Right Panel */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-72 flex-shrink-0 overflow-hidden flex flex-col"
          style={{ background: "#0b1220", borderLeft: "1px solid #1a2535" }}
        >
          <RightPanel />
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BottomBar />
      </motion.div>
    </motion.div>
  );
}
