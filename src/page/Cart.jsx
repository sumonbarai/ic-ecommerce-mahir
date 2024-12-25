import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let totalPrice = cartData.reduce((acc, cur) => {
    const result = cur.price * cur.qty;
    return acc + result;
  }, 0);
  return (
    <>
      <div className="account-setting__content">
        <div className="account-setting__content__title">
          <h4>Product list in your cart</h4>
        </div>
        {cartData.length < 1 ? (
          <p style={{ textAlign: "center" }}>No cart item found</p>
        ) : (
          <div>
            <div className="product-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>PRODUCT Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item) => {
                    return <CartItem item={item} key={item.id} />;
                  })}
                </tbody>
              </table>
            </div>
            <h2 className="total-price">
              You Total Price Will be = {totalPrice}
            </h2>
            <button onClick={() => navigate("/checkout")}>payment</button>
            <div className="mt-50">
              <button
                type="button"
                className="btn-big"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
