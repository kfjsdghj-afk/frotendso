import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// User Pages
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-screen">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/admin/products" element={<AdminProductList />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
