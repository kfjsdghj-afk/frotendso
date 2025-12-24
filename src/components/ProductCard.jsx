import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-2
        sm:py-2.5
        rounded-md
        font-medium
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
      "
    >
      Add to Cart
    </button>
  );
};

export default ProductCard;
