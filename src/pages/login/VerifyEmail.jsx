import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from "react-router-dom";

import fetcher from "../../helper/fetcher";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../components/styles/genericContainer";
import { STYLEDButton } from "../../components/styles/genericButton";

import styled from "styled-components";
import ButtonReturnToProps from "../../components/Tools/ButtonReturnToProps";
import { useState } from "react";

function VerifyEmail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("t");

  const [respResult, setRespResult] = useState(null);
  // console.log(token)

  const handleClick = async () => {
    try {
      const resp = await fetcher.get(`register/verify?${token}`, {});
      // console.log(resp);
      setRespResult(resp.result);
      if (resp.result === "success") {
        toast.success(
          <ButtonReturnToProps
            msg="Validation de votre compte avec success !"
            destinationUrl="login"
            destinationMsg="de login"
          />
        );
      } else {
        toast.error(`Oops erreur, retour de l'api : ${resp.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Oops erreur, retour de l'api : ${error.message}`);
    }
  };

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
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
            backgroundColor: "var(--background-color-200)",
            color: "var(--main-color-100)",
          }}
        />

        <div>Cliquez sur ce bouton pour valider votre compte.</div>

        <STYLEDButton width={"100%"} onClick={handleClick} disabled={respResult === "success"}>
          Valider en cliquant ici
        </STYLEDButton>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default VerifyEmail;
