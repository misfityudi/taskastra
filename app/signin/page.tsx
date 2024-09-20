"use client";
import AuthButton from "@/components/authButton";

export default function SignIn() {
  return (
    <main className="min-h-screen bg-slate-600 grid grid-rows-[64px_1fr] w-full">
      <header className="row-start-1 flex flex-row justify-between align-middle items-center bg-slate-700 h-16 px-4">
        <span className="font-semibold text-xl">Taskastra</span>
      </header>
      <main className="m-auto w-96 h-72 rounded-lg bg-slate-700 p-8 items-center flex flex-col justify-around">
        <div className="flex flex-col text-center gap-2">
          <span className="font-semibold text-4xl">Taskastra</span>
          <span className="font-medium text-sm">Unlocking tasks!</span>
        </div>
        <AuthButton />
      </main>
    </main>
  );
}
