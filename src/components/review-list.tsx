import { ReviewData } from "@/interface/type";
import ReviewItem from "./review-item";

export default async function ReviewList({ movieId }: { movieId: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!response.ok) {
    throw new Error("fetch error: " + response.statusText);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <div className="flex flex-col">
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </div>
  );
}
