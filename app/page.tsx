"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/authButton";
import TaskBoard from "@/components/taskBoard";
import TaskModal from "@/components/taskModal";

export default function Home() {
  const { data: session } = useSession();

  function addTask() {
    console.log("adding task");
  }

  return (
    <main className="min-h-screen bg-slate-600 grid grid-rows-[64px_1fr] w-full">
      <header className="row-start-1 flex flex-row justify-between align-middle items-center bg-slate-700 h-16 px-4">
        <span className="font-semibold text-xl">TaskAstra</span>
        <AuthButton />
      </header>
      <div className="flex flex-col">
        <div className="row-start-1 flex flex-row justify-between align-middle items-center h-16 px-4">
          <TaskModal userId={session?.user.id as string} />
        </div>
        <TaskBoard />
      </div>
    </main>
  );
}
