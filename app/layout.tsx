import { AudioPlayer } from "@/components/audio/player";
import { Nav } from "@/components/nav";
import { Sidebar } from "@/components/sidebar";
import AppWriteWrapper from "@/context/appwriteWrapper";
import { AudioProvider } from "@/context/audioWrapper";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

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
            className={`${nunito.className} full-screen flex flex-row flex-nowrap overflow-hidden`}
          >
            <Sidebar />
            <main className="relative flex flex-1 flex-col">
              <Nav />
              <div className="w-screen flex-1 overflow-y-auto overflow-x-hidden p-4 md:w-full md:p-8">
                {children}
              </div>
              <AudioPlayer />
            </main>
          </body>
        </html>
      </AppWriteWrapper>
    </AudioProvider>
  );
}
