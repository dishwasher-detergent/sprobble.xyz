"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userId = useId();
  const passId = useId();

  const Login = async () => {
    if (!username) return;
    if (!password) return;

    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          email: username,
          password: password,
        }),
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-nowrap gap-2">
      <div className="flex flex-col items-center space-y-2">
        <Label htmlFor={userId}>Username</Label>
        <Input
          id={userId}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Label htmlFor={passId}>Password</Label>
        <Input
          id={passId}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
      </div>

      <button
        onClick={() => Login()}
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-xl"
      >
        Login
      </button>
    </div>
  );
}
