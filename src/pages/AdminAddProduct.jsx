import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_URL}/api/products`, {
        ...product,
        price: Number(product.price),
      });

      alert("Product added successfully ✅");

      // Redirect to admin product list
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <Link
          to="/admin/products"
          className="text-blue-600 hover:underline"
        >
          View Products
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white border rounded-lg p-6 shadow-sm"
      >
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          name="image"
          placeholder="Image URL or /uploads/image.jpg"
          value={product.image}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={product.description}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
