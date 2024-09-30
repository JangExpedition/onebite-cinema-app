import MovieItem from "@/components/movie-item";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/interface/type";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function AllMovies() {
  await delay(3000);
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`;
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("fetch AllMovies failed: " + response.statusText);
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => (
    <MovieItem key={`all_${movie.id}`} {...movie} />
  ));
}

async function RandomMovies() {
  await delay(1500);
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`;
  const response = await fetch(url, { next: { revalidate: 30 } });

  if (!response.ok) {
    throw new Error("fetch ReandomMovies failed: " + response.statusText);
  }

  const randomMovies: MovieData[] = await response.json();

  return randomMovies
    .slice(0, 3)
    .map((movie) => <MovieItem key={`random_${movie.id}`} {...movie} />);
}

export default function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <h3>지금 가장 추천하는 영화</h3>
      <div className="grid grid-cols-3 gap-[5px]">
        <Suspense fallback={<MovieListSkeleton count={3} size="big" />}>
          <RandomMovies />
        </Suspense>
      </div>
      <h3>등록된 모든 영화</h3>
      <div className="grid grid-cols-5 gap-[5px]">
        <Suspense fallback={<MovieListSkeleton count={10} size="small" />}>
          <AllMovies />
        </Suspense>
      </div>
    </div>
  );
}
