import MovieItem from "@/components/movie-item";
import movies from "@/dummy.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <h3>지금 가장 추천하는 영화</h3>
      <div className="grid grid-cols-3 gap-[5px]">
        {movies.slice(0, 3).map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
      <h3>등록된 모든 영화</h3>
      <div className="grid grid-cols-5 gap-[5px]">
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
