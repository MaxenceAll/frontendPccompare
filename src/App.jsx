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
import Login2 from "./pages/login/Login2";
import Error from "./components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="login2" element={<Login2 />} />
      <Route path="verify" element={<VerifyEmail />} />
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
