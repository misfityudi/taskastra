import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

enum TaskState {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  state: TaskState;
  userId: string;
}

let tasks: Task[] = [];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { content } = await request.json();
  const newTask: Task = {
    id: Date.now().toString(),
    content,
    state: TaskState.TODO,
    userId: session.user.id,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { id, content, state } = await request.json();
  const taskIndex = tasks.findIndex(
    (t) => t.id === id && t.userId === session.user.id
  );
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], content, state };
  return NextResponse.json(tasks[taskIndex]);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { id } = await request.json();
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => !(t.id === id && t.userId === session.user.id));
  if (tasks.length === initialLength) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task deleted successfully" });
}
