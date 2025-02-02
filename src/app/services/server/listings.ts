"use server";
import { LISTINGS_URL } from "@/constants";
import { TFetchOptions, TListing, TPaginationMetadata } from "@/types";
import { fetchInstance, logger } from "@/lib"; // Import FetchOptions

interface TListingsResponse {
  data: TListing[];
  pagination: TPaginationMetadata;
}

export async function getListings(
  options?: TFetchOptions, // Accept only the options parameter
): Promise<TListingsResponse> {
  try {
    // Use fetchInstance to fetch listings
    const response = await fetchInstance<{
      data: TListing[];
      [key: string]: any;
    }>(LISTINGS_URL, {
      ...options, // Spread all options (including params, headers, caching, etc.)
    });

    // Extract data and pagination from the response
    const { data, ...rest } = response;
    return { data, pagination: rest as TPaginationMetadata };
  } catch (error) {
    logger.error("Failed to fetch Listings", { error });
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

export async function getListing(
  id: string,
  options?: TFetchOptions,
): Promise<TListing | null> {
  try {
    const response = await fetchInstance<TListing>(
      `${LISTINGS_URL}/${id}`,
      options,
    );
    return response;
  } catch (error) {
    logger.error(`Failed to fetch listing [${id}]`, { error });
    return null;
  }
}
