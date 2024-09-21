import { create } from "zustand";
import { Task, TaskState } from "@/lib/types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (
    _id: string,
    updatedFields: Partial<Omit<Task, "_id" | "createdAt">>
  ) => Promise<void>;
  deleteTask: (_id: string) => Promise<void>;
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
  updateTask: async (id, updatedFields) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedFields }),
    });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, ...updatedFields } : task
      ),
    }));
  },
  deleteTask: async (_id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: _id }),
    });
    set((state) => ({ tasks: state.tasks.filter((task) => task._id !== _id) }));
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
