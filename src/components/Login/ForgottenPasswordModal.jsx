import React, { useRef, useState } from "react";
import GenericModal from "../Tools/GenericModal";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";

function ForgottenPasswordModal() {

    const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);

    const handleRenewPassword = () =>{
        alert("handleRenew pass");
    }

    const passwordForgottenEmailInputRef = useRef(null);

  return (
    <>
      {/* MODAL EST laiisé PAR ICI POUR GARDER LA LOGIC ICI */}
      {/* TODO : déporter ce modal... */}
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
