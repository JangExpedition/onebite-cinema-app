import SearchResult from "@/components/search-result";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Metadata {
  const q = searchParams.q;
  return {
    title: `한입 시네마 | ${q} 검색 결과`,
    description: "한입 시네마에 등록된 영화들을 만나보세요",
    openGraph: {
      title: "한입 시네마",
      description: "한입 시네마에 등록된 영화들을 만나보세요",
      images: ["/thumbnail.png"],
    },
  };
}

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
