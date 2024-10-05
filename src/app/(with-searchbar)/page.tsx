import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/interface/type";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "한입 시네마",
  description: "한입 시네마에 등록된 영화들을 만나보세요",
  openGraph: {
    title: "한입 시네마",
    description: "한입 시네마에 등록된 영화들을 만나보세요",
    images: ["/thumbnail.png"],
  },
};

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("fetch AllMovies failed: " + response.statusText);
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => (
    <MovieItem key={`all_${movie.id}`} {...movie} />
  ));
}

async function RandomMovies() {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`;
  const response = await fetch(url, { next: { revalidate: 30 } });

  if (!response.ok) {
    throw new Error("fetch ReandomMovies failed: " + response.statusText);
  }

  const randomMovies: MovieData[] = await response.json();

  return randomMovies.map((movie) => (
    <MovieItem key={`random_${movie.id}`} {...movie} />
  ));
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
