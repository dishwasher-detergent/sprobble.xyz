"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loading/loader";
import { useAppwrite } from "react-appwrite";
import { LucideAlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnlinkFromSpotifyFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UnlinkFromSpotify({
  className,
  ...props
}: UnlinkFromSpotifyFormProps) {
  const [loading, isLoading] = useState<boolean>(false);
  const accountService = useAppwrite().account;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    isLoading(true);
    await accountService.updatePrefs({ refresh_token: "" });
    isLoading(false);
  }

  return (
    <Card className="border border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive flex flex-row gap-2 items-center">
          Danger Zone
          <LucideAlertCircle size={16} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Button disabled={loading} variant="destructive">
            {loading && <Loader className="text-white h-full mr-4" />}
            Remove Spotify Link
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
