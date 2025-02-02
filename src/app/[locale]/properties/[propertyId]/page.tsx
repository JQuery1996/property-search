import { PropertyDetails } from "@/sections";

export default function Property({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = params; // Extract `id` from `params`
  return <PropertyDetails propertyId={propertyId} />;
}
