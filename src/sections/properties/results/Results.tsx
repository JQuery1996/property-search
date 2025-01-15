"use server";
import { ISearchParams } from "@/types";
import { getListings } from "@/app/api";
import { ResultsUI } from "@/sections/properties/results/ResultsUI";

export async function Results({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { data: listings, pagination } = await getListings(searchParams);
  return <ResultsUI listings={listings} pagination={pagination} />;
}
