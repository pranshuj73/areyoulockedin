/**
 * Generates a color based on the input text.
 * The color is generated using a hash of the text to ensure consistent colors for the same input.
 */
export function generateColor(text: string): { bg: string, text: string } {
  let hashValue = 0;
  for (let i = 0; i < text.length; i++) {
    hashValue = text.charCodeAt(i) + ((hashValue << 5) - hashValue);
  }

  hashValue = Math.abs(hashValue);
  const hue1 = Math.floor((hashValue * 137.508) % 360);
  const hue2 = (hue1 + 30) % 360;

  const charCode = text.charCodeAt(0);
  const saturationBase = 50;
  const saturationVariance = 5;
  const saturation = saturationBase + (charCode % saturationVariance);

  const lightnessBase = 70;
  const lightnessVariance = 10;
  const lightness1 = lightnessBase - (charCode % lightnessVariance);
  const lightness2 = Math.min(lightness1 + 10, 95);

  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;

  return {
    bg: `linear-gradient(135deg, ${color1} 60%, ${color2})`,
    text: "text-gray-800",
  };
} 