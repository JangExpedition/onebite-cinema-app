import { ReviewData } from "@/interface/type";

function dateFormat(date: string) {
  let result = new Date(date).toLocaleDateString();
  switch (new Date(date).getDay()) {
    case 1:
      result += " 월";
      break;
    case 2:
      result += " 화";
      break;
    case 3:
      result += " 수";
      break;
    case 4:
      result += " 목";
      break;
    case 5:
      result += " 금";
      break;
    case 6:
      result += " 토";
      break;
    case 7:
      result += " 일";
      break;
  }

  return result;
}

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className="w-full py-3 flex flex-col justify-start border-b-[1px] border-gray-300">
      <div className="flex gap-2">
        <div className="font-bold text-white">{author}</div>
        <div className="text-gray-500">{dateFormat(createdAt)} 작성됨</div>
      </div>
      <div className="py-2">{content}</div>
      <div>
        <button className="underline cursor-pointer">🗑️ 리뷰 삭제하기</button>
      </div>
    </div>
  );
}
