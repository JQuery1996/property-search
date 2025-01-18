"use server";
import { getListings } from "@/app/api";
import { ResultsUI } from "@/sections/properties/results/ResultsUI";
import { ISearchParams } from "@/types";

export async function Results({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { data: listings, pagination } = await getListings({
    params: {
      ...searchParams,
      order_by: "added_date",
    }, // Pass searchParams directly inside params
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  return <ResultsUI listings={listings} pagination={pagination} />;
}
