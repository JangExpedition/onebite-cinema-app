import MovieDetail from "@/components/movie-detail";
import ReviewEditor from "@/components/review-editor";
import ReviewList from "@/components/review-list";
import { MovieData } from "@/interface/type";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );
  if (!response.ok) {
    throw new Error();
  }

  const movies: MovieData[] = await response.json();

  const result = movies.reduce(
    (acc: { id: string }[], cur) => [...acc, { id: `${cur.id}` }],
    []
  );

  return result;
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
