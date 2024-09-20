// components/TaskModal.tsx
import React from "react";
import { Task, TaskState } from "@/lib/types/task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task?: Task | null; // Make task optional for editing
  userId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  userId,
}) => {
  const [content, setContent] = React.useState(task ? task.content : "");
  const [state, setState] = React.useState(task ? task.state : TaskState.TODO);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const newTask: Task = {
      id: `${Date.now() + Math.floor(Math.random() * 10000).toString()}`,
      content,
      state,
      userId: userId, // Replace with actual user ID logic
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    onSubmit(newTask);
    setContent(""); // Reset content
    setState(TaskState.TODO); // Reset state
    setError(null); // Clear error
    onClose(); // Close modal
  };

  return (
    isOpen && (
      <div className="modal">
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

export default TaskModal;
