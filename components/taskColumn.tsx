import React from "react";
import { Task, TaskState } from "@/lib/stores/task";

interface TaskColumnProps {
  title: string;
  titleColor: string;
  tasks: Task[];
  targetState: TaskState;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  titleColor,
  tasks,
  targetState,
  onDrop,
  onDragOver,
  onDragStart,
}) => {
  return (
    <div className="bg-slate-700 m-5 flex flex-col border-2 border-slate-900">
      <p
        className={`text-start px-4 py-2 bg-slate-800 font-semibold text-${titleColor}-500`}
      >
        {title}
      </p>
      <div
        className="flex-grow flex flex-col gap-5 justify-start items-center p-5"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            className="w-full bg-slate-800 border-2 border-slate-900 flex flex-col p-5"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
          >
            <div className="flex flex-col gap-4">
              <div className="text-slate-400 text-xl font-semibold">
                {task.content}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500 text-xs">
                  created on: {task.createdAt}
                </div>
                <div className="text-slate-500 text-xs">
                  updated on: {task.updatedAt}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
