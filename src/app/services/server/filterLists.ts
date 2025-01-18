"use server";
import { fetchInstance } from "@/lib";
import { TFetchOptions, TFilterSettings } from "@/types";
import { FILTER_LISTS } from "@/constants";

export async function filterLists(
  options?: TFetchOptions, // Accept only the options parameter
): Promise<TFilterSettings> {
  try {
    // Use fetchInstance to fetch filter settings
    return await fetchInstance<TFilterSettings>(FILTER_LISTS, {
      ...options, // Spread all options (including params, headers, caching, etc.)
    }); // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch filter settings", { error });
    return {
      property_types: {},
      amenities: [],
      sources: [],
      price_periods: [],
    } as TFilterSettings; // Return an empty object if something goes wrong
  }
}
