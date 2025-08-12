import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) return <Navigate to="/login" replace />;
  if (user.userType !== allowedRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RoleBasedRoute;
