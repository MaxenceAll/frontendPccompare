import React from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";
import { STYLEDButton } from "../components/styles/genericButton";
import styled from "styled-components";

function Themes() {

  const [theme, setTheme] = useState("dark");



  useEffect(() => {
    const root = document.querySelector(":root");
    switch (theme) {
      case "dark":
        root.style.setProperty("--main-color", "#18dc0c");
        root.style.setProperty("--secondary-color", "#11291b");
        root.style.setProperty("--background-color", "#10170f");
        break;
      case "light":
        root.style.setProperty("--main-color", "#ff0033");
        root.style.setProperty("--secondary-color", "#4d0000");
        root.style.setProperty("--background-color", "#330000");
        break;
      default:
        break;
    }
  }, [theme]);


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
          backgroundColor: "var(--background-color)",
          color: "var(--main-color)",
        }}
      />

      <STYLEDContainer>
        <STYLEDContainerBox>
          Thème prédéfinis :
          <div>
            <STYLEDButton width="25%" onClick={() => handleClick("dark")}>
              Dark
            </STYLEDButton>
            <STYLEDButton width="25%" onClick={() => handleClick("light")}>
              Light
            </STYLEDButton>
          </div>
        </STYLEDContainerBox>
      </STYLEDContainer>
    </>
  );
}

export default Themes;
