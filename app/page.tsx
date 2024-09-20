"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTaskStore } from "@/lib/stores/task";
import { TaskState } from "@/lib/types/task";
import AuthButton from "@/components/authButton";
import TaskBoard from "@/components/taskBoard";
import AddTaskModal from "@/components/addTaskModal";

export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (newTask: {
    id: string;
    content: string;
    state: TaskState;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }) => {
    addTask(newTask);
    handleCloseModal();
  };

  return (
    <main className="bg-slate-600 h-screen flex flex-col">
      <header className="row-start-1 flex flex-row justify-between align-middle items-center bg-slate-700 h-16 px-4">
        <span className="font-semibold text-xl">TaskAstra</span>
        <AuthButton />
      </header>
      <div className="p-4 h-screen-h-16 overflow-clip">
        {session?.user && (
          <>
            <TaskBoard userId={session?.user.id} />{" "}
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
        className="mb-4 bg-blue-500 text-white rounded-md px-2 py-2 cursor-pointer text-center w-40 absolute bottom-0 right-8"
      >
        New Task
      </div>
    </main>
  );
}
