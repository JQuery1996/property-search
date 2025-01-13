import {
  Banner,
  DevelopmentProjects,
  OurApplication,
  PropertyCategory,
  RecentAdditions,
  Testimonials,
} from "@/sections";

export default async function Home() {
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
      <PropertyCategory />
      <div
        style={{
          marginTop: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <DevelopmentProjects />
      </div>

      <OurApplication />
      <Testimonials />
    </>
  );
}
