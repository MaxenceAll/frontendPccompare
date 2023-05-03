import { createContext, useContext, useEffect, useMemo, useState } from "react";
import fetcher from "../helper/fetcher";
import useCookie from "../Hooks/useCookie";
import useLocalStorage from "../Hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // je stock les données dans un objet à la structure {data:$datahere}
  const [auth, setAuth] = useState({ data: null });
  // je stock le accessToken en cookie non http-only pour pouvoir le manipuler (faible durée de vie)
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // je stock le accessToken également en localStorage.
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  // const authMemo = useMemo(() => ({ auth, setAuth }), [auth]);

  // useEffect à chaque re-render de chaque component wrappé dans le provider (toute l'application)
  useEffect(() => {
    // async impossible sur un useEffect donc on créé une ()=>
    const doFetch = async () => {
      // Requete vers la route /auth (notons que tous les cookies sont envoyés avec credentials:true; (voir fetcher)) le fait d'être en get sécurise un minimum.
      const firstAuthTry = await fetcher.get("auth");
      // Si je n'ai pas de data dans le retour de auth alors ...
      if (!firstAuthTry.data) {
        console.log("Pas d'accessToken, tentative avec refreshToken.");
        // ... alors je tente de passer par la route refresh pour récupérer un nouveau accessToken via le refreshToken
        const response = await fetcher.get("refresh");
        // Si j'ai un retour positif alors cette route me redonne un nouveau accessToken (non http-only) et un nouveau refreshToken http-only(avec toutes les dernières infos de l'utilisateur)
        if (response.result) {
          console.log("Réception d'un accessToken via le refreshToken.");
          // je peux donc les stocker en cookie et en localstorage
          setAccessToken(response.accessToken ?? null);
          setAuthCookie(response.accessToken ?? null, {
            "max-age": `${60 * 60 * 24 * 10}`,
          });
          // je dois quand même tester ce nouveau accessToken donc je repasse par la route /auth
          const secondAuthTry = await fetcher.get("auth");
          // je test quand même si j'ai des données en retour
          console.log("accessToken est ok, authentification OK !");
          setAuth(secondAuthTry);
        } else {
          console.log("Pas non plus de refreshToken, il faut s'identifier !");
        }
      } else {
        console.log("accessToken présent, authentification OK !")
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
