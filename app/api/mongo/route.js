import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("stock_management");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error("Failed to close MongoDB connection", error);
    throw error;
  }
}
