import { useEffect, useRef, useState } from "react";
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

{
  /* TODO: MAKE THIS IN 1 FORM ONLY */
}
function Login() {
  const [display, setDisplay] = useState("login");

  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);

  const passwordForgottenEmailInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };

  async function handleRenewPassword(e) {}

  function handleDisconnect(e) {
    setIsModalOpenDisconnect(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  const onSubmitLogin = async (data) => {
    console.log(data);
    const url = config.api.url + "users";
    const headers = { authorization: `Bearer ${config.api.authorization}` };
    console.log(url);
    try {
      const response = await axios.get(url, { headers });
      console.log(response);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitRegister = async (data) => {
    console.log(data);
  };

  return (
    <STYLEDLoginContainer>
      <STYLEDLoginContainerBox>
        {/*  TODO Trouver un moyen de déplacer cette logique ailleurs (main.jsx ?) */}
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

        <>
          {display === "login" && (
            <STYLEDLoginContainerBoxForm onSubmit={handleSubmit(onSubmitLogin)}>
              <div>
                <label htmlFor="emailInputLogin">Adresse mail :</label>
                <STYLEDInput
                  id="emailInputLogin"
                  ref={emailInputRef}
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
                {errors.email ? <HiBan /> : <HiCheck />}
              </div>
              <div>
                <label htmlFor="passwordInputLogin">Mot de passe :</label>
                <STYLEDInput
                  id="passwordInputLogin"
                  placeholder="Saisir votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="pincode"
                  {...register("pincode", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 4,
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      //     value
                      //   ),
                    },
                  })}
                />
                {/* TODO: FIX THIS */}
                {errors.pincode ? <HiBan /> : <HiCheck />}
              </div>

              <STYLEDhr />

              <STYLEDButton width="50%" type="submit">
                S'identifier
              </STYLEDButton>

              {errors.email && (
                <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
              )}
              {/* {errors.pincode?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
              {errors.pincode?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.pincode?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
                Mot de passe oublié ?
              </STYLEDButton>
            </STYLEDLoginContainerBoxForm>
          )}

          {display === "register" && (
            <STYLEDLoginContainerBoxForm
              onSubmit={handleSubmit(onSubmitRegister)}
            >
              <div>
                <label>Adresse mail :</label>
                <STYLEDInput
                  ref={emailInputRef}
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
                {errors.email ? <HiBan /> : <HiCheck />}
              </div>
              <div>
                <label>Mot de passe :</label>
                <STYLEDInput
                  placeholder="Saisir votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="pincode"
                  {...register("pincode", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 4,
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      //     value
                      //   ),
                    },
                  })}
                />
                {errors.pincode ? <HiBan /> : <HiCheck />}
              </div>

              <div>
                <label>------------ :</label>
                <STYLEDInput
                  placeholder="Valider votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="pincode2"
                  {...register("pincode2", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 4,
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      //     value
                      //   ),
                    },
                  })}
                />
                {/* TODO: FIX THIS */}
                {errors.pincode2 ? <HiBan /> : <HiCheck />}
              </div>

              <STYLEDhr />
              <label></label>
              <STYLEDButton width="50%" type="submit">
                S'enregistrer
              </STYLEDButton>

              {errors.email && (
                <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
              )}
              {/* {errors.pincode2?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
              {errors.pincode2?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.pincode2?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              {/* {errors.pincode2?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
              {errors.pincode2?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.pincode2?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
                Mot de passe oublié ?
              </STYLEDButton>
            </STYLEDLoginContainerBoxForm>
          )}

          <STYLEDLoginOptionsButtons
            onClick={() => setDisplay("login")}
            style={{
              backgroundColor:
                display === "login"
                  ? "var(--background-color-400)"
                  : "var(--background-color-200)",
              color:
                display === "login"
                  ? "var(--main-color-100)"
                  : "var(--main-color-200)",
            }}
          >
            S'identifier
          </STYLEDLoginOptionsButtons>
          <STYLEDLoginOptionsButtons
            onClick={() => setDisplay("register")}
            style={{
              backgroundColor:
                display === "register"
                  ? "var(--background-color-400)"
                  : "var(--background-color-200)",
              color:
                display === "register"
                  ? "var(--main-color-100)"
                  : "var(--main-color-200)",
            }}
          >
            S'enregistrer
          </STYLEDLoginOptionsButtons>
        </>
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

const STYLEDLoginContainerBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 250px;
  padding: 25px;
`;

const STYLEDLoginOptionsButtons = styled.button`
  width: 50%;
  border: none;
  padding: 10px;
  color: var(--main-color-100);
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    color: var(--main-color-300) !important;
    background-color: var(--background-color-400) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2) !important;
  }
`;
