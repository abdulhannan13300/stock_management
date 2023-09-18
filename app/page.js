"use client";
import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";

export default function Home() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState([]);

  const handleAddProduct = async () => {
    await axios.post("/api/addProduct", { product, quantity, price });
    setProduct("");
    setQuantity(0);
    setPrice(0);
  };

  const fetchStock = async () => {
    const response = await axios.get("/api/getStock");
    setStock(response.data);
  };

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
        <button
          onClick={fetchStock}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Stock
        </button>
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
              {stock.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.price}
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
