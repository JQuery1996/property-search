"use server";
import { getDevelopers } from "@/app/services";
import { DevelopersUi } from "./DevelopersUi";
import { ISearchParams } from "@/types";

export async function DevelopersServer({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { data, pagination } = await getDevelopers({
    params: {
      ...searchParams,
      per_page: 12,
    },
  });
  return <DevelopersUi developmentProperties={data} pagination={pagination} />;
}
