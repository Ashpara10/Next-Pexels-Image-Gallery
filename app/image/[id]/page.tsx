"use client";
import { GetImageFromId } from "@/app/utils/actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxChevronRight } from "react-icons/rx";
import { VscLoading } from "react-icons/vsc";

const DynamicImageRoute = ({ params }: { params: { id: number } }) => {
  const [img, setImg] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getDataFromId = async () => {
      setLoading(true);
      const resp = await GetImageFromId({ id: params?.id });
      setImg(resp);
      setLoading(false);
    };
    getDataFromId();
  }, []);
  return (
    <main className="flex mt-20 md:mt-0 items-center justify-center w-full min-h-screen">
      <section className="max-w-2xl  w-full gap-2 flex flex-col md:flex-row items-center justify-center">
        <div className="max-w-sm w-full flex items-center justify-center">
          {loading ? (
            <VscLoading className="animate-spin text-2xl " />
          ) : (
            <Image
              className="w-full rounded-3xl"
              alt={img?.alt}
              src={img?.src?.large2x}
              width={img?.width}
              height={img?.height}
              loading="lazy"
            />
          )}
        </div>
        <div className="w-full h-[65vh] p-2 flex flex-col items-center gap-y-4 justify-start">
          <span className="flex items-center justify-center gap-1">
            <RxChevronRight />
            Photos
            <RxChevronRight />
            Interior
            <RxChevronRight />
            {params?.id}
          </span>
          <span className="flex gap-1 px-2">
            Photographed By:{" "}
            <a
              target="_blank"
              className="hover:text-blue-600 hover:underline"
              href={img?.photographer_url}
            >
              @{img?.photographer}
            </a>
          </span>
        </div>
      </section>
    </main>
  );
};

export default DynamicImageRoute;
