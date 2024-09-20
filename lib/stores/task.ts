import { create } from "zustand";
import { z } from "zod";

// Enum for task states
export enum TaskState {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

// Task interface
export interface Task {
  id: string; // Unique identifier for the task
  createdAt: string; // String representation of epoch time for when the task was created
  updatedAt: string; // String representation of epoch time for the last update time
  content: string; // The content or description of the task
  state: TaskState; // The current state of the task (e.g., TODO, INPROGRESS, DONE)
  userId: string; // The ID of the user who created the task
}

// Zod schema for task validation
const taskSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
  state: z.enum([TaskState.TODO, TaskState.INPROGRESS, TaskState.DONE]),
  userId: z.string().nonempty("User ID cannot be empty"),
});

const taskUpdateSchema = z.object({
  content: z.string().optional(),
  state: z
    .enum([TaskState.TODO, TaskState.INPROGRESS, TaskState.DONE])
    .optional(),
});

// Zustand store
interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (
    id: string,
    updatedFields: Partial<Omit<Task, "id" | "createdAt">>
  ) => void;
  removeTask: (id: string) => void;

  // Computed properties as functions returning Task arrays
  todoTasks: () => Task[];
  ongoingTasks: () => Task[];
  completedTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (task) => {
    // Validate the task using Zod
    const result = taskSchema.safeParse(task);
    if (!result.success) {
      // Handle validation errors
      console.error(result.error.format());
      return;
    }

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      createdAt: Date.now().toString(), // Current epoch time as string
      updatedAt: Date.now().toString(), // Current epoch time as string
      ...result.data,
    };

    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: (id, updatedFields) => {
    // Validate the updated fields using Zod
    const result = taskUpdateSchema.safeParse(updatedFields);
    if (!result.success) {
      // Handle validation errors
      console.error(result.error.format());
      return;
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...result.data, updatedAt: Date.now().toString() }
          : task
      ),
    }));
  },
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  // Computed properties as functions
  todoTasks: () => get().tasks.filter((task) => task.state === TaskState.TODO),
  ongoingTasks: () =>
    get().tasks.filter((task) => task.state === TaskState.INPROGRESS),
  completedTasks: () =>
    get().tasks.filter((task) => task.state === TaskState.DONE),
}));
