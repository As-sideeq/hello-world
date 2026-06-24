import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type {
  JerseyConfig,
  ColorConfig,
  LogoItem,
  TextConfig,
  NumberConfig,
  SublimationConfig,
  ConfiguratorStep,
  CameraView,
  CartItem,
  PriceBreakdown,
  LogoPlacement,
} from "@/types/configurator";

const defaultColors: ColorConfig = {
  primary: "#0d0d0d",
  secondary: "#d4af37",
  sleeve: "#0d0d0d",
  collar: "#d4af37",
  sidePanel: "#1a1a1a",
  accent: "#f0d27a",
};

const defaultText: TextConfig = {
  playerName: "PLAYER",
  teamName: "LUXE SPORTS",
  captainName: "",
  font: "Arial Black",
  letterSpacing: 2,
  curved: false,
  uppercase: true,
  color: "#d4af37",
  fontSize: 48,
};

const defaultNumbers: NumberConfig = {
  front: "",
  back: "10",
  sleeve: "",
  font: "Arial Black",
  style: "solid",
  strokeWidth: 2,
  strokeColor: "#000000",
  color: "#d4af37",
  fontSize: 120,
};

const defaultSublimation: SublimationConfig = {
  pattern: {
    type: "none",
    color: "#d4af37",
    opacity: 0.15,
    scale: 1,
    rotation: 0,
  },
  backgroundGradient: {
    enabled: false,
    color1: "#0d0d0d",
    color2: "#1a1a1a",
    angle: 180,
  },
  artwork: null,
};

const defaultConfig: JerseyConfig = {
  jerseyType: "premium",
  colors: defaultColors,
  logos: [],
  text: defaultText,
  numbers: defaultNumbers,
  sublimation: defaultSublimation,
  activeTab: "jersey",
  premiumFabric: false,
};

function calculatePrice(config: JerseyConfig): PriceBreakdown {
  const base = config.jerseyType === "premium" ? 49 : 39;
  const hasFrontLogo = config.logos.some((l) => l.placement === "frontChest");
  const hasBackLogo = config.logos.some((l) => l.placement === "back");
  const hasSleeveLogos = config.logos.some(
    (l) => l.placement === "leftSleeve" || l.placement === "rightSleeve"
  );
  const hasName = config.text.playerName.trim().length > 0;
  const hasNumber = config.numbers.back.trim().length > 0 || config.numbers.front.trim().length > 0;

  const breakdown: PriceBreakdown = {
    base,
    frontLogo: hasFrontLogo ? 5 : 0,
    backLogo: hasBackLogo ? 5 : 0,
    sleeveLogo: hasSleeveLogos ? 5 : 0,
    playerName: hasName ? 8 : 0,
    number: hasNumber ? 8 : 0,
    premiumFabric: config.premiumFabric ? 15 : 0,
    total: 0,
  };

  breakdown.total =
    breakdown.base +
    breakdown.frontLogo +
    breakdown.backLogo +
    breakdown.sleeveLogo +
    breakdown.playerName +
    breakdown.number +
    breakdown.premiumFabric;

  return breakdown;
}

interface ConfiguratorState {
  config: JerseyConfig;
  activeStep: ConfiguratorStep;
  cameraView: CameraView;
  autoRotate: boolean;
  isFullscreen: boolean;
  textureNeedsUpdate: boolean;
  cart: CartItem[];
  selectedLogoId: string | null;
  undoStack: JerseyConfig[];
  redoStack: JerseyConfig[];

  setStep: (step: ConfiguratorStep) => void;
  setCameraView: (view: CameraView) => void;
  setAutoRotate: (val: boolean) => void;
  setFullscreen: (val: boolean) => void;
  setActiveTab: (tab: "jersey" | "shorts") => void;

  updateColors: (colors: Partial<ColorConfig>) => void;
  addLogo: (logo: LogoItem) => void;
  updateLogo: (id: string, updates: Partial<LogoItem>) => void;
  removeLogo: (id: string) => void;
  setSelectedLogo: (id: string | null) => void;
  updateText: (text: Partial<TextConfig>) => void;
  updateNumbers: (numbers: Partial<NumberConfig>) => void;
  updateSublimation: (sublimation: Partial<SublimationConfig>) => void;
  setPremiumFabric: (val: boolean) => void;
  setJerseyType: (type: JerseyConfig["jerseyType"]) => void;

  getPrice: () => PriceBreakdown;
  addToCart: () => void;
  removeFromCart: (id: string) => void;

  undo: () => void;
  redo: () => void;
  resetConfig: () => void;
  loadConfig: (config: JerseyConfig) => void;
  acknowledgeTextureUpdate: () => void;
}

function pushUndo(state: ConfiguratorState): Partial<ConfiguratorState> {
  const undoStack = [...state.undoStack.slice(-19), state.config];
  return { undoStack, redoStack: [] };
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        config: defaultConfig,
        activeStep: "base",
        cameraView: "perspective",
        autoRotate: true,
        isFullscreen: false,
        textureNeedsUpdate: true,
        cart: [],
        selectedLogoId: null,
        undoStack: [],
        redoStack: [],

        setStep: (step) => set({ activeStep: step }),
        setCameraView: (view) => set({ cameraView: view }),
        setAutoRotate: (val) => set({ autoRotate: val }),
        setFullscreen: (val) => set({ isFullscreen: val }),
        setActiveTab: (tab) =>
          set((s) => ({ config: { ...s.config, activeTab: tab } })),

        updateColors: (colors) =>
          set((s) => ({
            ...pushUndo(s),
            config: { ...s.config, colors: { ...s.config.colors, ...colors } },
            textureNeedsUpdate: true,
          })),

        addLogo: (logo) =>
          set((s) => ({
            ...pushUndo(s),
            config: { ...s.config, logos: [...s.config.logos, logo] },
            textureNeedsUpdate: true,
          })),

        updateLogo: (id, updates) =>
          set((s) => ({
            config: {
              ...s.config,
              logos: s.config.logos.map((l) =>
                l.id === id ? { ...l, ...updates } : l
              ),
            },
            textureNeedsUpdate: true,
          })),

        removeLogo: (id) =>
          set((s) => ({
            ...pushUndo(s),
            config: {
              ...s.config,
              logos: s.config.logos.filter((l) => l.id !== id),
            },
            textureNeedsUpdate: true,
            selectedLogoId: s.selectedLogoId === id ? null : s.selectedLogoId,
          })),

        setSelectedLogo: (id) => set({ selectedLogoId: id }),

        updateText: (text) =>
          set((s) => ({
            ...pushUndo(s),
            config: { ...s.config, text: { ...s.config.text, ...text } },
            textureNeedsUpdate: true,
          })),

        updateNumbers: (numbers) =>
          set((s) => ({
            ...pushUndo(s),
            config: {
              ...s.config,
              numbers: { ...s.config.numbers, ...numbers },
            },
            textureNeedsUpdate: true,
          })),

        updateSublimation: (sublimation) =>
          set((s) => ({
            ...pushUndo(s),
            config: {
              ...s.config,
              sublimation: { ...s.config.sublimation, ...sublimation },
            },
            textureNeedsUpdate: true,
          })),

        setPremiumFabric: (val) =>
          set((s) => ({ config: { ...s.config, premiumFabric: val } })),

        setJerseyType: (type) =>
          set((s) => ({ config: { ...s.config, jerseyType: type } })),

        getPrice: () => calculatePrice(get().config),

        addToCart: () => {
          const { config, getPrice } = get();
          const item: CartItem = {
            id: crypto.randomUUID(),
            config: JSON.parse(JSON.stringify(config)),
            price: getPrice(),
            quantity: 1,
            timestamp: Date.now(),
          };
          set((s) => ({ cart: [...s.cart, item] }));
        },

        removeFromCart: (id) =>
          set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),

        undo: () =>
          set((s) => {
            if (s.undoStack.length === 0) return s;
            const undoStack = [...s.undoStack];
            const config = undoStack.pop()!;
            return {
              config,
              undoStack,
              redoStack: [s.config, ...s.redoStack].slice(0, 20),
              textureNeedsUpdate: true,
            };
          }),

        redo: () =>
          set((s) => {
            if (s.redoStack.length === 0) return s;
            const redoStack = [...s.redoStack];
            const config = redoStack.shift()!;
            return {
              config,
              redoStack,
              undoStack: [...s.undoStack, s.config].slice(-20),
              textureNeedsUpdate: true,
            };
          }),

        resetConfig: () =>
          set((s) => ({
            ...pushUndo(s),
            config: defaultConfig,
            textureNeedsUpdate: true,
          })),

        loadConfig: (config) =>
          set((s) => ({
            ...pushUndo(s),
            config,
            textureNeedsUpdate: true,
          })),

        acknowledgeTextureUpdate: () => set({ textureNeedsUpdate: false }),
      }),
      {
        name: "jersey-configurator",
        partialize: (state) => ({
          config: state.config,
          cart: state.cart,
        }),
      }
    )
  )
);
