import { create } from "zustand";
import { Task, TaskState } from "@/lib/types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (
    id: string,
    updatedFields: Partial<Omit<Task, "id" | "createdAt">>
  ) => void;
  deleteTask: (id: string) => void;
  todoTasks: Task[];
  ongoingTasks: Task[];
  completedTasks: Task[];
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => {
      const newTask = {
        ...task,
        id: `${Date.now() + Math.floor(Math.random() * 10000).toString()}`,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      };
      return { tasks: [...state.tasks, newTask] };
    }),
  updateTask: (id, updatedFields) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
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
