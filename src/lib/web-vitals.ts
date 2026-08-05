import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

type Metric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
};

function sendToGA(metric: Metric) {
  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!GA_ID || typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    'event',
    'web_vitals',
    {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    },
  ]);
}

export function reportWebVitals() {
  const handleMetric = (metric: Metric) => {
    if (import.meta.env.DEV) {
      console.log(`[web-vitals] ${metric.name}:`, metric.value, metric.rating);
    }
    sendToGA(metric);
  };

  onCLS((m) => handleMetric(m as unknown as Metric));
  onFCP((m) => handleMetric(m as unknown as Metric));
  onLCP((m) => handleMetric(m as unknown as Metric));
  onTTFB((m) => handleMetric(m as unknown as Metric));
}
