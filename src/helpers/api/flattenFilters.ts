export const flattenFilters = (
  filters: ListingFilters,
): Record<string, string> => {
  const flattened: Record<string, string> = {};
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      flattened[key] = value.join(","); // Handle arrays
    } else {
      flattened[key] = value.toString(); // Handle primitives
    }
  }
  return flattened;
};