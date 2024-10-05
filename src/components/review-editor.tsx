"use client";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ movieId }: { movieId: number }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-2.5" action={formAction}>
      <input type="hidden" value={movieId} name="movieId" />
      <textarea
        name="content"
        className="resize-none w-full h-20 border-[1px] border-gray-300 p-2"
        placeholder="리뷰 내용"
        disabled={isPending}
        required
      />
      <div className="flex gap-1 justify-end">
        <input
          name="author"
          placeholder="작성자"
          className="border-[1px] border-gray-300 p-1"
          disabled={isPending}
          required
        />
        <button
          type="submit"
          className="bg-white text-black p-1 font-semibold"
          disabled={isPending}
        >
          {isPending ? "..." : "작성하기"}
        </button>
      </div>
    </form>
  );
}
