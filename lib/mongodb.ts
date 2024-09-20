import { MongoClient } from "mongodb";

// Define a custom global interface
interface CustomNodeJsGlobal extends Node {
  _mongoClientPromise?: Promise<MongoClient>;
}

// Declare global as custom interface
declare const global: CustomNodeJsGlobal;

// Create a new MongoClient instance
const client = new MongoClient(process.env.MONGODB_URI as string);

// Define a promise for the client connection
let clientPromise: Promise<MongoClient>;

// Check the environment and set up the client promise accordingly
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, connect directly
  clientPromise = client.connect();
}

// Export the client promise for use in other parts of the application
export default clientPromise;
