import React from "react";
import { Task, TaskState } from "@/lib/types/task";
import TaskItem from "./taskItem";
import { useTaskStore } from "@/lib/stores/task";

interface TaskColumnProps {
  state: TaskState;
  onEdit: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ state, onEdit }) => {
  const tasks = useTaskStore((store) => {
    switch (state) {
      case TaskState.TODO:
        return store.todoTasks;
      case TaskState.INPROGRESS:
        return store.ongoingTasks;
      case TaskState.DONE:
        return store.completedTasks;
      default:
        return [];
    }
  });

  return (
    <div className="bg-slate-700 m-5 flex flex-col border-2 border-slate-900">
      <p className="text-start px-4 py-2 bg-slate-800 font-semibold text-red-500">
        {state === TaskState.TODO
          ? "TODO"
          : state === TaskState.INPROGRESS
          ? "IN PROGRESS"
          : "DONE"}
      </p>
      <div className="flex-grow flex flex-col gap-5 justify-start items-center p-5">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
