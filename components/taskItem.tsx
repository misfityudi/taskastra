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

  const handleOnDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

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
    <div
      className="task-item p-4 border border-slate-900 rounded m-4 bg-slate-700 text-white flex flex-col"
      draggable
      onDragStart={handleOnDragStart}
    >
      <p className="text-2xl font-semibold text-slate-400">
        {task.content.charAt(0).toUpperCase() +
          task.content.slice(1).toLowerCase()}
      </p>
      <p className="text-sm text-slate-500 mt-4">
        created on: {new Date(Number(task.createdAt)).toLocaleString()}
      </p>
      <p className="text-sm text-slate-500">
        updated on: {new Date(Number(task.updatedAt)).toLocaleString()}
      </p>

      <div className="mt-2 flex gap-4">
        <button
          onClick={handleOpenEditModal}
          className="mt-2 bg-yellow-700 text-slate-400 border-2 border-slate-900 rounded-md px-4 py-1"
        >
          Edit
        </button>
        <button
          onClick={handleOpenEditModal}
          className="mt-2 bg-red-700 text-slate-400 border-2 border-slate-900 rounded-md px-2 py-1"
        >
          Delete
        </button>
      </div>

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
