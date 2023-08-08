import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function DarkToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="flex-none"
    >
      {theme == "dark" ? (
        <LucideSun className="h-5 w-5" />
      ) : (
        <LucideMoon className="h-5 w-5" />
      )}
    </Button>
  );
}
