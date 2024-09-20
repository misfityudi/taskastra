import React from "react";
import { Task } from "@/lib/types/task";
import TaskItem from "./taskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onDrop }) => {
  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-slate-200 border-2 border-slate-400 h-screen-h-20 flex flex-col"
      onDragOver={handleOnDragOver}
      onDrop={onDrop}
    >
      <p className={`text-xl p-4 bg-slate-300 font-semibold text-blue-700`}>
        {title}
      </p>
      <div className="flex-grow flex flex-col overflow-y-auto">
        {tasks.map((task: Task) => (
          <TaskItem key={task._id.toString()} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
