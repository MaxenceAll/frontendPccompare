import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import fetcher from "../../helper/fetcher";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../components/styles/genericContainer";
import { STYLEDButton } from "../../components/styles/genericButton";
import { useState } from "react";
import usePageTitle from "../../Hooks/usePageTitle";

import { VscVerified } from "react-icons/vsc";
import styled from "styled-components";
import { STYLEDhr } from "../../components/styles/genericHR";

function VerifyEmail() {
  const navigate = useNavigate();
  // set title logic:
  usePageTitle(
    `${import.meta.env.VITE_APP_NAME} | Vérification d'e-mail`
  );

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
      if (resp.result) {
        toast.success("Validation de votre compte avec succès !");
        navigate("/login");
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
        <STYLEDVerifyEmail>
          <div style={{fontSize:"10rem"}}>
            <VscVerified />
          </div>
          <div>Cliquez sur ce bouton pour valider votre compte.</div>
          <STYLEDhr />
          <STYLEDButton
            width={"100%"}
            onClick={handleClick}
            disabled={respResult}
          >
            Valider en cliquant ici
          </STYLEDButton>
        </STYLEDVerifyEmail>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default VerifyEmail;

const STYLEDVerifyEmail = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
`