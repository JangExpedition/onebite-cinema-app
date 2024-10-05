import { MovieData } from "@/interface/type";
import Image from "next/image";
import Link from "next/link";

export default function MovieItem(props: MovieData) {
  return (
    <Link href={`/movie/${props.id}`}>
      <Image
        width={250}
        height={375}
        src={props.posterImgUrl}
        alt="영화 포스터 이미지"
      />
    </Link>
  );
}
