import MovieItem from "@/components/movie-item";
import { MovieData } from "@/interface/movie";

async function AllMovies() {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`;
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {movies.map((movie) => (
        <MovieItem key={`all_${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RandomMovies() {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`;
  const response = await fetch(url, { next: { revalidate: 30 } });

  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const randomMovies: MovieData[] = await response.json();

  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {randomMovies.slice(0, 3).map((movie) => (
        <MovieItem key={`random_${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <h3>지금 가장 추천하는 영화</h3>
      <RandomMovies />
      <h3>등록된 모든 영화</h3>
      <AllMovies />
    </div>
  );
}
