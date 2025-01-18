"use server";
import { Banner } from "./Banner";
import { filterLists } from "@/app/services";

export async function BannerWrapper() {
  // Fetch filter settings with caching
  const filterSettings = await filterLists({
    params: {
      test: 1,
      language: "en",
    },
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });
  return <Banner filterSettings={filterSettings} />;
}
