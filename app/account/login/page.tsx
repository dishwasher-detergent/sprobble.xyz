"use client";

import { UserAuthForm } from "@/components/user-auth-form";
import { useRouter } from "next/navigation";
import { useAccount } from "react-appwrite";

export default function Page() {
  const { data: account } = useAccount();
  const router = useRouter();

  if (account) {
    router.push("/account/preferences");
  }

  return <UserAuthForm className="w-full h-full grid place-items-center" />;
}
