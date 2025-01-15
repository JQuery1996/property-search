import { Banner, Results } from "@/sections";
import { ISearchParams } from "@/types";
import { Suspense } from "react";
import { PropertiesSkeleton } from "@/components";

export default function Properties({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  return (
    <>
      <Banner />
      <div
        style={{
          marginTop: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Suspense fallback={<PropertiesSkeleton />} key={Math.random()}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
