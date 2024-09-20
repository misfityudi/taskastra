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

export default EditTaskModal;
