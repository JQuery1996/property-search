"use server";
import { getListings } from "@/app/api";
import { ResultsUI } from "@/sections/properties/results/ResultsUI";
import { ISearchParams } from "@/types";

export async function Results({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { data: listings, pagination } = await getListings(searchParams);
  return <ResultsUI listings={listings} pagination={pagination} />;
}
