import { createContext, useEffect, useMemo, useState } from "react";
import fetcher from "../helper/fetcher";
import useCookie from "../Hooks/useCookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ data: null });
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  //TODO réfléchir à l'utilité d'un mémo ici...
  // const authMemo = useMemo(() => ({ auth, setAuth }), [auth]);

  useEffect(() => {
    const doFetch = async () => {
      const firstAuthTry = await fetcher.get("auth");
      if (!firstAuthTry.data) {
        console.log("Pas d'accessToken, tentative avec refreshToken.");
        const response = await fetcher.get("refresh");
        if (response.result) {
          console.log("Réception d'un accessToken via le refreshToken.");
          setAuthCookie(response.accessToken ?? null, {
            "max-age": `${60 * 60 * 24 * 10}`,
          });
          const secondAuthTry = await fetcher.get("auth");
          console.log("accessToken est ok, authentification OK !");
          setAuth(secondAuthTry);
        } else {
          console.log("Pas non plus de refreshToken, il faut s'identifier !");
        }
      } else {
        console.log("accessToken présent, authentification OK !");
        setAuth(firstAuthTry);
      }
    };
    doFetch();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
    // <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
};
