import { cn } from "@/lib/utils";

interface SpotifyProps {
  variant?: "white" | "black" | "color";
  icon?: boolean;
  className?: string;
}

export function Spotify({
  variant = "color",
  icon = true,
  className,
}: SpotifyProps) {
  function image() {
    switch (variant) {
      case "black":
        if (icon) return "/spotify/Spotify_Icon_RGB_Black.png";
        return "/spotify/Spotify_Logo_RGB_Black.png";
      case "color":
        if (icon) return "/spotify/Spotify_Icon_RGB_Green.png";
        return "/spotify/Spotify_Logo_RGB_Green.png";
      case "white":
        if (icon) return "/spotify/Spotify_Icon_RGB_White.png";
        return "/spotify/Spotify_Logo_RGB_White.png";
    }
  }

  return (
    <div className={cn("w-6 flex-none", className)}>
      <img src={image()} className="h-full w-full" />
    </div>
  );
}
