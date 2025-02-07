import { getListings } from "@/app/services";
import { MyPropertiesUi } from "./MyPropertiesUi";

export async function MyPropertiesServer() {
  const { data: listings, pagination } = await getListings({
    params: {
      per_page: 12,
      order_by: "added_date",
      order_dir: "desc",
      is_mine: true,
    }, // Pass searchParams directly inside params
  });
  return <MyPropertiesUi listings={listings} pagination={pagination} />;
}
