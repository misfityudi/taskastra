import React, { useState } from "react";
import { useTaskStore } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";
import AddTaskModal from "./addTaskModal";
import { TaskState } from "@/lib/types/task";

interface TaskBoardProps {
  userId: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ userId }) => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 text-white">
      <TaskColumn state={TaskState.TODO} />
      <TaskColumn state={TaskState.INPROGRESS} />
      <TaskColumn state={TaskState.DONE} />
    </div>
  );
};

export default TaskBoard;
