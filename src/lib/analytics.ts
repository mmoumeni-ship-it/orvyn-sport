const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

function isProduction() {
  return import.meta.env.PROD;
}

export function initGA() {
  if (!GA_MEASUREMENT_ID) return;
  if (!isProduction()) return;
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
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
