import { Banner, RecentAdditions } from "@/sections";

export default function Home() {
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
        <RecentAdditions />
      </div>
    </>
  );
}
