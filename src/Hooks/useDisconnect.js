import { useContext, useState } from "react";
import { toast } from "react-toastify";
import fetcher from "../helper/fetcher";
import { AuthContext } from "../Contexts/AuthContext";
import useCookie from "./useCookie";

export function useDisconnect() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  async function disconnect() {
    setIsDisconnecting(true);
    try {
      const response = await fetcher.post("/login/logout");
      if (response.result === true) {
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAuth(null);
        setAuthCookie(null);
        toast.success(`Déconnection avec succès !`)
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
