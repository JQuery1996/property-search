import { getListing } from "@/app/services";
import { PropertyDetailsUI } from "./PropertyDetailsUI";
import { notFound } from "next/navigation";

export async function PropertyDetails({ propertyId }: { propertyId: string }) {
  const details = await getListing(propertyId);

  // If details is null, return a 404 Not Found response
  if (!details) {
    return notFound();
  }

  // Otherwise, render the PropertyDetailsUI component
  return <PropertyDetailsUI details={details} />;
}
