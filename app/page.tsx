"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTaskStore } from "@/lib/stores/task";
import { TaskState } from "@/lib/types/task";
import AuthButton from "@/components/authButton";
import TaskBoard from "@/components/taskBoard";
import AddTaskModal from "@/components/addTaskModal";

export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (newTask: {
    _id: string;
    content: string;
    state: TaskState;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }) => {
    addTask(newTask);
    handleCloseModal();
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks(session.user.id);
    }
  }, [session, fetchTasks]);

  return (
    <main className="bg-slate-200 h-screen flex flex-col">
      <header className="row-start-1 flex flex-row justify-between align-middle items-center h-16 px-4">
        <Link href={"/"} className="font-semibold text-3xl text-blue-700">
          Taskastra
        </Link>
        <AuthButton />
      </header>
      <div className="py-1 px-3 h-screen-h-16 overflow-clip">
        {session?.user && (
          <>
            <TaskBoard />
            <AddTaskModal
              userId={session.user.id}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleAddTask}
            />
          </>
        )}
      </div>
      <div
        onClick={handleOpenModal}
        className="mb-4 bg-blue-700 text-slate-200 rounded-md px-2 py-2 cursor-pointer text-center w-40 absolute bottom-8 right-12"
      >
        Add New
      </div>
    </main>
  );
}
