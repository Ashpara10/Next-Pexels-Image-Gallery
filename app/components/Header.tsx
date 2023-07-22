"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useQueryStore } from "../utils/store";
import { RxSun, RxMoon } from "react-icons/rx";
import { useRouter } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const query = useQueryStore((state) => state.search);
  const router = useRouter();
  return (
    <header className="flex items-center justify-center w-full fixed top-0 z-10 dark:bg-dark/50 bg-white/50 backdrop-blur-md h-16">
      <div className="w-full px-4 py-2  max-w-3xl flex items-center justify-between">
        <span onClick={() => router.push("/")}> NextJS + Pexels </span>
        <button
          className="text-lg font-bold dark:bg-orange-300 dark:text-black text-white bg-indigo-700 p-2.5 rounded-xl"
          onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        >
          {theme == "light" ? <RxMoon /> : <RxSun />}
        </button>
      </div>
    </header>
  );
};

export default Header;
