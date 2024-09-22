import React, { useState } from "react";
import { Task } from "@/lib/types/task";
import EditTaskModal from "./editTaskModal";
import DeleteTaskModal from "./deleteTaskModal";
import { useTaskStore } from "@/lib/stores/task";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task._id.toString());
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditTask = async (updatedTask: Task) => {
    await updateTask(updatedTask);
    handleCloseEditModal();
  };

  const handleDeleteTask = async (task: Task) => {
    await deleteTask(task);
    handleCloseDeleteModal();
  };

  return (
    <div
      className="p-4 border border-slate-400 rounded m-4 bg-slate-300 text-white flex flex-col"
      draggable
      onDragStart={handleOnDragStart}
    >
      <p className="text-xl font-semibold text-slate-600">
        {task.content.charAt(0).toUpperCase() +
          task.content.slice(1).toLowerCase()}
      </p>
      <p className="text-xs text-slate-500 mt-4">
        created on: {new Date(Number(task.createdAt)).toLocaleString()}
      </p>
      <p className="text-xs text-slate-500">
        updated on: {new Date(Number(task.updatedAt)).toLocaleString()}
      </p>

      <div className="mt-2 flex gap-4">
        <button
          onClick={handleOpenEditModal}
          className="mt-2 bg-yellow-600 text-slate-300 border-2 border-slate-300 rounded-md px-4 py-1"
        >
          Edit
        </button>
        <button
          onClick={handleOpenDeleteModal}
          className="mt-2 bg-red-600 text-slate-300 border-2 border-slate-300 rounded-md px-2 py-1"
        >
          Delete
        </button>
      </div>
      <EditTaskModal
        task={task}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditTask}
      />
      <DeleteTaskModal
        task={task}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={handleDeleteTask}
      />
    </div>
  );
};

export default TaskItem;
