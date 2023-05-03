import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { ThemeContextProvider } from "./Contexts/ThemeContext";
import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { pccompareApi } from "./features/pccompareSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <Provider store={store}>
    <ApiProvider api={pccompareApi}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              backgroundColor: "var(--background-color-100)",
              color: "var(--main-color-100)",
            }}
          />
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ApiProvider>
  </Provider>

  // </React.StrictMode>
);
