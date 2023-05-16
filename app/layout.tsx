import AppWriteWrapper from "@/context/appwriteWrapper";
import { Nav } from "@/components/Nav";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

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
    <AppWriteWrapper>
      <html lang="en">
        <body
          className={`${nunito.className} w-screen h-screen overflow-hidden flex flex-row flex-nowrap`}
        >
          <Sidebar />
          <main className="flex-1 p-8 relative overflow-y-auto">
            {children}
          </main>
        </body>
      </html>
    </AppWriteWrapper>
  );
}
