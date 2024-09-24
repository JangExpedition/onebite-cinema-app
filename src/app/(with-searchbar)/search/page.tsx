import MovieItem from "@/components/movie-item";
import movies from "@/dummy.json";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q as string;
  const result = movies.filter((movie) => movie.title.includes(q));
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {result.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
