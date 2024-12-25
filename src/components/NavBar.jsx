import { Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const { myAuth } = useAuth();
  const { uid } = myAuth;

  const handleLogout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="header__navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {!uid && (
              <>
                <li>
                  <Link to="/register">register</Link>
                </li>

                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/admin/products">All Products</Link>
            </li>

            <li>
              <Link to="/admin/users">Users</Link>
            </li>

            {uid && (
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            )}

            <li>
              <Link to="/add-product">Add Product</Link>
            </li>

            <li>
              <Link to="/my-orders">My Orders</Link>
            </li>

            <li>
              <Link to="/admin/order-list">Order List</Link>
            </li>
            {uid && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
