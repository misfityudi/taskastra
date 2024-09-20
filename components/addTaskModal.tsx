import React from "react";
import { Task, TaskState } from "@/lib/types/task";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  userId: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userId,
}) => {
  const [content, setContent] = React.useState("");
  const [state, setState] = React.useState<TaskState>(TaskState.TODO);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const newTask: Task = {
      content,
      state,
      userId,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      _id: `${Date.now() + Math.floor(Math.random() * 10000).toString()}`,
    };

    onSubmit(newTask);
    setContent("");
    setState(TaskState.TODO);
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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Task content"
            className="m-2 p-4 bg-slate-800 rounded-md !outline-none w-96 h-56 text-slate-400"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value as TaskState)}
            className="p-2 m-2 bg-slate-800 text-slate-400 rounded-md !outline-none"
          >
            <option value={TaskState.TODO}>TODO</option>
            <option value={TaskState.INPROGRESS}>IN PROGRESS</option>
            <option value={TaskState.DONE}>DONE</option>
          </select>
          <div className="flex flex-col w-full mt-4">
            {error && <span className="text-red-500 text-center">{error}</span>}
            <div className="flex w-full mt-4 gap-4 justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-slate-400 rounded-md"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-red-700 text-slate-400 rounded-md"
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

export default AddTaskModal;
