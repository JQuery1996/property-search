import {
  BannerWrapper,
  DevelopmentProjects,
  OurApplication,
  PropertyCategory,
  RecentAdditions,
  Subscribe,
  Testimonials,
} from "@/sections";

export default function Home() {
  return (
    <>
      <BannerWrapper />
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
      <Subscribe />
    </>
  );
}
