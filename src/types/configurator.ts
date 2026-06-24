export interface ColorConfig {
  primary: string;
  secondary: string;
  sleeve: string;
  collar: string;
  sidePanel: string;
  accent: string;
}

export interface LogoItem {
  id: string;
  url: string;
  placement: LogoPlacement;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  name: string;
}

export type LogoPlacement = "frontChest" | "back" | "leftSleeve" | "rightSleeve";

export interface TextConfig {
  playerName: string;
  teamName: string;
  captainName: string;
  font: string;
  letterSpacing: number;
  curved: boolean;
  uppercase: boolean;
  color: string;
  fontSize: number;
}

export interface NumberConfig {
  front: string;
  back: string;
  sleeve: string;
  font: string;
  style: NumberStyle;
  strokeWidth: number;
  strokeColor: string;
  color: string;
  fontSize: number;
}

export type NumberStyle = "solid" | "outline" | "shadow" | "collegiate";

export interface PatternConfig {
  type: PatternType;
  color: string;
  opacity: number;
  scale: number;
  rotation: number;
}

export type PatternType = "none" | "stripes" | "diamonds" | "chevron" | "hexagon" | "waves" | "gradient";

export interface SublimationConfig {
  pattern: PatternConfig;
  backgroundGradient: {
    enabled: boolean;
    color1: string;
    color2: string;
    angle: number;
  };
  artwork: string | null;
}

export interface PriceBreakdown {
  base: number;
  frontLogo: number;
  backLogo: number;
  sleeveLogo: number;
  playerName: number;
  number: number;
  premiumFabric: number;
  total: number;
}

export type ConfiguratorStep = "base" | "colors" | "logos" | "text" | "numbers" | "sublimation" | "preview";

export type JerseyType = "regular" | "premium" | "goalkeeper";

export interface JerseyConfig {
  jerseyType: JerseyType;
  colors: ColorConfig;
  logos: LogoItem[];
  text: TextConfig;
  numbers: NumberConfig;
  sublimation: SublimationConfig;
  activeTab: "jersey" | "shorts";
  premiumFabric: boolean;
}

export type CameraView = "front" | "back" | "left" | "right" | "top" | "perspective";

export interface CartItem {
  id: string;
  config: JerseyConfig;
  price: PriceBreakdown;
  quantity: number;
  timestamp: number;
}
