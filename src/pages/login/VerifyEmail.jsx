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


function VerifyEmail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("t");

  // console.log(token)

  const handleClick = async () => {
    try {
      const resp = await fetcher.get(`register/verify?${token}`,  {});
      console.log(resp);
      if (resp.result==="success") {
        toast.success("Validation de votre compte avec success !");
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

        <div>
          Cliquez sur ce bouton pour valider votre compte.
        </div>

        <STYLEDButton onClick={handleClick}>
          Valider en cliquant ici
        </STYLEDButton>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default VerifyEmail;
