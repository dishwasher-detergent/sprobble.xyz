import { Outfit as FontSans } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/ui/nav";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head />
      <body
        className={cn(
          "bg-background min-h-screen antialiased",
          fontSans.className,
        )}
      >
        <Nav />
        <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
      </body>
    </html>
  );
}
