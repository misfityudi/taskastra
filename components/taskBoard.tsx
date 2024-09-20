import React, { useState } from "react";
import { useTaskStore } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";
import AddTaskModal from "./addTaskModal";
import { TaskState } from "@/lib/types/task";

interface TaskBoardProps {
  userId: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (newTask: {
    id: string;
    content: string;
    state: TaskState;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }) => {
    addTask(newTask);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col text-white h-full">
      <div
        onClick={handleOpenModal}
        className="mb-4 bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer text-center w-60"
      >
        Add Task
      </div>
      <AddTaskModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
      />

      <div className="flex-grow w-full grid grid-cols-3 gap-4 mx-auto text-white">
        <TaskColumn state={TaskState.TODO} />
        <TaskColumn state={TaskState.INPROGRESS} />
        <TaskColumn state={TaskState.DONE} />
      </div>
    </div>
  );
};

export default TaskBoard;
