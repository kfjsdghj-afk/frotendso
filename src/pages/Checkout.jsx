import axios from "axios";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Backend URL from env (Vercel compatible)
  const BASE_URL = import.meta.env.VITE_API_URL;

  // 🔹 Total price (safe number conversion)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/payment/pay`, {
        amount: totalAmount,
        cartItems,
        userId: "dummy_user_123", // replace later with auth user ID
      });

      if (res.data.success) {
        alert(
          `Payment Successful ✅\nTransaction ID: ${res.data.transactionId}`
        );
      }
    } catch (err) {
      console.error(err);
      alert("Payment Failed ❌");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart summary */}
      <div className="mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{Number(item.price) * item.qty}</span>
          </div>
        ))}
      </div>

      {/* Total amount */}
      <p className="text-lg font-semibold mb-4">
        Total Amount: ₹{totalAmount}
      </p>

      <button
        onClick={handlePayment}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
      >
        Pay Now (Dummy)
      </button>
    </div>
  );
};

export default Checkout;
