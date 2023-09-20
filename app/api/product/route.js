import { NextResponse } from "next/server";
import { connectToDatabase, closeDatabaseConnection } from "../mongo/route";
// import Product from "../models/Product";

export async function POST(req) {
  try {
    const body = await req.json();

    const db = await connectToDatabase("stock_management");
    const inventory = db.collection("inventory");
    const product = await inventory.insertOne(body);

    return NextResponse.json({ product, Ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await closeDatabaseConnection();
  }
}

export async function GET(res) {
  try {
    const db = await connectToDatabase("stock_management");
    const collection = db.collection("inventory");

    // Add your logic to fetch the stock data from the database or any other source
    const stock = await collection.find().toArray();
    // console.log(stock);
    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await closeDatabaseConnection();
  }
}
