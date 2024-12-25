/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { modifyQtn, removeItem } from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(modifyQtn({ id: item.id, qty: item.qty + 1 }));
  };
  const handleDecrease = (item) => {
    let qty = item.qty;

    if (qty <= 1) {
      qty = 1;
    } else {
      qty = qty - 1;
    }
    dispatch(modifyQtn({ id: item.id, qty: qty }));
  };
  return (
    <tr>
      <td>
        <div className="product">
          <img src={item.image} className="product-img" alt={item.title} />
        </div>
      </td>
      <td>
        <p>{item.title}</p>
      </td>
      <td>$ {item.price}</td>
      <td>
        <div className="qty_input">
          <button
            className="qty-count qty-count--minus"
            data-action="minus"
            type="button"
            onClick={() => handleDecrease(item)}
          >
            <figure>-</figure>
          </button>
          <input
            className="product-qty"
            type="number"
            name="product-qty"
            min="1"
            value={item.qty}
            onChange={(e) =>
              dispatch(modifyQtn({ id: item.id, qty: e.target.value }))
            }
          />
          <button
            className="qty-count qty-count--add"
            data-action="add"
            type="button"
            onClick={() => handleIncrease(item)}
          >
            <figure>+</figure>
          </button>
        </div>
      </td>
      <td>$ {item.price * item.qty}</td>
      <td>
        <button
          className="cross-icon"
          onClick={() => dispatch(removeItem(item))}
        >
          remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
