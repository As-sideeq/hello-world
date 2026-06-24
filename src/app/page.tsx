"use client";

import dynamic from "next/dynamic";

const Configurator = dynamic(
  () => import("@/components/Configurator").then((m) => m.Configurator),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          background: "#05080f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#d4af37",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p
          style={{
            color: "#d4af37",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Loading Configurator
        </p>
      </div>
    ),
  }
);

export default function Home() {
  return <Configurator />;
}
