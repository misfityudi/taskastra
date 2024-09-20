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
      id: `${Date.now() + Math.floor(Math.random() * 10000).toString()}`,
      content,
      state,
      userId,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
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
        <form onSubmit={handleSubmit}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Task content"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value as TaskState)}
          >
            <option value={TaskState.TODO}>TODO</option>
            <option value={TaskState.INPROGRESS}>IN PROGRESS</option>
            <option value={TaskState.DONE}>DONE</option>
          </select>
          {error && <span className="text-red-500">{error}</span>}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default AddTaskModal;
