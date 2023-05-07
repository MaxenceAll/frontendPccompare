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
import { useContext } from "react";
import PrivateRoutes from "./layouts/PrivateRoutes";
import Product from "./pages/compare/Product/Product";
import Dashboard from "./pages/dashboard/dashboard";
import Test from "./pages/Test";
import Cartesmere from "./pages/compare/Product/Cartesmere";
import Memoires from "./pages/compare/Product/Memoires";
import Processeurs from "./pages/compare/Product/Processeurs";
import CartesGraphiques from "./pages/compare/Product/CartesGraphique";

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


      <Route path="compare/product" element={<Product />} />


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
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div>
      <RouterProvider router={router} auth={auth} setAuth={setAuth} />
    </div>
  );
}
export default App;
