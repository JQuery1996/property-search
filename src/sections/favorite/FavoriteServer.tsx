"use server";
import { ISearchParams } from "@/types";
import { getListings } from "@/app/services";
import { SavedItems } from "./SavedItems";

export async function FavoriteServer({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { data: listings, pagination } = await getListings({
    params: {
      ...searchParams,
      per_page: 12,
      saved_items: 1,
    }, // Pass searchParams directly inside params
  });
  return <SavedItems listings={listings} pagination={pagination} />;
}
