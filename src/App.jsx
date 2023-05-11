import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/MainLayout";
import NotFound from "./components/Notfound";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import VerifyEmail from "./pages/login/VerifyEmail";
import About from "./pages/About";
import Themes from "./pages/Themes";
import Error from "./components/Error";
import ResetPassword from "./pages/login/ResetPassword";
// import Dashboard from "./pages/dashboard/Dashboard";
import Compare from "./pages/compare/Compare";
import { AuthContext } from "./Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import PrivateRoutes from "./layouts/PrivateRoutes";
import Product from "./pages/compare/Product/Product";
import Dashboard from "./pages/dashboard/dashboard";
import Test from "./pages/Test";
import Cartesmere from "./pages/compare/Product/Cartesmere";
import Memoires from "./pages/compare/Product/Memoires";
import Processeurs from "./pages/compare/Product/Processeurs";
import CartesGraphiques from "./pages/compare/Product/CartesGraphique";
import styled from "styled-components";
import { STYLEDButton } from "./components/styles/genericButton";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="verify" element={<VerifyEmail />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="about" element={<About />} />
      <Route path="themes" element={<Themes />} />
      <Route path="compare" element={<Compare />} />
      <Route path="compare/gpu" element={<CartesGraphiques />} />
      <Route path="compare/cpu" element={<Processeurs />} />
      <Route path="compare/ram" element={<Memoires />} />
      <Route path="compare/mb" element={<Cartesmere />} />

      <Route path="compare/product/:Category_to_find/:Id_article_to_find" element={<Product />} />

      {/*  TEST COMPONENT */}
      <Route path="test" element={<Test />} />

      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [refusedCookies, setRefusedCookies] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("pcCompareConsent=")) {
        const cookieValue = cookie.split("=")[1];
        if (cookieValue === "true") {
          setAcceptedCookies(true);
        }
      }
    }
    const refusedCookiesValue = sessionStorage.getItem("refusedCookies");
    if (refusedCookiesValue === "true") {
      setAcceptedCookies(false);
      setRefusedCookies(true);
    }
  }, []);
  function acceptCookies() {
    setAcceptedCookies(true);
    setRefusedCookies(false);
    document.cookie =
      "pcCompareConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  }
  function refuseCookies() {
    setAcceptedCookies(false);
    setRefusedCookies(true);
    sessionStorage.setItem("refusedCookies", "true");
  }

  return (
    <div>
      <RouterProvider router={router} auth={auth} setAuth={setAuth} />
      {(!acceptedCookies || refusedCookies) && !refusedCookies && (
        <CookieBanner acceptedCookies={acceptedCookies}>
          <CookieText>
            Nous utilisons les cookies pour améliorer votre expérience. Notez
            que nous n'utilisons aucun cookie à des fins commerciales.
          </CookieText>
          <CookieButton onClick={acceptCookies}>Accepter</CookieButton>
          <CookieButton onClick={refuseCookies}>Refuser</CookieButton>
        </CookieBanner>
      )}
    </div>
  );
}
export default App;

const CookieBanner = styled.div`
display: none;
  display: ${(props) => (props.acceptedCookies ? "none" : "flex")};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color-400);
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const CookieText = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 10px;
  line-height: 1.5;
`;

const CookieButton = styled.button`
  background-color: var(--secondary-color-200);
  color: var(--main-color-100);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 10px;
`;
