import React, { useState } from "react";
import { Task, TaskState } from "@/lib/types/task";
import { useTaskStore } from "@/lib/stores/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);
  const [state, setState] = useState<TaskState>(task.state);

  const handleUpdate = () => {
    onEdit({ ...task, content, state });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="bg-slate-800 border-2 border-slate-900 flex flex-col p-5">
      {isEditing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border-2 text-slate-200 bg-slate-900 border-slate-900 rounded-md p-2"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value as TaskState)}
            className="mt-1 block w-full bg-slate-800 border-slate-900 border-2 rounded-md p-2"
          >
            <option value={TaskState.TODO}>TODO</option>
            <option value={TaskState.INPROGRESS}>IN PROGRESS</option>
            <option value={TaskState.DONE}>DONE</option>
          </select>
          <div className="flex justify-between mt-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-slate-400 text-xl font-semibold">
            {task.content}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-slate-500 text-xs">
              Created on: {new Date(parseInt(task.createdAt)).toLocaleString()}
            </div>
            <div className="text-slate-500 text-xs">
              Updated on: {new Date(parseInt(task.updatedAt)).toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
