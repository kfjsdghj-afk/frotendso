import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // 🔹 Total price calculation (safe)
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded p-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded border"
              />

              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>

                {/* 🔹 Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    disabled={item.qty === 1}
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className={`px-2 rounded ${
                      item.qty === 1
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    −
                  </button>

                  <span className="font-medium">{item.qty}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="bg-gray-300 hover:bg-gray-400 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 🔹 Remove button */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: ₹{total.toLocaleString("en-IN")}
        </h2>

        <Link
          to="/checkout"
          className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
