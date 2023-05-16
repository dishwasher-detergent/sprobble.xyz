import { useAppwrite } from "react-appwrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/Loader";

interface UnlinkFromSpotifyFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LinkToSpotify({
  className,
  ...props
}: UnlinkFromSpotifyFormProps) {
  const [loading, isLoading] = useState<boolean>(false);
  const accountService = useAppwrite().account;

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spotify</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Button
            disabled={loading}
            variant="default"
            className="bg-green-500 hover:bg-green-600"
          >
            {loading && <Loader className="text-white h-full mr-4" />}
            Link To Spotify
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
