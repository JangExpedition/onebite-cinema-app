import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/interface/type";
import { delay } from "@/util/delay";
import { Suspense } from "react";

export async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`;
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("fetch SearchResult failed: " + response.statusText);
  }

  const result: MovieData[] = await response.json();

  return result.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      <Suspense fallback={<MovieListSkeleton count={3} size="big" />}>
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
