"use server";
import { getDevelopers } from "@/app/api";
import { DevelopmentProjectsUI } from "./DevelopmentProjectsUI";

export async function DevelopmentProjects() {
  const { data } = await getDevelopers({ page: "1", per_page: "12" });
  return <DevelopmentProjectsUI developmentProperties={data} />;
}
