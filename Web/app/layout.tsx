import { Outfit as FontSans } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/ui/footer";
import { Nav } from "@/components/ui/nav";
import { ThemeProvider } from "@/contexts/theme-provider";
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
          fontSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
