"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    // Perform NextAuth signOut
    await signOut({ redirect: false });

    // Clear the routing history and redirect to login page
    router.push("/login");
  };

  if (session) {
    return (
      <div className="gap-2 flex flex-row h-16 items-center">
        <span className="font-semibold mr-4 text-slate-700">
          {session.user?.name}
        </span>
        <div
          onClick={handleLogout}
          className="rounded-md px-4 py-2 font-medium bg-red-600 border-2 border-slate-300 text-slate-300 items-center text-center cursor-pointer"
        >
          Sign out
        </div>
      </div>
    );
  }
  return (
    <div
      onClick={() => signIn("google")}
      className="rounded-md px-4 py-2 font-medium bg-blue-700 text-slate-200 items-center text-center cursor-pointer"
    >
      Sign in with Google
    </div>
  );
}
