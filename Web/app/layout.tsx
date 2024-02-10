import { Outfit as FontSans } from "next/font/google";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen antialiased",
          fontSans.className,
        )}
      >
        <header className="w-full border-b">
          <div className="mx-auto w-full max-w-7xl p-4">
            <nav>
              <ul className="flex flex-row gap-4">
                <li>Sprobble</li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
      </body>
    </html>
  );
}
