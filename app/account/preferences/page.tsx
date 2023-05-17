"use client";

import { LinkToSpotify } from "@/components/link-to-spotify";
import { UnlinkFromSpotify } from "@/components/unlink-from-spotify";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "react-appwrite";

const REFRESH_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export default function Preferences() {
  const { data: account, isLoading } = useAccount();
  const router = useRouter();

  if (!account && !isLoading) {
    router.push("/account/login");
  } else {
    return (
      <div className="flex flex-col gap-2">
        <LinkToSpotify />
        <UnlinkFromSpotify />
      </div>
    );
  }
}
