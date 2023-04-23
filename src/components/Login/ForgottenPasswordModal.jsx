import React, { useRef, useState } from "react";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";
import fetcher from "../../helper/fetcher";

function ForgottenPasswordModal() {
  // Mot de passe oublié logic:
  const passwordForgottenEmailInputRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);
  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };
  const handleRenewPassword = async (e) => {
    e.preventDefault();
    const emailObject = { email };
    console.log(emailObject);
    const resp = await fetcher.post("reset", emailObject);
    console.log(resp);
    setIsModalOpenForgottenPassword(false);
    if (resp.result) {
      toast.success(
        `Envoi d'un e-mail à votre adresse : ${resp.data.accepted} ; vérifiez votre boite mail ! Vous avez 10 minutes pour ré-initialiser votre mot de passe.`
      );
    } else {
      if (resp.message)
        toast.error(`Ooops erreur, retour de l'api : ${resp.data.message}`);
    }
  };

  return (
    <>


      <STYLEDForm onSubmit={(e) => handleRenewPassword(e)}>
        <label htmlFor="renewPasswordEmail">
          Envoyer les instructions sur l'adresse mail suivante ?
        </label>
        <STYLEDhr />
        <STYLEDInput
          width="80%"
          id="renewPasswordEmail"
          name="email"
          type="email"
          placeholder="Votre adresse email"
          onChange={(e) => setEmail(e.target.value)}
          required
          ref={passwordForgottenEmailInputRef}
        />
        <STYLEDhr />
        <STYLEDButton width="40%" type="submit">
          Envoyer
        </STYLEDButton>
        {/* <STYLEDButton
          width="40%"
          type="button"
          onClick={() => setIsModalOpenForgottenPassword(false)}
        >
          Non
        </STYLEDButton> */}
      </STYLEDForm>
    </>
  );
}

export default ForgottenPasswordModal;
