import MovieItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton({
  count,
  size,
}: {
  count: number;
  size: "big" | "small";
}) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <MovieItemSkeleton key={`movie_item_skeleton_${idx}`} size={size} />
    ));
}
