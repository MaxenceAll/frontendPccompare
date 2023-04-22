import React, { useRef, useState } from "react";
import GenericModal from "../Tools/GenericModal";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";

function ForgottenPasswordModal() {
  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);

  const handleRenewPassword = async () => {
    e.preventDefault();
    const emailObject = { email };
    console.log(emailObject);
    const resp = await fetcher.post("reset", emailObject);
    console.log(resp);
    setIsModalOpenForgottenPassword(false);
    if (resp.result) {
      toast.success(
        `Envoi d'un e-mail à votre adresse : ${resp.data.accepted} ; vérifiez votre boite mail !`
      );
    } else {
      if (resp.message)
        toast.error(`Ooops erreur, retour de l'api : ${resp.data.message}`);
    }
  };

  const passwordForgottenEmailInputRef = useRef(null);

  return (
    <>
      <GenericModal
        ariaLabelMessage="Modal de récupération de mot de passe"
        isOpen={isModalOpenForgottenPassword}
        onClose={() => setIsModalOpenForgottenPassword(false)}
      >
        <STYLEDForm onSubmit={handleRenewPassword}>
          <label htmlFor="email">
            Envoyer les instructions sur l'adresse mail suivante ?
          </label>
          <STYLEDhr />
          <STYLEDInput
            width="80%"
            id="email"
            name="email"
            type="email"
            placeholder="Votre adresse email"
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={passwordForgottenEmailInputRef}
          />
          <STYLEDhr />
          <STYLEDButton width="40%" type="submit">
            Oui
          </STYLEDButton>
          <STYLEDButton
            width="40%"
            type="button"
            onClick={() => setIsModalOpenForgottenPassword(false)}
          >
            Non
          </STYLEDButton>
        </STYLEDForm>
      </GenericModal>
    </>
  );
}

export default ForgottenPasswordModal;
