"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/store/configuratorStore";
import type { ConfiguratorStep } from "@/types/configurator";

const STEPS: Array<{
  id: ConfiguratorStep;
  num: number;
  label: string;
  sub: string;
  icon: React.ReactNode;
}> = [
  {
    id: "base",
    num: 1,
    label: "BASE",
    sub: "Select Jersey Type",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "colors",
    num: 2,
    label: "COLORS",
    sub: "Choose Your Colors",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="13.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="10.5" r="2.5"/>
        <circle cx="8.5" cy="7.5" r="2.5"/>
        <circle cx="6.5" cy="12.5" r="2.5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "logos",
    num: 3,
    label: "LOGOS",
    sub: "Add Your Logos",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "text",
    num: 4,
    label: "TEXT",
    sub: "Player Name & Team",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
  },
  {
    id: "numbers",
    num: 5,
    label: "NUMBERS",
    sub: "Player Number",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
        <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
      </svg>
    ),
  },
  {
    id: "sublimation",
    num: 6,
    label: "DESIGN",
    sub: "Patterns & Artwork",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "preview",
    num: 7,
    label: "PREVIEW",
    sub: "Review & Order",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

export function StepsSidebar() {
  const activeStep = useConfiguratorStore((s) => s.activeStep);
  const setStep = useConfiguratorStore((s) => s.setStep);
  const undo = useConfiguratorStore((s) => s.undo);
  const redo = useConfiguratorStore((s) => s.redo);
  const undoStack = useConfiguratorStore((s) => s.undoStack);
  const redoStack = useConfiguratorStore((s) => s.redoStack);

  return (
    <div className="flex flex-col h-full py-6 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded" style={{ background: "linear-gradient(135deg, #d4af37, #f0d27a)" }}>
            <svg viewBox="0 0 24 24" fill="black" className="w-full h-full p-1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-white font-bold text-sm tracking-widest">LUXE</span>
          <span className="text-[#556677] text-xs tracking-widest">SPORTS</span>
        </div>
        <p className="text-[10px] tracking-[0.25em] text-[#556677] uppercase">Configurator</p>
        <h2 className="text-xl font-black text-white leading-tight mt-1">
          CREATE YOUR<br />
          <span style={{ background: "linear-gradient(135deg, #d4af37, #f0d27a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            MASTERPIECE
          </span>
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isDone = STEPS.findIndex(s => s.id === activeStep) > STEPS.findIndex(s => s.id === step.id);
          return (
            <motion.button
              key={step.id}
              onClick={() => setStep(step.id)}
              whileHover={{ x: 3 }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer text-left"
              style={{
                background: isActive ? "rgba(212,175,55,0.08)" : "transparent",
                border: `1px solid ${isActive ? "rgba(212,175,55,0.3)" : "transparent"}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #d4af37, #f0d27a)"
                    : isDone
                    ? "rgba(212,175,55,0.15)"
                    : "rgba(255,255,255,0.04)",
                  color: isActive ? "#000" : isDone ? "#d4af37" : "#556677",
                  border: isDone && !isActive ? "1px solid rgba(212,175,55,0.3)" : "none",
                }}
              >
                {isDone ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest" style={{ color: isActive ? "#d4af37" : "#556677" }}>
                  {step.label}
                </p>
                <p className="text-xs" style={{ color: isActive ? "#ffffff" : "#445566" }}>
                  {step.sub}
                </p>
              </div>
              <div className="ml-auto" style={{ color: isActive ? "#d4af37" : "#1a2535" }}>
                {step.icon}
              </div>
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-[#1a2535] space-y-3">
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#0a1525", border: "1px solid #1a2535", color: "#8899aa" }}
            title="Undo"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6M3.51 15a9 9 0 1 0 .49-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Undo
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#0a1525", border: "1px solid #1a2535", color: "#8899aa" }}
            title="Redo"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6M20.49 15A9 9 0 1 1 20 11" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Redo
          </button>
        </div>

        <div className="p-3 rounded-xl" style={{ background: "#0a1525", border: "1px solid #1a2535" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.1)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white">Need Help?</p>
              <p className="text-[9px] text-[#556677]">Chat with design specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
