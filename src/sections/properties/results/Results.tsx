"use server";
import { ResultsUI } from "./ResultsUI";
import { ISearchParams } from "@/types";
import { getListings } from "@/app/services";

export async function Results({
  searchParams,
  companyType = "normal_company",
}: {
  searchParams: ISearchParams;
  companyType?: string;
}) {
  const { data: listings, pagination } = await getListings({
    params: {
      ...searchParams,
      order_by: "added_date",
      order_dir: "desc",
      company_type: companyType,
    }, // Pass searchParams directly inside params
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  return <ResultsUI listings={listings} pagination={pagination} />;
}
