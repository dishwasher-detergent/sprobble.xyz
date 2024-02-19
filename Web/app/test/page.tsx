import { ssr } from "@/lib/ssr";
import { cookies } from "next/headers";

export default async function ServerComponent() {
  const user = await ssr.getUser(cookies());

  // You can also pass it to a client component and call `useAccount(user)` there.

  if (user) {
    return <span>Logged in as {user.name}</span>;
  }

  return <span>You are not logged in</span>;
}
