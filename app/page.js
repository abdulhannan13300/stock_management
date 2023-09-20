"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";

export default function Home() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchStock();
  }, [selectedProduct]);

  const fetchStock = async () => {
    try {
      const response = await fetch("/api/product");
      if (response.ok) {
        const data = await response.json();
        setStock(data);
      } else {
        console.error("Failed to fetch stock");
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return; // Ensure a product is selected

    try {
      const response = await fetch(`/api/product/${selectedProduct._id}`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product, // Updated name
          quantity, // Updated quantity
          price, // Updated price
        }),
      });

      if (response.ok) {
        console.log("PRODUCT UPDATED");
        setSelectedProduct(null); // Clear the selected product
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await fetch(`/api/product?id=${productId}`, {
        method: "DELETE", // Use DELETE for deleting
      });

      if (response.ok) {
        console.log("PRODUCT DELETED");
        fetchStock();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // const fetchStock = async () => {
  //   try {
  //     const response = await fetch("/api/product");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setStock(data);
  //     } else {
  //       console.error("Failed to fetch stock");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching stock:", error);
  //   }
  // };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, quantity, price }),
      });

      if (response.ok) {
        console.log("PRODUCT ADDED");
        setProduct("");
        setQuantity(0);
        setPrice(0);
        fetchStock(); // Fetch the updated stock after adding the product
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Use useEffect to fetch stock data when the component mounts
  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add a product</h1>
        <div className="flex">
          <input
            type="text"
            value={product}
            placeholder="Name"
            onChange={(e) => setProduct(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-full"
          />
          <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-full"
          />
          <input
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-full"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Add Product
          </button>
        </div>

        <h1 className="text-2xl font-bold mt-8 mb-4">Display Current stock</h1>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stock.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-sm"
                      onClick={() => setSelectedProduct(item)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
