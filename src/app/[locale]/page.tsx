import { Banner, RecentAdditions } from "@/sections";
import { getListings } from "@/app/api";

export default async function Home() {
  const { data } = await getListings({ page: 1, per_page: 10 });
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
        <RecentAdditions listings={data} />
      </div>
    </>
  );
}
