import React from "react";
import { Task, TaskState } from "@/lib/types/task";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedTask: Task) => void;
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const [content, setContent] = React.useState(task.content);
  const [state, setState] = React.useState<TaskState>(task.state);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const updatedTask: Task = {
      ...task,
      content,
      state,
      updatedAt: Date.now().toString(),
    };

    onSubmit(updatedTask);
    setError(null);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-slate-700 py-24 px-48 rounded-3xl"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Task content"
            className="m-2 p-2 bg-slate-800 rounded-md !outline-none"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value as TaskState)}
            className="p-2 m-2 bg-slate-800 text-slate-300 rounded-md !outline-none"
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
                className="px-4 py-2 bg-green-500 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-red-500 rounded-md"
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

export default EditTaskModal;
