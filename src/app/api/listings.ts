import { axiosInstance } from "@/lib";
import { LISTINGS_URL } from "@/constants";
import { ISearchParams, TListing, TPaginationMetadata } from "@/types";
import { flattenFilters } from "@/helpers";
import logger from "@/lib/logger/logger";

interface TListingsResponse {
  data: TListing[];
  pagination: TPaginationMetadata;
}

export async function getListings(
  searchParams: ISearchParams = {},
): Promise<TListingsResponse> {
  try {
    const flattenedSearchParams = flattenFilters(searchParams);
    const queryParameters = new URLSearchParams(
      flattenedSearchParams,
    ).toString();
    const response = await axiosInstance.get(
      `${LISTINGS_URL}?${queryParameters}`,
    );
    const { data, ...rest } = response.data.data;
    return { data, pagination: rest };
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
      },
    };
  }
}
