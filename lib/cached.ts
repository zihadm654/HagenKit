import { cacheLife } from "next/cache";

import { getBlurDataURL } from "@/lib/blog/images";
import { formatDate, timeAgo } from "@/lib/utils";

/**
 * `getBlurDataURL` fetches from a remote image service, which is not allowed
 * during prerendering unless it runs inside a cache scope.
 */
export async function getCachedBlurDataURL(url: string | null) {
  "use cache";
  cacheLife("max");

  return getBlurDataURL(url);
}

/**
 * `formatDate` reads the current time to produce relative dates, which is an
 * unstable value during prerendering. Cache the result for a day so the
 * relative label stays fresh without blocking static generation.
 */
export async function formatDateCached(date: string) {
  "use cache";
  cacheLife("days");

  return formatDate(date);
}

/**
 * `timeAgo` also reads the current time to produce relative labels.
 */
export async function timeAgoCached(date: string) {
  "use cache";
  cacheLife("days");

  return timeAgo(new Date(date));
}
