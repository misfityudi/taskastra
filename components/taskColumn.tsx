import React from "react";
import { TaskState, Task } from "@/lib/types/task";
import { useTaskStore } from "@/lib/stores/task";
import TaskItem from "./taskItem";

interface TaskColumnProps {
  state: TaskState;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ state }) => {
  const tasks = useTaskStore((store) => {
    if (state === TaskState.TODO) {
      return store.todoTasks;
    } else if (state === TaskState.INPROGRESS) {
      return store.ongoingTasks;
    } else {
      return store.completedTasks;
    }
  });

  return (
    <div className="task-column bg-slate-800 h-full border-2 border-slate-900">
      <p className={`text-xl p-4 bg-slate-900 text-blue-500`}>
        {TaskState[state]}
      </p>
      <div>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
