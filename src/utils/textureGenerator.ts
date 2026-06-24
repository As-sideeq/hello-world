import type { JerseyConfig, PatternType } from "@/types/configurator";

const TEXTURE_SIZE = 2048;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  type: PatternType,
  color: string,
  opacity: number,
  scale: number,
  rotation: number,
  width: number,
  height: number
) {
  if (type === "none") return;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);

  const s = scale * 40;

  switch (type) {
    case "stripes": {
      ctx.lineWidth = s * 0.5;
      for (let x = -width; x < width * 2; x += s) {
        ctx.beginPath();
        ctx.moveTo(x, -height);
        ctx.lineTo(x, height * 2);
        ctx.stroke();
      }
      break;
    }
    case "diamonds": {
      const d = s;
      for (let y = -d; y < height + d; y += d) {
        for (let x = -d; x < width + d; x += d) {
          ctx.beginPath();
          ctx.moveTo(x + d / 2, y);
          ctx.lineTo(x + d, y + d / 2);
          ctx.lineTo(x + d / 2, y + d);
          ctx.lineTo(x, y + d / 2);
          ctx.closePath();
          ctx.stroke();
        }
      }
      break;
    }
    case "chevron": {
      ctx.lineWidth = s * 0.3;
      for (let y = -s * 2; y < height + s * 2; y += s * 1.5) {
        ctx.beginPath();
        for (let x = -s; x < width + s; x += s) {
          ctx.moveTo(x, y + s * 0.5);
          ctx.lineTo(x + s * 0.5, y);
          ctx.lineTo(x + s, y + s * 0.5);
        }
        ctx.stroke();
      }
      break;
    }
    case "hexagon": {
      const r = s * 0.6;
      const h = r * Math.sqrt(3);
      for (let row = -1; row < height / h + 1; row++) {
        for (let col = -1; col < width / (r * 1.5) + 1; col++) {
          const cx = col * r * 3 + (row % 2 === 0 ? 0 : r * 1.5);
          const cy = row * h;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const hx = cx + r * Math.cos(angle);
            const hy = cy + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      break;
    }
    case "waves": {
      ctx.lineWidth = s * 0.3;
      for (let y = -s; y < height + s; y += s) {
        ctx.beginPath();
        ctx.moveTo(-s, y);
        for (let x = -s; x < width + s; x += s) {
          ctx.quadraticCurveTo(x + s * 0.25, y - s * 0.5, x + s * 0.5, y);
          ctx.quadraticCurveTo(x + s * 0.75, y + s * 0.5, x + s, y);
        }
        ctx.stroke();
      }
      break;
    }
    case "gradient": {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      break;
    }
  }
  ctx.restore();
}

export function generateJerseyTexture(config: JerseyConfig): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext("2d")!;

  const { colors, text, numbers, sublimation, logos } = config;
  const W = TEXTURE_SIZE;
  const H = TEXTURE_SIZE;

  // Background gradient
  if (sublimation.backgroundGradient.enabled) {
    const angle = (sublimation.backgroundGradient.angle * Math.PI) / 180;
    const x1 = W / 2 - Math.cos(angle) * W;
    const y1 = H / 2 - Math.sin(angle) * H;
    const x2 = W / 2 + Math.cos(angle) * W;
    const y2 = H / 2 + Math.sin(angle) * H;
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, sublimation.backgroundGradient.color1);
    grad.addColorStop(1, sublimation.backgroundGradient.color2);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = colors.primary;
  }
  ctx.fillRect(0, 0, W, H);

  // Side panels
  ctx.fillStyle = colors.sidePanel;
  ctx.fillRect(0, 0, W * 0.12, H);
  ctx.fillRect(W * 0.88, 0, W * 0.12, H);

  // Pattern overlay
  drawPattern(
    ctx,
    sublimation.pattern.type,
    sublimation.pattern.color,
    sublimation.pattern.opacity,
    sublimation.pattern.scale,
    sublimation.pattern.rotation,
    W,
    H
  );

  // Accent stripe along sides
  ctx.fillStyle = colors.accent;
  ctx.fillRect(W * 0.11, 0, W * 0.02, H);
  ctx.fillRect(W * 0.87, 0, W * 0.02, H);

  // Team name
  if (text.teamName) {
    const name = text.uppercase ? text.teamName.toUpperCase() : text.teamName;
    ctx.save();
    ctx.fillStyle = text.color;
    ctx.font = `bold ${Math.round(W * 0.035)}px "${text.font}", Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = `${text.letterSpacing}px`;
    ctx.fillText(name, W / 2, H * 0.62);
    ctx.restore();
  }

  // Player name
  if (text.playerName) {
    const name = text.uppercase ? text.playerName.toUpperCase() : text.playerName;
    ctx.save();
    ctx.fillStyle = text.color;
    ctx.font = `bold ${Math.round(W * 0.028)}px "${text.font}", Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = `${text.letterSpacing}px`;
    ctx.fillText(name, W / 2, H * 0.22);
    ctx.restore();
  }

  // Back number
  if (numbers.back) {
    ctx.save();
    ctx.font = `bold ${Math.round(W * 0.12)}px "${numbers.font}", Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (numbers.style === "outline") {
      ctx.strokeStyle = numbers.color;
      ctx.lineWidth = numbers.strokeWidth * 2;
      ctx.strokeText(numbers.back, W / 2, H * 0.72);
    } else {
      if (numbers.strokeWidth > 0) {
        ctx.strokeStyle = numbers.strokeColor;
        ctx.lineWidth = numbers.strokeWidth * 4;
        ctx.strokeText(numbers.back, W / 2, H * 0.72);
      }
      ctx.fillStyle = numbers.color;
      ctx.fillText(numbers.back, W / 2, H * 0.72);
    }
    ctx.restore();
  }

  return canvas;
}

export function generateFrontTexture(config: JerseyConfig): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext("2d")!;

  const { colors, text, numbers, sublimation } = config;
  const W = TEXTURE_SIZE;
  const H = TEXTURE_SIZE;

  // Base
  if (sublimation.backgroundGradient.enabled) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, sublimation.backgroundGradient.color1);
    grad.addColorStop(1, sublimation.backgroundGradient.color2);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = colors.primary;
  }
  ctx.fillRect(0, 0, W, H);

  // Side panels
  ctx.fillStyle = colors.sidePanel;
  ctx.fillRect(0, 0, W * 0.12, H);
  ctx.fillRect(W * 0.88, 0, W * 0.12, H);

  // Pattern
  drawPattern(
    ctx,
    sublimation.pattern.type,
    sublimation.pattern.color,
    sublimation.pattern.opacity,
    sublimation.pattern.scale,
    sublimation.pattern.rotation,
    W,
    H
  );

  // Accent stripes
  ctx.fillStyle = colors.accent;
  ctx.fillRect(W * 0.11, 0, W * 0.02, H);
  ctx.fillRect(W * 0.87, 0, W * 0.02, H);

  // Front number
  if (numbers.front) {
    ctx.save();
    ctx.font = `bold ${Math.round(W * 0.1)}px "${numbers.font}", Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (numbers.strokeWidth > 0) {
      ctx.strokeStyle = numbers.strokeColor;
      ctx.lineWidth = numbers.strokeWidth * 4;
      ctx.strokeText(numbers.front, W / 2, H * 0.65);
    }
    ctx.fillStyle = numbers.color;
    ctx.fillText(numbers.front, W / 2, H * 0.65);
    ctx.restore();
  }

  // Team name
  if (text.teamName) {
    const name = text.uppercase ? text.teamName.toUpperCase() : text.teamName;
    ctx.save();
    ctx.fillStyle = text.color;
    ctx.font = `bold ${Math.round(W * 0.04)}px "${text.font}", Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, W / 2, H * 0.52);
    ctx.restore();
  }

  return canvas;
}
