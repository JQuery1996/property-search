"use server";
import { filterLists, getListing } from "@/app/services";
import { PropertyForm } from "@/sections";
import NotFound from "next/dist/client/components/not-found-error";

export async function PropertyFormWrapper({
  propertyId,
}: {
  propertyId?: string;
}) {
  // Fetch details and filter settings in parallel
  const [details, filterSettings] = await Promise.all([
    propertyId ? getListing(propertyId) : Promise.resolve(null), // Only call getListing if propertyId exists
    filterLists({
      params: {
        test: 1,
        language: "en",
      },
      next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
    }),
  ]);

  if (propertyId && !details) return NotFound();
  return <PropertyForm filterSettings={filterSettings} details={details} />;
}
