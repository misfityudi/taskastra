import React from "react";
import { TaskState, Task } from "@/lib/types/task";
import { useTaskStore, useComputedTasks } from "@/lib/stores/task";
import TaskItem from "./taskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onDrop }) => {
  // const { todoTasks, ongoingTasks, completedTasks } = useComputedTasks();

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-slate-800 border-2 border-slate-900"
      onDragOver={handleOnDragOver}
      onDrop={onDrop}
    >
      <p className={`text-xl p-4 bg-slate-900 text-blue-500`}>{title}</p>
      <div className="overflow-scroll">
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
