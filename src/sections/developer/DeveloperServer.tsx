import { getDeveloper } from "@/app/services";
import { notFound } from "next/navigation";
import { DeveloperUi } from "@/sections/developer/DeveloperUi";

export async function DeveloperServer({ id }: { id: string }) {
  const response = await getDeveloper(id, {
    // next: { revalidate: 3600 },
  });
  // If details is null, return a 404 Not Found response
  if (!response) {
    return notFound();
  }
  return (
    <DeveloperUi developer={response.developer} projects={response.projects} />
  );
}
