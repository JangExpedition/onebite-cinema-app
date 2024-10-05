import { notFound } from "next/navigation";

export default async function MovieDetail({ movieId }: { movieId: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { next: { tags: [`review-${movieId}`] } }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }
    throw new Error("Movie Detial fetch failed: " + response.statusText);
  }

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = await response.json();

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="flex justify-center p-5 bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${posterImgUrl})` }}
      >
        <img className="z-[1] max-h-[350px] h-full" src={posterImgUrl} />
        <div className="absolute inset-0 bg-black bg-opacity-70 w-full h-full"></div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="m-0 text-2xl font-bold leading-tight">{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="font-bold">{subTitle}</div>
          <div className="leading-relaxed">{description}</div>
        </div>
      </div>
    </div>
  );
}
