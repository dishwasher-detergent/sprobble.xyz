"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LucideLogIn, LucideLogOut } from "lucide-react";

// export function SpotifyAuth({ className }: { className?: string }) {
//   // const { data: session } = useSession();

//   return (
//     <li
//       className={
//         "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max"
//       }
//     >
//       {session ? <Logout /> : <Login />}
//     </li>
//   );
// }

export function Login() {
  function handleLogin() {
    signIn("spotify", {
      callbackUrl: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL,
    });
  }

  return (
    <button
      onClick={() => handleLogin()}
      className="flex flex-row gap-2 items-center"
    >
      <LucideLogIn size={16} />
      Login
    </button>
  );
}

export function Logout() {
  function handleLogout() {
    signOut();
  }

  return (
    <button
      onClick={() => handleLogout()}
      className="flex flex-row gap-2 items-center"
    >
      <LucideLogOut size={16} />
      Logout
    </button>
  );
}
