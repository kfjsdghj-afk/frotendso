import { useEffect, useState } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const imageSrc =
          product.image?.startsWith("http")
            ? product.image
            : product.image
            ? `${import.meta.env.VITE_API_URL}${product.image}`
            : "https://via.placeholder.com/300";

        return (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 mb-2">₹{product.price}</p>

              <ProductCard product={product} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
