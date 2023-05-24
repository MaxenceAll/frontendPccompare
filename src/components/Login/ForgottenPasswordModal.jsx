import React, { useRef, useState } from "react";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";
import fetcher from "../../helper/fetcher";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiMailSend } from "react-icons/bi";

function ForgottenPasswordModal({ closeForgottenPasswordModal }) {
  // Mot de passe oublié logic:
  const passwordForgottenEmailInputRef = useRef(null);
  const [email, setEmail] = useState(null);

  const handleRenewPassword = async (e) => {
    e.preventDefault();
    const emailObject = { email };
    closeForgottenPasswordModal();
    const resp = await toast.promise(fetcher.post("reset", emailObject), {
      pending: "Préparation du mail de récupération de mot de passe ! 🟠",
      success: "Mail de récupération prêt ! 🟢",
      error: "Oops erreur pendant l'écriture du mail ! 🔴",
    });
    // retour au client neutre (éviter qu'un puisse savoir si une personne a un compte ou pas)
    toast.success(`${resp.message}`);
  };

  return (
    <>
      <STYLEDForm onSubmit={(e) => handleRenewPassword(e)}>
        <div style={{ fontSize: "10rem" }}>
          <BiMailSend />
        </div>
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
      </STYLEDForm>
    </>
  );
}

export default ForgottenPasswordModal;