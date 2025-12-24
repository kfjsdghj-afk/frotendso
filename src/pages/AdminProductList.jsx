import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Admin Products</h1>

        <Link
          to="/admin/add-product"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ➕ Add New Product
        </Link>
      </div>

      {/* 🔹 Responsive Product List */}
      <div className="flex flex-col gap-4">
        {products.map((p) => {
          const imageSrc =
            p.image?.startsWith("http")
              ? p.image
              : p.image
              ? `${BASE_URL}${p.image}`
              : "https://via.placeholder.com/100";

          return (
            <div
              key={p._id}
              className="flex flex-col sm:flex-row justify-between items-center border rounded p-4 bg-white shadow-sm"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <img
                  src={imageSrc}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />

                <div>
                  <h2 className="font-semibold">{p.name}</h2>
                  <p className="text-gray-600">₹{p.price}</p>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
