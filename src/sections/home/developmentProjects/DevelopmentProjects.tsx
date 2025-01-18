"use server";
import { DevelopmentProjectsUI } from "./DevelopmentProjectsUI";
import { getDevelopers } from "@/app/services";

export async function DevelopmentProjects() {
  const { data } = await getDevelopers({
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });
  return <DevelopmentProjectsUI developmentProperties={data} />;
}
