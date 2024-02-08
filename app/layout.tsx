import Footer from "@/components/footer";
import { Nav } from "@/components/nav";
import { Toaster } from "@/components/ui/toaster";
import AppWriteWrapper from "@/context/appwriteWrapper";
import { AudioProvider } from "@/context/audioWrapper";
import { ThemeWrapper } from "@/context/themeWrapper";
import { Cabin } from "next/font/google";
import "./globals.css";

const font = Cabin({ subsets: ["latin"] });

export const metadata = {
  title: "Sprobble",
  description: "Track your Spotify plays.",
  image: "/favicon/cassette-tape.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioProvider>
      <AppWriteWrapper>
        <html lang="en">
          <body
            className={`${font.className} full-screen flex flex-row flex-nowrap overflow-hidden`}
          >
            <ThemeWrapper>
              <main className="relative flex flex-1 flex-col">
                <Nav />
                <div className="flex w-screen flex-1 flex-col overflow-y-auto overflow-x-hidden md:w-full">
                  <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 pt-8">
                    {children}
                  </div>
                  <Footer />
                </div>
              </main>
              <Toaster />
            </ThemeWrapper>
          </body>
        </html>
      </AppWriteWrapper>
    </AudioProvider>
  );
}
