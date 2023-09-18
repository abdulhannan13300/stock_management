import { connectToDatabase, closeDatabaseConnection } from "./mongo/db";
import Product from "../models/Product";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, quantity, price } = req.body;

      const db = await connectToDatabase();
      const collection = db.collection("inventory");

      // Create a new product document using the Product model
      const product = new Product({ name, quantity, price });

      // Save the product document to the database
      await collection.insertOne(product);

      res.status(200).json({ success: true });
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