import React, { useContext, useEffect, useState } from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";
import { STYLEDButton } from "../components/styles/genericButton";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../Hooks/useLocalStorage";
import { ThemeContext } from "../Contexts/ThemeContext";

function Themes() {
  const { setTheme } = useContext(ThemeContext);

  function handleClick(color) {
    setTheme(color);
    toast.success(`Changement de theme pour ${color}`);
  }
  return (
    <>
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

      <STYLEDContainer>
        Thème prédéfinis :
        <STYLEDContainerBox>
          <>
            <STYLEDButton width="25%" onClick={() => handleClick("dark")}>
              Dark
            </STYLEDButton>
            <STYLEDButton width="25%" onClick={() => handleClick("light")}>
              Light
            </STYLEDButton>
          </>
        </STYLEDContainerBox>
      </STYLEDContainer>
    </>
  );
}

export default Themes;