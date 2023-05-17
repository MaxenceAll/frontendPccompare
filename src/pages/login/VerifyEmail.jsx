import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import fetcher from "../../helper/fetcher";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../components/styles/genericContainer";
import { STYLEDButton } from "../../components/styles/genericButton";
import ButtonReturnToProps from "../../components/Tools/ButtonReturnToProps";
import { useEffect, useState } from "react";

function VerifyEmail() {

  const navigate = useNavigate();
  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page principale | Vérification d'e-mail`;
  }, []);

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
        toast.success("Validation de votre compte avec succès !"
        );
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
        <div>Cliquez sur ce bouton pour valider votre compte.</div>

        <STYLEDButton
          width={"100%"}
          onClick={handleClick}
          disabled={respResult === "success"}
        >
          Valider en cliquant ici
        </STYLEDButton>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default VerifyEmail;
