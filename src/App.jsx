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
// import { AuthContext } from "./Contexts/AuthContext";
import { useContext } from "react";
import PrivateRoutes from "./layouts/PrivateRoutes";
import Product from "./pages/compare/Product/Product";
import Dashboard from "./pages/dashboard/dashboard";

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
      <Route path="compare/product" element={<Product />} />

      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  // const { auth, setAuth } = useContext(AuthContext);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
