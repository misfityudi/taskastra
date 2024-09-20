import React from "react";
import { useTaskStore } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";
import { TaskState } from "@/lib/types/task";

interface TaskBoardProps {
  userId: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ userId }) => {
  const { tasks, updateTask } = useTaskStore();

  const handleOnDrop = (e: React.DragEvent, targetState: TaskState) => {
    const taskId = e.dataTransfer.getData("taskId");

    updateTask(taskId, {
      state: targetState,
      updatedAt: Date.now().toString(),
    });
  };

  const todoTasks = tasks.filter((task) => task.state === "TODO");
  const ongoingTasks = tasks.filter((task) => task.state === "INPROGRESS");
  const completedTasks = tasks.filter((task) => task.state === "DONE");

  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 text-white">
      <TaskColumn
        title={"To do"}
        tasks={todoTasks}
        onDrop={(e) => handleOnDrop(e, TaskState.TODO)}
      />
      <TaskColumn
        title={"In Progress"}
        tasks={ongoingTasks}
        onDrop={(e) => handleOnDrop(e, TaskState.INPROGRESS)}
      />
      <TaskColumn
        title={"Done"}
        tasks={completedTasks}
        onDrop={(e) => handleOnDrop(e, TaskState.DONE)}
      />
    </div>
  );
};

export default TaskBoard;
