import { MovieData } from "@/interface/type";
import MovieItem from "./movie-item";

export default async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("fetch SearchResult failed: " + response.statusText);
  }

  const result: MovieData[] = await response.json();

  return result.map((movie) => <MovieItem key={movie.id} {...movie} />);
}
