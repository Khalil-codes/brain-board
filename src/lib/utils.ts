import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2626", "#F59E0B", "#059669", "#7C3AED", "#DB2777"];
export const connectionIdToColor = (id: number) => COLORS[id % COLORS.length];
