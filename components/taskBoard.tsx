import React, { useState } from "react";
import { useTaskStore } from "@/lib/stores/task";
import TaskColumn from "./taskColumn";
import TaskModal from "./taskModal";
import { TaskState } from "@/lib/types/task";

interface TaskBoardProps {
  userId: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

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
    <div className="flex flex-col text-white">
      <button
        onClick={handleOpenModal}
        className="mb-4 bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Add Task
      </button>
      <div className="flex-grow w-full grid grid-cols-3 mx-auto text-white">
        <TaskColumn state={TaskState.TODO} onEdit={() => updateTask} />
        <TaskColumn state={TaskState.INPROGRESS} onEdit={() => updateTask} />
        <TaskColumn state={TaskState.DONE} onEdit={() => updateTask} />
      </div>
      <TaskModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default TaskBoard;
