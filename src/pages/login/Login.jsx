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
import ButtonReturnToProps from "../../components/Tools/ButtonReturnToProps";
import ForgottenPasswordModal from "../../components/Login/ForgottenPasswordModal";

function Login() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  console.log("authCookie:", authCookie);

  // Login or Register logic :
  const [display, setDisplay] = useState("login");

  // Form logic :
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

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
        toast.error(
          `Erreur lors de la connexion, retour du server: ${response.message}`
        );
      }
    } catch (err) {
      console.error("Oops une erreur apparait :", err);
    }
  };

  // Login FOrm :
  const loginFormContent = (
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
          )}
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
            Doit contenir au moins une Majuscule, une minuscule, une chiffre et
            un caractère spécial..
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
  );

  // Register Logic :
  const onSubmitRegister = async (data) => {
    data.email = data.email.toLowerCase();
    console.log(data);
    if (data.password !== data.password2) {
      alert(`Oooooops les mots de passe ne correspondent pas !`);
      return;
    }
  };
  // Register Form :
  const registerFormContent = (
    <>
      <STYLEDLoginContainerBoxForm onSubmit={handleSubmit(onSubmitRegister)}>
        Formulaire d'inscription :
        <STYLEDhr />
        <div>
          <label htmlFor="firstname">Votre prénom :</label>
          <STYLEDInput
            id="firstname"
            placeholder="Saisir votre prénom"
            type="text"
            name="firstname"
            {...register("firstname", {
              required: true,
              pattern: {
                value: /^[a-zA-Z]+$/,
              },
              validate: {
                checkLength: (value) => value.length >= 2,
              },
            })}
          />
          {errors.firstname ? (
            <HiBan style={{ color: "red" }} />
          ) : (
            <HiCheck style={{ color: "green" }} />
          )}
        </div>
        <div>
          <label htmlFor="lastname">&nbsp;&nbsp;&nbsp;Votre nom :</label>
          <STYLEDInput
            id="lastname"
            placeholder="Saisir votre nom de famille"
            type="text"
            name="lastname"
            {...register("lastname", {
              required: true,
              pattern: {
                value: /^[a-zA-Z]+$/,
              },
              validate: {
                checkLength: (value) => value.length >= 2,
              },
            })}
          />
          {errors.lastname ? (
            <HiBan style={{ color: "red" }} />
          ) : (
            <HiCheck style={{ color: "green" }} />
          )}
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
                checkLength: (value) => value.length >= 2,
              },
            })}
          />
          {errors.pseudo ? (
            <HiBan style={{ color: "red" }} />
          ) : (
            <HiCheck style={{ color: "green" }} />
          )}
        </div>
        <STYLEDhr />
        <div>
          <label htmlFor="email">Adresse mail :</label>
          <STYLEDInput
            id="email"
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
        <STYLEDhr />
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
          {errors.password ? (
            <HiBan style={{ color: "red" }} />
          ) : (
            <HiCheck style={{ color: "green" }} />
          )}
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
          {errors.password2 ? (
            <HiBan style={{ color: "red" }} />
          ) : (
            <HiCheck style={{ color: "green" }} />
          )}
        </div>
        <STYLEDhr />
        <label></label>
        <STYLEDButton width="50%" type="submit">
          S'enregistrer
        </STYLEDButton>
        <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
          Mot de passe oublié ?
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
        {errors.password2?.type === "matchPattern" && (
          <STYLEDErrorMessage>
            Doit contenir au moins une Majuscule, une minuscule, une chiffre et
            un caractère spécial..
          </STYLEDErrorMessage>
        )}
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
        {errors.password2?.type === "matchPattern" && (
          <STYLEDErrorMessage>
            Doit contenir au moins une Majuscule, une minuscule, une chiffre et
            un caractère spécial..
          </STYLEDErrorMessage>
        )}
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
            Le pseudo doit être de 2 signes minimum, bah wé.
          </STYLEDErrorMessage>
        )}
        {errors.pseudo?.type === "required" && (
          <STYLEDErrorMessage>Il faut choisir un pseudo.</STYLEDErrorMessage>
        )}
      </STYLEDLoginContainerBoxForm>
    </>
  );

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
        <STYLEDForm onSubmit={(e)=>handleRenewPassword(e)}>
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


      <STYLEDLoginContainerBox>
        {auth?.data ? <>have data:{auth.data.email}</> : <>no data</>}
        {auth?.data ? (
          <>
            <p>Bonjour, {auth.data.email}</p>
            <STYLEDButton width="100%" onClick={openDisconnectModal}>
              Se déconnecter.
            </STYLEDButton>
            <ButtonReturnToProps />
          </>
        ) : (
          <>
            {display === "login" ? (
              <>{loginFormContent}</>
            ) : (
              <>{registerFormContent}</>
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
