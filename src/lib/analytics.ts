const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function isProduction() {
  return import.meta.env.PROD;
}

export function trackPageView(path: string, title: string) {
  if (!GA_MEASUREMENT_ID) return;
  if (!isProduction()) return;
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(['config', GA_MEASUREMENT_ID, { page_path: path, page_title: title }]);
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
  }
}
