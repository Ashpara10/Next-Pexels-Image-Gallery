import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-2 py-8 flex flex-col items-center justify-center border-t border-gray-200 dark:border-glow">
      <div className="w-full max-w-3xl my-4 flex flex-col items-center justify-center">
        <h3 className="flex text-center">
          Powered By <br />
          Vercel + Pexels
        </h3>
      </div>
    </footer>
  );
}
