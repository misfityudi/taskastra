import React from "react";
import { useTaskStore } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";
import { Task, TaskState } from "@/lib/types/task";

const TaskBoard: React.FC = () => {
  const { tasks, updateTask } = useTaskStore();

  const handleOnDrop = (e: React.DragEvent, targetState: TaskState) => {
    const taskId = e.dataTransfer.getData("taskId");

    const currentTask = tasks.find((task) => task._id === taskId);
    if (currentTask) {
      const updatedTask: Task = {
        ...currentTask,
        state: targetState,
      };

      updateTask(updatedTask);
    }
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
