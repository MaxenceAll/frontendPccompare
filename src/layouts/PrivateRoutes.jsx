import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Route, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoutes({ children, ...rest }) {
  const { auth } = useContext(AuthContext);

  if (!auth?.data) {
    toast.warning("Il faut s'identifer pour accèder à cette page !");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
