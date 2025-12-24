import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          EasyCart
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/cart" className="hover:text-gray-300">
            Cart ({cartItems.length})
          </Link>
          <Link to="/checkout" className="hover:text-gray-300">
            Checkout
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 pb-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block py-2 border-b border-gray-700"
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block py-2 border-b border-gray-700"
          >
            Cart ({cartItems.length})
          </Link>

          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className="block py-2"
          >
            Checkout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
