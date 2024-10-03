import { MovieData } from "@/interface/type";
import Link from "next/link";

export default function MovieItem(props: MovieData) {
  return (
    <Link href={`/movie/${props.id}`}>
      <img className="w-full" src={props.posterImgUrl} />
    </Link>
  );
}
