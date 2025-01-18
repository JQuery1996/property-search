import { ISearchParams } from "@/types";

export const flattenFilters = (
  filters: ISearchParams,
): Record<string, string> => {
  const flattened: Record<string, string> = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) flattened[key] = value.join(","); // Handle arrays
    } else {
      flattened[key] = value.toString(); // Handle primitives
    }
  }
  return flattened;
};
