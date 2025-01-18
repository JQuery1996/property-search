"use server";
import { ResultsUI } from "./ResultsUI";
import { ISearchParams } from "@/types";
import { getListings } from "@/app/services";

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
