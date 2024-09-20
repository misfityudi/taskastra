// lib/mongodb.ts
import { MongoClient } from "mongodb";

// Declare the global variable with proper type
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(process.env.MONGODB_URI!, {
  // No need for deprecated options
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to avoid creating a new MongoClient for every hot reload
  if (globalThis._mongoClientPromise) {
    clientPromise = globalThis._mongoClientPromise;
  } else {
    clientPromise = client.connect().then((client) => {
      globalThis._mongoClientPromise = client.connect(); // Assign the promise to globalThis
      return client;
    });
  }
} else {
  // In production mode, use the client promise directly
  clientPromise = client.connect();
}

export default clientPromise;
