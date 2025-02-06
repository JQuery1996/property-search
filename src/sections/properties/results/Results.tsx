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
      per_page: 12,
      order_by: "added_date",
      order_dir: "desc",
      company_type: companyType,
    }, // Pass searchParams directly inside params
  });

  return <ResultsUI listings={listings} pagination={pagination} />;
}
