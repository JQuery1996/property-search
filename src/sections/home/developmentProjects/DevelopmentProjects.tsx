"use server";
import { getDevelopers } from "@/app/api";
import { DevelopmentProjectsUI } from "./DevelopmentProjectsUI";

export async function DevelopmentProjects() {
  const { data } = await getDevelopers({
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });
  return <DevelopmentProjectsUI developmentProperties={data} />;
}
