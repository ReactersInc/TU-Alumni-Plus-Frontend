import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/about/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
