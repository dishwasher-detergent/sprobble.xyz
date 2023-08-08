"use client";

import { ThemeProvider } from "next-themes";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
