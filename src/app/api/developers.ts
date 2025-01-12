import { axiosInstance } from "@/lib";
import { DEVELOPERS_URL } from "@/constants";
import { TDevelopmentProperty, TFilter } from "@/types";
import { flattenFilters } from "@/helpers";
import logger from "@/lib/logger/logger";

interface TDevelopersResponse {
  data: TDevelopmentProperty[];
}

export async function getDevelopers(
  filters: TFilter = {},
): Promise<TDevelopersResponse> {
  try {
    const flattenedFilters = flattenFilters(filters);
    const queryParameters = new URLSearchParams(flattenedFilters).toString();
    const response = await axiosInstance.get(
      `${DEVELOPERS_URL}?${queryParameters}`,
    );
    const { data } = response.data.data;
    return { data };
  } catch (error) {
    logger.error("Failed to fetch developers", { error });
    return { data: [] };
  }
}
