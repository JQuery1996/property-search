import { Suspense } from "react";
import { FavoriteServer } from "@/sections";
import { ISearchParams } from "@/types";
import { SavedItemSkeleton } from "@/components";

export default function Favorite({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  return (
    <Suspense fallback={<SavedItemSkeleton />} key={Math.random()}>
      <FavoriteServer searchParams={searchParams} />
    </Suspense>
  );
}
