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
import fetcher from "../../helper/fetcher";

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitLogin = async (data) => {
    data.email = data.email.toLowerCase();
    console.log(data);
    // const url = config.api.url + "users";
    // const headers = { authorization: `Bearer ${config.api.authorization}` };
    // console.log(url);
    // try {
    //   const response = await axios.get(url, { headers });
    //   console.log(response);
    //   // console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      setIsLoading(true);
      const response = await fetcher.get("/users");
      console.log(response);
      console.log(`Request took ${response.duration}ms`);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
  };

  const onSubmitRegister = async (data) => {
    data.email = data.email.toLowerCase();
    console.log(data);
    if (data.password !== data.password2) {
      alert(`Oooooops les mots de passe ne correspondent pas !`);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetcher.post("/account/register", data);
      console.log(response);
      console.log(`Request took ${response.duration}ms`);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
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

        {/* FORM POUR LOGIN : */}
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
                  name="password"
                  {...register("password", {
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
                {errors.password ? <HiBan /> : <HiCheck />}
              </div>

              <STYLEDhr />

              <STYLEDButton width="50%" type="submit">
                S'identifier
              </STYLEDButton>

              {errors.email && (
                <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
              )}
              {/* {errors.password?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
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
              <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
                Mot de passe oublié ?
              </STYLEDButton>
            </STYLEDLoginContainerBoxForm>
          )}

          {/* FORM POUR REGISTER : */}
          {display === "register" && (
            <STYLEDLoginContainerBoxForm
              onSubmit={handleSubmit(onSubmitRegister)}
            >

              <div>
                <label htmlFor="firstname">Votre prénom :</label>
                <STYLEDInput
                  id="firstname"
                  placeholder="Saisir votre prénom"
                  type="text"
                  name="firstname"
                  {...register("firstname", {
                    required: true,
                    validate: {
                      onlyLetters: /^[a-zA-Z]+$/,
                    },
                  })}
                />
                {errors.firstname ? <HiBan /> : <HiCheck />}
              </div>

              <div>
                <label htmlFor="lastname">Votre nom de famille :</label>
                <STYLEDInput
                  id="lastname"
                  placeholder="Saisir votre nom de famille"
                  type="text"
                  name="lastname"
                  {...register("lastname", {
                    required: true,
                    validate: {
                      onlyLetters: /^[a-zA-Z]+$/,
                    },
                  })}
                />
                {errors.lastname ? <HiBan /> : <HiCheck />}
              </div>


              <div>
                <label htmlFor="pseudo">Votre pseudo :</label>
                <STYLEDInput
                  id="pseudo"
                  placeholder="Saisir votre pseudo"
                  type="text"
                  name="pseudo"
                  {...register("pseudo", {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 4,
                    },
                  })}
                />
                {errors.pseudo ? <HiBan /> : <HiCheck />}
              </div>

              <div>
                <label htmlFor="email">Adresse mail :</label>
                <STYLEDInput
                  id="email"
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
                <label htmlFor="password1">Mot de passe :</label>
                <STYLEDInput
                  id="password1"
                  placeholder="Saisir votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  {...register("password", {
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
                {errors.password ? <HiBan /> : <HiCheck />}
              </div>

              <div>
                <label htmlFor="password2">------------ :</label>
                <STYLEDInput
                  id="password2"
                  placeholder="Valider votre mot de passe"
                  autoComplete="current-password"
                  type="password"
                  name="password2"
                  {...register("password2", {
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
                {errors.password2 ? <HiBan /> : <HiCheck />}
              </div>

              <STYLEDhr />
              <label></label>
              <STYLEDButton width="50%" type="submit">
                S'enregistrer
              </STYLEDButton>

              {errors.firstname?.type === "onlyLetters" && (
                <STYLEDErrorMessage>
                  Que des lettres pour le prénom voyons !
                </STYLEDErrorMessage>
              )}
              {errors.lastname?.type === "onlyLetters" && (
                <STYLEDErrorMessage>
                  Que des lettres pour le prénom voyons !
                </STYLEDErrorMessage>
              )}

              {errors.email && (
                <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
              )}
              {/* {errors.password2?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
              {errors.password2?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.password2?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              {/* {errors.password2?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
              </STYLEDErrorMessage>
            )} */}
              {errors.password2?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut saisir un mot de passe voyons !
                </STYLEDErrorMessage>
              )}
              {errors.password2?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le mot de passe doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              {errors.pseudo?.type === "checkLength" && (
                <STYLEDErrorMessage>
                  Le pseudo doit être de 4 signes minimum, bah wé.
                </STYLEDErrorMessage>
              )}
              {errors.pseudo?.type === "required" && (
                <STYLEDErrorMessage>
                  Il faut choisir un pseudo.
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
  /* max-height: 250px; */
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
