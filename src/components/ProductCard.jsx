import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="ingredient">
      <div className="ingredient__image">
        <figure>
          <img src={product.image} alt={product.title} />
        </figure>
      </div>
      <div className="ingredient__title">
        <h3>{product.title}</h3>
      </div>
      <div className="ingredient__content">
        <p>
          <span>{product.price}</span>
        </p>
      </div>
      <div className="ingredient__btn">
        <button onClick={handleAddToCart} className="btn-white">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
