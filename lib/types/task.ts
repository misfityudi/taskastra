export enum TaskState {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

export interface Task {
  _id: string;
  content: string;
  state: TaskState;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
