import React, { useState } from "react";
import TaskForm from "./taskForm"; // Adjust the import path as necessary

const TaskModal: React.FC<{ userId: string }> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded px-4 py-2 bg-blue-600 items-center text-center cursor-pointer"
      >
        Add New Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-700 p-6 rounded-md shadow-md border border-black w-96 flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto bg-red-500 px-3 py-1 rounded-full cursor-pointer text-center items-center"
            >
              x
            </button>
            <TaskForm userId={userId} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
