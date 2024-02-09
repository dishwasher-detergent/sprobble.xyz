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
          "min-h-screen bg-background antialiased",
          fontSans.className
        )}
      >
        <header className="w-full border-b">
          <div className="max-w-7xl mx-auto w-full p-4">
            <nav>
              <ul className="flex flex-row gap-4">
                <li>Sprobble</li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="w-full max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
