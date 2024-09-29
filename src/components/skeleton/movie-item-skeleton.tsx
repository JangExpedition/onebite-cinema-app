export default function MovieItemSkeleton({ size }: { size: "big" | "small" }) {
  return (
    <div
      className={`w-full ${
        size === "big" ? "h-[365px]" : "h-[222px]"
      } bg-gray-300`}
    ></div>
  );
}
