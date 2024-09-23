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

  try {
    const json = await req.json();
    const { _id, ...updatedFields } = json.updatedTask;

    if (!_id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(_id) as unknown as string;

    const result = await tasksCollection.updateOne(
      { _id: objectId },
      { $set: { ...updatedFields, updatedAt: Date.now().toString() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No changes made to the task" },
        { status: 200 }
      );
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

  try {
    const json = await req.json();
    const _id = json.deletedTask._id;

    if (!_id) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(_id) as unknown as string;

    const result = await tasksCollection.deleteOne({
      _id: objectId,
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
