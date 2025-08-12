// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedUserType }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // If not logged in
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If userType doesn't match the required one
  if (allowedUserType && user.userType !== allowedUserType) {
    return <Navigate to={`/${user.userType}/dashboard`} />;
  }

  return children;
};

export default ProtectedRoute;
