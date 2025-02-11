"use server";
import { fetchInstance } from "@/lib";
import { TFetchOptions, TMostSearchArea } from "@/types";
import { MOST_SEARCH_AREA_URL } from "@/constants";

export async function getMostSearchArea(
  options?: TFetchOptions, // Accept only the options parameter
): Promise<TMostSearchArea[]> {
  try {
    // Use fetchInstance to fetch filter settings
    const response = await fetchInstance<any>(MOST_SEARCH_AREA_URL, {
      ...options, // Spread all options (including params, headers, caching, etc.)
    }); // Return the fetched data

    return response as TMostSearchArea[];
  } catch (error) {
    console.error("Failed to fetch filter settings", { error });

    return [];
  }
}
