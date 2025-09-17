export const BORDER_COLOR = "#E5E7EB";

const COLORS = [
  "#EF4444", // Red
  "#F97316", // Orange
  "#F59E0B", // Amber
  "#EAB308", // Yellow
  "#84CC16", // Lime
  "#22C55E", // Green
  "#10B981", // Emerald
  "#14B8A6", // Teal
  "#0EA5E9", // Sky
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#A855F7", // Purple
  "#D946EF", // Fuchsia
  "#EC4899", // Pink
  "#F43F5E", // Rose
  "#FF5733", // Vibrant Red-Orange
  "#FF33A8", // Vibrant Pink
  "#33FF57", // Vibrant Green
  "#3357FF", // Vibrant Blue
  "#FF8C33", // Vibrant Orange
  "#8C33FF", // Vibrant Purple
  "#F6FF33", // Vibrant Yellow
  "#FF33D4", // Vibrant Magenta
  "#33FF8C", // Vibrant Mint
  "#FF6F33", // Vibrant Coral
  "#6F33FF", // Vibrant Indigo
  "#D4FF33", // Vibrant Lime
  "#FF3333", // Vibrant Red
  "#33FF33", // Vibrant Bright Green
  "#3333FF", // Vibrant Bright Blue
];

export const generateRandomColor = (seed: number) => {
  //return random color from COLORS based on seed
  // make it random but consistent for the same seed
  // use modulo to get a number between 0 and COLORS.length - 1
  seed = Math.abs(seed);
  seed = seed % COLORS.length;
  return COLORS[seed];
};
