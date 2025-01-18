"use server";
import { DEVELOPERS_URL } from "@/constants";
import { TFetchOptions, TDevelopmentProperty } from "@/types";
import { fetchInstance, logger } from "@/lib"; // Import fetchInstance

interface TDevelopersResponse {
  data: TDevelopmentProperty[];
}

export async function getDevelopers(
  options?: TFetchOptions, // Accept only the options parameter
): Promise<TDevelopersResponse> {
  try {
    // Use fetchInstance to fetch developers
    const response = await fetchInstance<{
      data: TDevelopmentProperty[];
      [key: string]: any;
    }>(DEVELOPERS_URL, {
      ...options, // Spread all options (including params, headers, caching, etc.)
    });

    // Extract data from the response
    const { data } = response;
    return { data };
  } catch (error) {
    logger.error("Failed to fetch developers", { error });
    return { data: [] }; // Return an empty array if something goes wrong
  }
}
