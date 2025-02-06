"use server";
import { RecentAdditionsUI } from "./RecentAdditionsUI";
import { getListings } from "@/app/services";

export async function RecentAdditions() {
  const { data } = await getListings({
    params: {
      order_by: "added_date",
    }, // Pass searchParams directly inside params
    // next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });
  return <RecentAdditionsUI listings={data} />;
}
