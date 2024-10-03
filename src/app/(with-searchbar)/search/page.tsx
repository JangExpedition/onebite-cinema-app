import SearchResult from "@/components/search-result";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      <Suspense
        key={searchParams.q || ""}
        fallback={<MovieListSkeleton count={3} size="big" />}
      >
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
