"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="gap-2 flex flex-row h-16 items-center">
        <span className="font-semibold mr-4 text-slate-400">
          {session.user?.name}
        </span>
        <div
          onClick={() => signOut()}
          className="rounded px-4 py-2 bg-red-700 border-2 border-slate-900 text-slate-400 items-center text-center cursor-pointer"
        >
          Sign out
        </div>
      </div>
    );
  }
  return (
    <div
      onClick={() => signIn("google")}
      className="rounded px-4 py-2 bg-blue-700 text-slate-200 items-center text-center cursor-pointer"
    >
      Sign in with Google
    </div>
  );
}
