import movies from "@/dummy.json";

export default function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const movie = movies.filter((movie) => movie.id === id)[0];
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="flex justify-center p-5 bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${movie.posterImgUrl})` }}
      >
        <img className="z-[1] max-h-[350px] h-full" src={movie.posterImgUrl} />
        <div className="absolute inset-0 bg-black bg-opacity-70 w-full h-full"></div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="m-0 text-2xl font-bold leading-tight">
            {movie.title}
          </h2>
          <div>
            {movie.releaseDate} / {movie.genres.join(", ")} / {movie.runtime}분
          </div>
          <div>{movie.company}</div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="font-bold">{movie.subTitle}</div>
          <div className="leading-relaxed">{movie.description}</div>
        </div>
      </div>
    </div>
  );
}
