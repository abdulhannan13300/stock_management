import { NextResponse } from "next/server";
import { connectToDatabase } from "../../mongo/route";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  const { id } = req.query;
  // console.log(id);

  try {
    const db = await connectToDatabase("stock_management");
    const inventory = db.collection("inventory");

    const objectId = new ObjectId(id);
    // Find the product by ID and delete it
    const result = await inventory.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        message: "Product deleted successfully",
        Ok: true,
        result,
      });
    } else {
      return NextResponse.json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export async function PUT(req, res) {
  const productId = req.query.id;

  try {
    const db = await connectToDatabase("stock_management");
    const inventory = db.collection("inventory");

    const { name, quantity, price } = req.body;

    // Update the product by ID
    const result = await inventory.updateOne(
      { _id: ObjectId(productId) },
      {
        $set: {
          name,
          quantity,
          price,
        },
      }
    );

    if (result.modifiedCount === 1) {
      res
        .status(200)
        .json({ message: "Product updated successfully", Ok: true });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === "PUT") {
//     try {
//       const db = await connectToDatabase();
//       const collection = db.collection("inventory");
//       const { name, quantity, price } = req.body;

//       // Update the product with the given ID
//       const updatedProduct = await collection.findOneAndUpdate(
//         { _id: id },
//         { $set: { name, quantity, price } },
//         { returnOriginal: false }
//       );

//       if (!updatedProduct.value) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.status(200).json(updatedProduct.value);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       const db = await connectToDatabase("stock_management");
//       const collection = db.collection("inventory");

//       // Delete the product with the given ID
//       const deleteResult = await collection.deleteOne({ _id: id });

//       if (deleteResult.deletedCount === 0) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.status(204).end();
//       console.log(Deleted); // 204 No Content response for successful deletion
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
