"use server";
import { DEVELOPERS_URL } from "@/constants";
import {
  TFetchOptions,
  TDevelopmentProperty,
  TPaginationMetadata,
  TProject,
} from "@/types";
import { fetchInstance, logger } from "@/lib"; // Import fetchInstance

interface TDevelopersResponse {
  data: TDevelopmentProperty[];
  pagination: TPaginationMetadata;
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
    const { data, ...rest } = response;
    return { data, pagination: rest as TPaginationMetadata };
  } catch (error) {
    logger.error("Failed to fetch developers", { error });
    return {
      data: [],
      pagination: {
        from: 0,
        to: 0,
        total: 0,
        current_page: 0,
        per_page: 0,
      } as TPaginationMetadata,
    };
  }
}

export async function getDeveloper(
  id: string,
  options?: TFetchOptions, // Accept only the options parameter
): Promise<{
  developer: TDevelopmentProperty;
  projects: TProject[];
} | null> {
  try {
    console.log({ id });
    // Use fetchInstance to fetch developers
    const response = await fetchInstance<any>(
      `${DEVELOPERS_URL}/${id}/projects`,
      {
        ...options, // Spread all options (including params, headers, caching, etc.)
      },
    );
    // Extract data from the response
    return response as {
      developer: TDevelopmentProperty;
      projects: TProject[];
    };
  } catch (error) {
    logger.error("Failed to fetch developer", { error });
    return null;
  }
}
