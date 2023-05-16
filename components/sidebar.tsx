"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex-none flex flex-col w-64 h-screen px-4 py-8 bg-white border-r shadow-sm overflow-y-auto">
      <div className="w-full flex items-center justify-center pb-8">
        <Logo />
      </div>
      <nav className="flex-1">
        <ul className="pb-4">
          <li className="w-full py-2 px-4">
            <p className="font-bold uppercase text-slate-400 text-sm">User</p>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Track
            </Button>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Artist
            </Button>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Album
            </Button>
          </li>
        </ul>
        <ul>
          <li className="w-full py-2 px-4">
            <p className="font-bold uppercase text-slate-400 text-sm">Global</p>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Track
            </Button>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Artist
            </Button>
          </li>
          <li className="w-full">
            <Button variant="ghost" className="w-full justify-start text-base">
              Album
            </Button>
          </li>
        </ul>
      </nav>
      <ul>
        <li className="w-full py-2 px-4">
          <p className="font-bold uppercase text-slate-400 text-sm">Settings</p>
        </li>
        <li>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            asChild
          >
            <Link href="/account">
              <LucideUser className="mr-2 h-4 w-4" />
              Account
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="w-full justify-start text-base">
            <LucideLogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </li>
      </ul>
    </aside>
  );
}
