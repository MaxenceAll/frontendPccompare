import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Route, Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes({ children, ...rest }) {
  const { auth } = useContext(AuthContext);

  return auth?.data ? <Outlet /> : <Navigate to="/login" />;
}
