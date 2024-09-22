import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Task } from "@/lib/types/task";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  const userId = req.url.split("?")[1]?.split("=")[1];
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const tasks = await tasksCollection.find({ userId }).toArray();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  const body = await req.json();
  const newTask: Task = {
    content: body.content,
    state: body.state,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    _id: new ObjectId() as unknown as string,
    userId: body.userId,
  };

  await tasksCollection.insertOne(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  const { _id, ...updatedFields } = await req.json();

  if (!_id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await tasksCollection.updateOne(
      { _id },
      { $set: { ...updatedFields, updatedAt: Date.now().toString() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  console.log("req", req.json());

  // const { searchParams } = new URL(req.url);
  const { _id } = await req.json();

  if (!_id) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await tasksCollection.deleteOne({
      _id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Error deleting task" },
      { status: 500 }
    );
  }
}
