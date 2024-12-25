import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const PrivateAdminRoute = ({ children }) => {
  const { myAuth } = useAuth();
  const { role } = myAuth;

  return role === "admin" || role === "super-admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateAdminRoute;
