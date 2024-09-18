import { Navigate, useLocation } from "react-router-dom";
import { decryptFromStoreLoc } from "./localStorage";

function ProtectedRoute(props) {
  let location = useLocation();
  let isProtectTrue = decryptFromStoreLoc(props?.data);
  return isProtectTrue === "True" ? (
    props?.children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
