import { Logo } from "@/components/logo";
import { Nav } from "@/components/nav";
import AppWriteWrapper from "@/context/appwriteWrapper";
import { AudioProvider } from "@/context/audioWrapper";
import { Cabin } from "next/font/google";
import "./globals.css";

const font = Cabin({ subsets: ["latin"] });

export const metadata = {
  title: "Sprobble",
  description: "Track your Spotify plays.",
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
            <main className="relative flex flex-1 flex-col">
              <Nav />
              <div className="flex w-screen flex-1 flex-col overflow-y-auto overflow-x-hidden md:w-full">
                <div className="relative mx-auto w-full max-w-7xl flex-1 p-4">
                  {children}
                </div>
                <footer className="mt-4 w-full bg-black p-4 text-white">
                  <div className="pb-4">
                    <Logo />
                  </div>
                  <div className="text-sm">
                    <p>
                      All track/artist/album data is sourced from the Spotify
                      API.
                    </p>
                    <p>All statistics are sourced from Sprobble users.</p>
                  </div>
                </footer>
              </div>
            </main>
          </body>
        </html>
      </AppWriteWrapper>
    </AudioProvider>
  );
}
