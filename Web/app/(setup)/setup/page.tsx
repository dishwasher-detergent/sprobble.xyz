"use client";

import useAccount from "@/hooks/use-account";
import { LucideAlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { createAccount } = useAccount(true);

  useEffect(() => {
    const init = async () => {
      await createAccount();
      router.push("/");
    };

    init();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-2 gap-2">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-secondary px-4 py-12">
        <div className="flex items-center gap-4">
          <LucideAlertTriangle className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hold on Cowboy!
          </h1>
          <LucideAlertTriangle className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
        </div>
        <p className="text-xl">
          We&apos;re getting everything setup for you, once we&apos;re done
          you&apos;ll automatically be redirected!
        </p>
      </div>
    </section>
  );
}
