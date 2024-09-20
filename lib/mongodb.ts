import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(process.env.MONGODB_URI!, {
  // No need for deprecated options
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (globalThis._mongoClientPromise) {
    clientPromise = globalThis._mongoClientPromise;
  } else {
    clientPromise = client.connect().then((client) => {
      globalThis._mongoClientPromise = client.connect();
      return client;
    });
  }
} else {
  clientPromise = client.connect();
}

export default clientPromise;
