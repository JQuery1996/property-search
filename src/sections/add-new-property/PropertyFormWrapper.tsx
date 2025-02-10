"use server";
import { filterLists } from "@/app/services";
import { PropertyForm } from "@/sections";

export async function PropertyFormWrapper() {
  // Fetch filter settings with caching
  const filterSettings = await filterLists({
    params: {
      test: 1,
      language: "en",
    },
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });
  return <PropertyForm filterSettings={filterSettings} />;
}
