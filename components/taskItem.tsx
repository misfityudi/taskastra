import React, { useState } from "react";
import { Task } from "@/lib/types/task";
import EditTaskModal from "./editTaskModal";
import { useTaskStore } from "@/lib/stores/task";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    const { id, ...updatedFields } = updatedTask;
    // Call updateTask with the task id and the updated fields
    updateTask(id, updatedFields);
    handleCloseEditModal();
  };

  return (
    <div className="task-item p-4 border rounded mb-2 bg-slate-700 text-white">
      <p>{task.content}</p>
      <p>Status: {task.state}</p>

      <button
        onClick={handleOpenEditModal}
        className="mt-2 bg-yellow-500 text-black rounded-md px-2 py-1"
      >
        Edit Task
      </button>

      {/* Task Modal for Editing Task */}
      <EditTaskModal
        task={task}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditTask}
      />
    </div>
  );
};

export default TaskItem;
