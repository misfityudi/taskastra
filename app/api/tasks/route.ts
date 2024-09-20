// app/api/tasks/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Your MongoDB connection utility
import { Task } from "@/lib/types/task"; // Your Task type
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra"); // Use your actual database name
  const tasksCollection = db.collection<Task>("tasks");

  const userId = req.url.split("?")[1]?.split("=")[1]; // Extract userId from query params

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
    _id: new ObjectId() as unknown as string, // Ensure this is set correctly
    userId: body.userId, // Use userId passed from the client
  };

  await tasksCollection.insertOne(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  const { _id, ...updatedFields } = await req.json();

  const result = await tasksCollection.updateOne(
    { _id },
    { $set: updatedFields }
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json(
      { message: "Task not found or no changes made" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task updated successfully" });
}

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("taskastra");
  const tasksCollection = db.collection<Task>("tasks");

  const { _id } = await req.json();

  const result = await tasksCollection.deleteOne({ _id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
