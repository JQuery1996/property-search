import { Banner, Results } from "@/sections";
import { ISearchParams } from "@/types/TSearchParams";

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
        <Results searchParams={searchParams} />
      </div>
    </>
  );
}
