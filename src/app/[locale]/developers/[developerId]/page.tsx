import { Suspense } from "react";
import { DeveloperServer } from "@/sections";
import { ProjectsSkeleton } from "@/components";

export default function Developer({
  params,
}: {
  params: { developerId: string };
}) {
  const { developerId } = params;
  return (
    <Suspense fallback={<ProjectsSkeleton />} key={Math.random()}>
      <DeveloperServer id={developerId} />
    </Suspense>
  );
}
