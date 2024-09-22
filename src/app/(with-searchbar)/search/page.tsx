export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q;
  return <p>Search {q}</p>;
}
