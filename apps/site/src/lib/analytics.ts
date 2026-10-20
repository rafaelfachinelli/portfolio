// Umami custom events. The script loads only in production; calls before it
// loads (or in development) are dropped. Never send personal data.

type UmamiData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: { track: (event: string, data?: UmamiData) => void }
  }
}

export function track(event: string, data?: UmamiData) {
  try {
    window.umami?.track(event, data)
  } catch {
    // Analytics never breaks the page.
  }
}
