import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Header from "./components/Header";
import { DarkThemeProvider } from "./utils/ThemeProvider";
import Footer from "./components/Footer";

const gro = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Image-Gallery",
  description:
    "Next-Image-Gallery is an image library created using nextjs and pexels api ,it comes with thousands of free high quality stock images and a clean and minimal UI ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${gro.className} dark:bg-dark transition-all ease-in-out`}
      >
        <DarkThemeProvider>
          <Header />
          {children}
          <Footer />
        </DarkThemeProvider>
      </body>
    </html>
  );
}
