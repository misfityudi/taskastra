import React from "react";
import { Task } from "@/lib/types/task";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task: Task;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("task", task);

    onSubmit(task);
    setError(null);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-slate-700 py-12 px-24 rounded-3xl"
        >
          <div className="text-slate-400 font-medium">
            Are you sure you want to delete this task?
          </div>
          <div className="flex flex-col w-full mt-4">
            {error && <span className="text-red-500 text-center">{error}</span>}
            <div className="flex w-full mt-4 gap-4 justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-red-700 font-medium text-slate-400 rounded-md"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-yellow-700 font-medium text-slate-400 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default DeleteTaskModal;
