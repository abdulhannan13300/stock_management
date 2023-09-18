import { connectToDatabase, closeDatabaseConnection } from "./mongo/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("inventory");

      // Add your logic to fetch the stock data from the database or any other source
      const stock = await collection.find().toArray();
      res.status(200).json(stock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await closeDatabaseConnection();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}