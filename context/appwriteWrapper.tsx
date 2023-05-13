"use client";

import { Client } from "appwrite";
import { AppwriteProvider } from "react-appwrite";

const appwrite = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export default function AppWriteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppwriteProvider client={appwrite} devTools={false}>
      {children}
    </AppwriteProvider>
  );
}
