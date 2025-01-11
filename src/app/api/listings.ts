import { axiosInstance } from "@/lib";
import { LISTINGS_URL } from "@/constants";
import { TFilter, TListing } from "@/types";
import { flattenFilters } from "@/helpers";
import logger from "@/lib/logger/logger";

interface TListingsResponse {
  data: TListing[];
}

export async function getListings(
  filters: TFilter = {},
): Promise<TListingsResponse> {
  try {
    const flattenedFilters = flattenFilters(filters);
    const queryParameters = new URLSearchParams(flattenedFilters).toString();
    const response = await axiosInstance.get(
      `${LISTINGS_URL}?${queryParameters}`,
    );
    const { data } = response.data.data;
    return { data };
  } catch (error) {
    logger.error("Failed to fetch Listings", { error });
    return { data: [] };
  }
}
