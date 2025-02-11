import { getMostSearchArea } from "@/app/services";
import { MostSearchAreaUi } from "./MostSearchAreaUi";

export async function MostSearchAreaWrapper() {
  const mostSearchAreas = await getMostSearchArea();
  return <MostSearchAreaUi mostSearchAreas={mostSearchAreas} />;
}
