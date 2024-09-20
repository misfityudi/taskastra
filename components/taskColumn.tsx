import React from "react";
import { TaskState, Task } from "@/lib/types/task";
import { useTaskStore, useComputedTasks } from "@/lib/stores/task";
import TaskItem from "./taskItem";

interface TaskColumnProps {
  state: TaskState;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ state }) => {
  const { todoTasks, ongoingTasks, completedTasks } = useComputedTasks();
  const tasks = () => {
    if (state === TaskState.TODO) {
      return todoTasks;
    } else if (state === TaskState.INPROGRESS) {
      return ongoingTasks;
    } else {
      return completedTasks;
    }
  };

  return (
    <div className="bg-slate-800 border-2 border-slate-900">
      <p className={`text-xl p-4 bg-slate-900 text-blue-500`}>
        {TaskState[state]}
      </p>
      <div className="overflow-scroll">
        {tasks().map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
