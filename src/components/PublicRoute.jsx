import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const PublicRoute = ({ children }) => {
  const { myAuth } = useAuth();
  const { uid } = myAuth;

  return !uid ? children : <Navigate to="/" />;
};

export default PublicRoute;
