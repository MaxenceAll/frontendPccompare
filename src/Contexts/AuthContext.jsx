import { createContext, useContext, useEffect, useMemo, useState } from "react";
import fetcher from "../helper/fetcher";
import useCookie from "../Hooks/useCookie";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    
  const [auth, setAuth] = useState({data: null});
  const authMemo = useMemo(() => ({ auth, setAuth }), [auth]);

  const [authCookie, setAuthCookie] = useCookie("accessToken");

  useEffect(() => {
    const doFetch = async () => {
      const resp = await fetcher.get("auth");
        console.log(resp);
        if(!resp.data){
          console.log("yo pas de data, tentative avec le refresh token")
          const response = await fetcher.get("refresh");
          // console.log(response)
          setAuthCookie(response.accessToken ?? null, {
            "max-age": `${60 * 60 * 24 * 10}`, 
          });
        }else{
          setAuth(resp);
        }
    };
    doFetch();
  }, []);

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
};
