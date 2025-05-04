import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string): string {
  if (!string) {
    return '' // Handle empty or null strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}
