import MovieDetail from "@/components/movie-detail";
import ReviewEditor from "@/components/review-editor";
import ReviewList from "@/components/review-list";
import { MovieData } from "@/interface/type";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );
  if (!response.ok) {
    throw new Error();
  }

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: movie.id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | null> {
  const movieId = params.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Movie Detial fetch failed: " + response.statusText);
  }

  const movie: MovieData = await response.json();

  return {
    title: `한입 시네마 | ${movie.title}`,
    description: `${movie.description}`,
    openGraph: {
      title: `한입 시네마 | ${movie.title}`,
      description: `${movie.description}`,
      images: [`${movie.posterImgUrl}`],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const movieId = params.id;
  return (
    <div className="flex flex-col gap-6">
      <MovieDetail movieId={movieId} />
      <ReviewEditor movieId={movieId} />
      <ReviewList movieId={movieId} />
    </div>
  );
}
