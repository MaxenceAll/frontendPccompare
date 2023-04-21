import { useContext, useEffect, useRef, useState } from "react";
import { HiCheck, HiBan } from "react-icons/hi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import { useForm } from "react-hook-form";
import GenericModal from "../../components/Tools/GenericModal";

import { STYLEDForm } from "../../components/styles/genericForm";
import { STYLEDButton } from "../../components/styles/genericButton";
import { STYLEDhr } from "../../components/styles/genericHR";
import { STYLEDErrorMessage } from "../../components/styles/genericParagraphError";
import { STYLEDInput } from "../../components/styles/genericInput";

import axios from "axios";
import config from "../../../config";
import fetcher from "../../helper/fetcher";
import useCookie from "../../Hooks/useCookie";
import { AuthContext } from "../../Contexts/AuthContext";

{  /* TODO: MAKE THIS IN 1 FORM ONLY */ }
function Login() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  console.log("authCookie:", authCookie);

  

  // Form logic :
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  // Login Logic :
  const onSubmitLogin = async (data) => {
    data.email = data.email.toLowerCase();
    console.log(data);
    const { email, password } = data;
    try {
      const response = await fetcher.post("/login", { email, password });
      console.log("response from login fetcher.post query:", response);
      if (response.data) {
        setAuth({
          email: response?.data?.email,
          pseudo: response?.data?.pseudo,
          firstname: response?.data?.firstname,
          lastname: response?.data?.lastname,
          id_role: response?.data?.id_role,
          accessToken: response?.accessToken,
        });
        setAuthCookie(response.accessToken ?? null, {
          "max-age": `${60 * 60 * 24 * 10}`,
        });
      }
      if (response.result === false) {
        toast.error(`Erreur lors de la connexion, retour du server: ${response.message}`)
      }
    } catch (err) {
      console.error("Oops une erreur apparait :", err);
    }
  };

  // Disconnect logic:
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };
  function handleDisconnect(e) {
    setAuth(null);
    setAuthCookie(null);
    setIsModalOpenDisconnect(false);
    toast.info(`Deconnexion avec succes.`);
  }
  // Mot de passe oublié logic:
  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);
  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };
  async function handleRenewPassword(e) {
    // e.preventDefault();
    const emailObject = { email };
    // console.log(emailObject);
    const resp = await fetcher.post("renew", emailObject);
    // console.log(resp);
    setIsModalOpenForgottenPassword(false);
    if (resp.result) {
      toast.success(
        `Envoi d'un e-mail à votre adresse : ${resp.data.accepted} ; vérifiez votre boite mail !`
      );
    } else {
      if (resp.message)
        toast.error(`Ooops erreur, retour de l'api : ${resp.data.message}`);
    }
  }

  return (
    <STYLEDLoginContainer>
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
          backgroundColor: "var(--background-color-100)",
          color: "var(--main-color-100)",
        }}
      />

      <GenericModal
        ariaLabelMessage="Modal de confirmation déconnexion"
        isOpen={isModalOpenDisconnect}
        onClose={() => setIsModalOpenDisconnect(false)}
      >
        <label>Voulez-vous vraiment vous déconnecter ?</label>
        <STYLEDButton
          onClick={(e) => handleDisconnect(e)}
          width="40%"
          type="button"
        >
          Oui
        </STYLEDButton>
        <STYLEDButton
          width="40%"
          type="button"
          onClick={() => setIsModalOpenDisconnect(false)}
        >
          Non
        </STYLEDButton>
      </GenericModal>

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

      <STYLEDLoginContainerBox>
        {auth?.data ? (
          <>
            <p>Bonjour, {auth.data.email}</p>
            <STYLEDButton width="100%" onClick={openDisconnectModal}>
              Se déconnecter.
            </STYLEDButton>
          </>
        ) : (
          <>
            <STYLEDForm onSubmit={handleSubmit(onSubmitLogin)}>
              Se connecter :
              <STYLEDhr />
              <div>
                <label htmlFor="emailInputLogin">Adresse mail :</label>
                <STYLEDInput
                  id="emailInputLogin"
                  autoComplete="username"
                  placeholder="Saisir votre adresse mail"
                  type="text"
                  name="email"
                  {...register("email", {
                    required: "Il faut saisir une adresse mail voyons !",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Adresse mail invalide",
                    },
                  })}
                />
                {errors.email ? (
                  <HiBan style={{ color: "red" }} />
                ) : (
                  <HiCheck style={{ color: "green" }} />
                )}
              </div>
              <div>
                <label htmlFor="passwordInputLogin">Mot de passe :</label>
                <STYLEDInput
                  id="passwordInputLogin"
                  placeholder="Saisir votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 4,
                      // TODO : réactiver cela pour la prod
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      //     value
                      //   ),
                    },
                  })}
                />
                {errors.password ? (
                  <HiBan style={{ color: "red" }} />
                ) : (
                  <HiCheck style={{ color: "green" }} />
                )}{" "}
              </div>
              <STYLEDhr />
              <STYLEDButton width="50%" type="submit">
                S'identifier
              </STYLEDButton>
              <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
                Mot de passe oublié ?
              </STYLEDButton>
              {errors.email && (
                <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
              )}
              {errors.password?.type === "matchPattern" && (
                <STYLEDErrorMessage>
                  Doit contenir au moins une Majuscule, une minuscule, une
                  chiffre et un caractère spécial..
                </STYLEDErrorMessage>
              )}
              {errors.password?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.password?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
            </STYLEDForm>
          </>
        )}
      </STYLEDLoginContainerBox>
    </STYLEDLoginContainer>
  );
}

export default Login;

const STYLEDLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const STYLEDLoginContainerBox = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;