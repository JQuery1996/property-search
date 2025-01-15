"use server";
import { RecentAdditionsUI } from "./RecentAdditionsUI";
import { getListings } from "@/app/api";

export async function RecentAdditions() {
  const { data } = await getListings({ page: "1", per_page: "12" });
  return <RecentAdditionsUI listings={data} />;
}
