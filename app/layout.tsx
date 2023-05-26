import AppWriteWrapper from "@/context/appwriteWrapper";
import { Nav } from "@/components/nav";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

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
          className={`${nunito.className} full-screen flex flex-row flex-nowrap overflow-hidden`}
        >
          <Sidebar />
          <main className="relative flex flex-1 flex-col">
            <Nav />
            <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
          </main>
        </body>
      </html>
    </AppWriteWrapper>
  );
}
