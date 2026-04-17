import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "./client";
import type { SanityImage } from "@/types";

export function urlFor(source: SanityImage) {
  const client = getSanityClient();
  if (!client) return { url: () => "" };
  return imageUrlBuilder(client).image(source);
}
