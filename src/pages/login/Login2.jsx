import { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDInput } from "../../components/styles/genericInput";
import fetcher from "../../helper/fetcher";
import useCookie from "../../Hooks/useCookie";

const Login2 = () => {
  const { auth, setAuth } = useContext(AuthContext);
  console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  console.log("authCookie:", authCookie);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetcher.post("/login", { email, password });
      console.log("response from login fetcher.post query:", response);
      if (response.data) {
        setAuth({
          email: response?.data?.email,
          pseudo: response?.data?.pseudo,
          firstname: response?.data?.firstname,
          lastname: response?.data?.lastname,
          id_role: response?.data?.id_role,
          accessToken: response?.accessToken,
        });
        setAuthCookie(response.accessToken ?? null, {
          "max-age": `${60 * 60 * 24 * 10}`,
        });
      }
    } catch (err) {
      console.error("Hey, l'erreur est:", err);
    }
  };

  return (
    <>
      {auth?.data?.email ? (
        <>
          <div>hello {auth?.data?.email}</div>
        </>
      ) : (
        <>
          <section>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <STYLEDInput
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <label htmlFor="password">Password:</label>
              <STYLEDInput
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button>Sign In</button>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default Login2;
