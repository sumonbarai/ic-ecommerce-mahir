import { createBrowserRouter } from "react-router";
import Root from "../page/Root";
import Shop from "../page/Shop";
import Login from "../page/Login";
import Register from "../page/Register";
import Cart from "../page/Cart";
import NotFound from "../page/NotFound";
import PublicRoute from "../components/PublicRoute";
import AddProduct from "../page/AddProduct";
import PrivateAdminRoute from "../components/PrivateAdminRoute";
import PrivateRoute from "../components/PrivateRoute";
import AllProduct from "../page/AllProduct";
import Checkout from "../page/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <PrivateAdminRoute>
            <AddProduct />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <PrivateAdminRoute>
            <AllProduct />
          </PrivateAdminRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
