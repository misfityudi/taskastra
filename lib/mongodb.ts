/* eslint-disable no-var */
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(process.env.MONGODB_URI!, {});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect().then((client) => {
      global._mongoClientPromise = client.connect();
      return client;
    });
  }
} else {
  clientPromise = client.connect();
}

export default clientPromise;

/* eslint-enable no-var */
