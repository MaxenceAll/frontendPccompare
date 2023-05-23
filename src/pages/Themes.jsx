import React, { useContext, useEffect } from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";
import { STYLEDButton } from "../components/styles/genericButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../Contexts/ThemeContext";
import usePageTitle from "../Hooks/usePageTitle";

function Themes() {
  const { setTheme } = useContext(ThemeContext);

  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Themes`)

  function handleClick(color) {
    setTheme(color);
    toast.success(`Changement de theme pour ${color}`);
  }
  return (
    <>
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
