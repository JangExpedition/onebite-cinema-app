import MovieItem from "@/components/movie-item";
import { MovieData } from "@/interface/movie";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await delay(1500);
  const q = searchParams.q as string;
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`;
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const result: MovieData[] = await response.json();

  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {result.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
