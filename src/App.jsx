import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="verify" element={<VerifyEmail />} />
      <Route path="reset" element={<ResetPassword />} />
      <Route path="about" element={<About />} />
      <Route path="themes" element={<Themes />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);



function App() { 
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}
export default App;
