import Footer from "@/components/footer";
import { Nav } from "@/components/nav";
import AppWriteWrapper from "@/context/appwriteWrapper";
import { AudioProvider } from "@/context/audioWrapper";
import { ThemeWrapper } from "@/context/themeWrapper";
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
            <ThemeWrapper>
              <main className="relative flex flex-1 flex-col">
                <Nav />
                <div className="flex w-screen flex-1 flex-col overflow-y-auto overflow-x-hidden md:w-full">
                  <div className="relative mx-auto w-full max-w-screen-2xl flex-1 p-4">
                    {children}
                  </div>
                  <Footer />
                </div>
              </main>
            </ThemeWrapper>
          </body>
        </html>
      </AppWriteWrapper>
    </AudioProvider>
  );
}
