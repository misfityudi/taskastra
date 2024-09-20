import React, { useState } from "react";
import { z } from "zod";
import { TaskState, Task } from "@/lib/types/task";

const taskSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
  state: z.enum([TaskState.TODO, TaskState.INPROGRESS, TaskState.DONE]),
  userId: z.string().nonempty("User ID cannot be empty"),
});

interface TaskFormProps {
  userId: string;
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [state, setState] = useState<TaskState>(TaskState.TODO);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = taskSchema.safeParse({ content, state, userId });

    if (!validationResult.success) {
      setError(
        validationResult.error.errors.map((err) => err.message).join(", ")
      );
      return;
    }

    const newTask: Task = {
      _id: `${Date.now() + Math.floor(Math.random() * 10000)}`, // Generate a unique ID
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
    <form onSubmit={handleSubmit} className="p-4 z-10">
      <p className="text-xl font-semibold text-slate-200">New Task:</p>
      <div className="mt-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-300"
        >
          Task Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`mt-1 block w-full border-2 text-slate-200 bg-slate-800 border-slate-900 !outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md p-2`}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="state"
          className="block text-sm font-medium text-slate-300"
        >
          Task State
        </label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value as TaskState)}
          className="mt-1 text-slate-300 bg-slate-800 border-slate-900 block w-full border-2 rounded-md p-2 !outline-none"
        >
          <option value={TaskState.TODO}>TODO</option>
          <option value={TaskState.INPROGRESS}>IN PROGRESS</option>
          <option value={TaskState.DONE}>DONE</option>
        </select>
      </div>

      <div className="flex flex-col mt-2">
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
