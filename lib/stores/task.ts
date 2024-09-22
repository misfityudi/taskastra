import { create } from "zustand";
import { Task, TaskState } from "@/lib/types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  fetchTasks: (userId: string) => Promise<void>;
  todoTasks: Task[];
  ongoingTasks: Task[];
  completedTasks: Task[];
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: async (task) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const newTask = await response.json();

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: async (updatedTask) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedTask }),
    });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === updatedTask._id ? { ...updatedTask } : task
      ),
    }));
  },
  deleteTask: async (deletedTask) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deletedTask }),
    });
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== deletedTask._id),
    }));
  },
  fetchTasks: async (userId) => {
    const response = await fetch(`/api/tasks?userId=${userId}`);
    const tasks = await response.json();
    set({ tasks });
  },
  todoTasks: [],
  ongoingTasks: [],
  completedTasks: [],
}));

const useComputedTasks = () => {
  const { tasks } = useTaskStore();
  const todoTasks = tasks.filter((task) => task.state === TaskState.TODO);
  const ongoingTasks = tasks.filter(
    (task) => task.state === TaskState.INPROGRESS
  );
  const completedTasks = tasks.filter((task) => task.state === TaskState.DONE);

  return { todoTasks, ongoingTasks, completedTasks };
};

export { useTaskStore, useComputedTasks };
