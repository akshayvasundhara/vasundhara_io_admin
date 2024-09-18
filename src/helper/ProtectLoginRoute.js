import { Navigate, useLocation } from "react-router-dom";

function ProtectLoginRoute({ children, ...rest }) {
  let location = useLocation();

  let isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    children
  );
}

export default ProtectLoginRoute;
