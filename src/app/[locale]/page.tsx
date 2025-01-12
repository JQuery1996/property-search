import {
  Banner,
  OurApplication,
  PropertyCategory,
  RecentAdditions,
} from "@/sections";
import { DevelopmentProjects } from "@/sections/home/developmentProjects/DevelopmentProjects";

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
    </>
  );
}
