import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getAssetPath(path: string): string {
  // For Astro, we can use the path directly since assets are handled automatically
  return path
}
