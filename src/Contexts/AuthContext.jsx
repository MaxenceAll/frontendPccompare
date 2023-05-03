import { createContext, useContext, useEffect, useMemo, useState } from "react";
import fetcher from "../helper/fetcher";
import useCookie from "../Hooks/useCookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({data:null});
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // const authMemo = useMemo(() => ({ auth, setAuth }), [auth]);

  useEffect(() => {
    const doFetch = async () => {
      const resp = await fetcher.get("auth");
      console.log("yo la response de auth fetcher is :",resp)
      if (!resp.data) {
        console.log("no data, trying to get a new accessToken via le refresh token");
        const response = await fetcher.get("refresh");
        console.log(response);
        if (response.result) {
          setAuthCookie(response.accessToken ?? null, {
            "max-age": `${60 * 60 * 24 * 10}`,
          });
          const resp2 = await fetcher.get("auth");
          console.log(resp2) 
          setAuth(resp2);
        } else {
          console.log("No refresh token found, you have to login.");
        }
      } else {
        setAuth(resp);
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
