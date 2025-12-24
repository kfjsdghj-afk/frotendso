import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
      <Link
        to="/admin/add-product"
        className="bg-blue-600 text-white p-4 rounded text-center"
      >
        Add Product
      </Link>

      <Link
        to="/admin/products"
        className="bg-gray-900 text-white p-4 rounded text-center"
      >
        Product List
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
