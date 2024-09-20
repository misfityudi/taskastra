export enum TaskState {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

export interface Task {
  id: string;
  content: string;
  state: TaskState;
  userId: string;
  createdAt: string; // epoch time as string
  updatedAt: string; // epoch time as string
}
