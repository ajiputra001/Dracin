export const API_PROVIDERS = [
  {
    id: "dramabox",
    name: "DramaBox Core API",
    version: "v2.4.1",
    status: "online",
    latency: "24 ms",
    endpoint: "https://api.dramabox.sdracin.io/v1",
    badge: "Official VIP",
    description: "Server utama dengan koleksi drama terpopuler & subtitle Indonesia"
  },
  {
    id: "melolo",
    name: "Melolo Special API",
    version: "v1.1.0",
    status: "online",
    latency: "32 ms",
    endpoint: "https://api.melolo.sdracin.io/v1",
    badge: "Melolo v1.1.0",
    description: "Integrasi API Melolo terbaru dengan server responsif 1080p"
  },
  {
    id: "shorttv",
    name: "ShortTV Proxy API",
    version: "v1.0.8",
    status: "online",
    latency: "45 ms",
    endpoint: "https://api.shorttv.sdracin.io/v1",
    badge: "Backup VIP",
    description: "Server cadangan otomatis untuk kecepatan streaming maksimal"
  }
];

export const SECURITY_PATCH = {
  version: "1.0.0 Beta",
  status: "Active & Secured",
  lastCheck: new Date().toISOString(),
  features: ["Encrypted Stream Token", "Auto Anti-Adblocker", "Free VIP Bypass Shield"]
};
