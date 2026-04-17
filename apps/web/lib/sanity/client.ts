import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;

  if (!_client) {
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN,
    });
  }
  return _client;
}

// Keep backward compat — returns null if not configured
export const sanityClient = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const client = getSanityClient();
    if (!client) return () => Promise.resolve(null);
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
