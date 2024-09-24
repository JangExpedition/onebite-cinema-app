"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex gap-[10px] mb-5">
      <input
        type="text"
        value={search}
        placeholder="검색어를 입력해주세요."
        onChange={onChangeHandler}
        className="flex-1 p-[15px] rounded-[5px] border-[1.5px] border-gray-700 text-white"
      />
      <button
        type="submit"
        className="w-[80px] rounded-[5px] border-none bg-gray-700 text-white cursor-pointer"
      >
        검색
      </button>
    </form>
  );
}
