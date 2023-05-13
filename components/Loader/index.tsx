import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-full grid place-items-center">
      <Loader2 size={36} className="text-blue-600 animate-spin" />
      <p className="sr-only">Loading</p>
    </div>
  );
}
