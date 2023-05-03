import { useContext, useState } from "react";
import { toast } from "react-toastify";
import fetcher from "../helper/fetcher";
import { AuthContext } from "../Contexts/AuthContext";
import useCookie from "./useCookie";

export function useDisconnect() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // console.log("authCookie:", authCookie);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  async function disconnect() {
    setIsDisconnecting(true);
    try {
      const response = await fetcher.post("/login/logout");
      if (response.result === true) {
        // console.log(response);
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAuth(null);
        setAuthCookie(null);
      } else {
        console.error(
          `Oops une erreur lors de la déconnection, retour de l'api ${response?.message}:`
        );
      }
    } catch (error) {
      console.error("Oops une erreur apparait :", error);
    }
    setIsDisconnecting(false);
  }

  return [disconnect, isDisconnecting];
}
