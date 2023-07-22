"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GetImagesFromPexels } from "./utils/actions";
import { useQueryStore } from "./utils/store";
import {
  RxChevronLeft,
  RxChevronRight,
  RxMagnifyingGlass,
} from "react-icons/rx";
import { VscLoading } from "react-icons/vsc";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const SearchRef = useRef<HTMLInputElement>(null);
  const { setQ } = useQueryStore();
  const q = String(SearchRef?.current?.value);
  const router = useRouter();

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const resp = await GetImagesFromPexels({
        query: query.length < 3 ? "interior" : query,
        page: page,
      });
      setLoading(false);
      setData(resp);
    };
    getImages();
  }, [page, query]);

  const placeHolderColors = [
    "bg-red-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-purple-200",
    "bg-green-200",
    "bg-lime-200",
    "bg-stone-200",
    "bg-indigo-200",
    "bg-pink-200",
  ];

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between mt-28 mb-8">
      <div className="w-full max-w-3xl flex flex-col items-center justify-center px-4">
        <h1 className="text-center my-2 text-3xl md:text-4xl font-black ">
          NextJS + Pexels <br /> Image Gallery Demo
        </h1>
        <div className=" my-3 w-full  px-1 flex items-center justify-between ">
          <input
            ref={SearchRef}
            type="text"
            className="px-3 border dark:border-none border-gray-300 focus-visible:outline-none w-full mx-3 py-2 rounded-md"
            placeholder="Search for Images..."
          />
          <button
            onClick={() => {
              setQuery(`${SearchRef?.current?.value}`);
              setQ(`${SearchRef?.current?.value}`);
            }}
            className="p-2 text-white font-bold dark:bg-none bg-indigo-700 rounded-md"
          >
            {loading ? (
              <VscLoading className="animate-spin text-xl" />
            ) : (
              <RxMagnifyingGlass className="text-xl" />
            )}
          </button>
        </div>
        <section className="w-full min-h-screen my-8 grid  grid-cols-2 md:grid-cols-3">
          {loading ? (
            <div className="w-full col-span-2 md:col-span-3 h-full bg-gray-200 dark:bg-glow rounded-xl animate-pulse"></div>
          ) : (
            data?.photos?.map(
              ({
                src,
                width,
                id,
                height,
                alt,
              }: {
                src: any;
                width: number;
                id: number;
                height: number;
                alt: string;
              }) => {
                return (
                  <div
                    onClick={() => router?.push(`/image/${id}`)}
                    className={` ${
                      placeHolderColors[
                        Math.floor(Math.random() * placeHolderColors.length)
                      ]
                    } p-0  m-2 hover:scale-105 transition-all hover:shadow-md dark:hover:shadow-none hover:shadow-stone-600  hover:translate-y-2 rounded-2xl`}
                    key={id}
                  >
                    <Image
                      className="rounded-2xl "
                      alt={alt}
                      src={src?.portrait}
                      loading="lazy"
                      width={width}
                      height={height}
                    />
                  </div>
                );
              }
            )
          )}
        </section>
        <div className="flex w-full items-center justify-between py-2 px-1">
          <button
            className="dark:hover:bg-glow hover:bg-gray-100 p-2.5 rounded-md flex items-center justify-center gap-2"
            onClick={() => setPage(Number(page > 1 && page - 1))}
            disabled={page == 1 ? true : false}
          >
            <RxChevronLeft className="text-2xl" />
            Previous
          </button>
          <button
            className="dark:hover:bg-glow hover:bg-gray-100 p-2.5 rounded-md flex items-center justify-center gap-2"
            disabled={data?.total_results == page ? true : false}
            onClick={() =>
              setPage(Number(page <= data?.total_results && page + 1))
            }
          >
            Next
            <RxChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </main>
  );
}
