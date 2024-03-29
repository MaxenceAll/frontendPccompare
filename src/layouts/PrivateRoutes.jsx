import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Tools/Loader";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";

export default function PrivateRoutes({ children, ...rest }) {
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!auth?.data);
  }, [auth]);
  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }
  if (!auth?.data || auth?.data === null || auth === null) {
    toast.warning("Il faut être identifié pour accèder à cette page !");
    return <Navigate key="login" to="/login" />;
  }
  return <Outlet />;
}