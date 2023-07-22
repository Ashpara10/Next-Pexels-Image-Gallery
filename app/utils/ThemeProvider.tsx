"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export function DarkThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
