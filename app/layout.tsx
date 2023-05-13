import AppWriteWrapper from "@/context/appwriteWrapper";
import { Nav } from "@/components/Nav";
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
    <AppWriteWrapper>
      <html lang="en">
        <body className={nunito.className}>
          <Nav />
          {children}
        </body>
      </html>
    </AppWriteWrapper>
  );
}
