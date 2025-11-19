export type TrackProperties = Record<string, unknown>;

type AnalyticsClient = {
  track?: (eventName: string, properties?: TrackProperties) => void;
};

declare global {
  interface Window {
    analytics?: AnalyticsClient;
  }
}

export function trackEvent(eventName: string, properties: TrackProperties = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const client = window.analytics;
  if (client && typeof client.track === 'function') {
    client.track(eventName, properties);
  }
}
