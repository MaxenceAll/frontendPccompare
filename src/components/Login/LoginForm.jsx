import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import { HiBan, HiCheck } from "react-icons/hi";
import useCookie from "../../Hooks/useCookie";
import ForgottenPasswordModal from "./ForgottenPasswordModal";
import GenericModal from "../Tools/GenericModal";
import { STYLEDForm } from "../styles/genericForm";
import { AuthContext } from "../../Contexts/AuthContext";
import fetcher from "../../helper/fetcher";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import usePageTitle from "../../Hooks/usePageTitle";

function LoginForm() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  const [authCookie, setAuthCookie] = useCookie("accessToken");

  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Page principale | Formulaire de login`)

  // Reveal Password logic:
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
    const { email, password } = data;
    try {
      const response = await fetcher.post("/login", { email, password });
      if (response.data && response.result === true) {
        setAuth(response);
        setAuthCookie(response.accessToken ?? null, {
          "max-age": `${60 * 60 * 24 * 10}`,
          "path": "/"
        });
        toast.info(`Connection avec succes.`);
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

  // Mot de passe oublié logic:
  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
    useState(false);
  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };

  return (
    <>
      <GenericModal
        ariaLabelMessage="Modal de récupération de mot de passe"
        isOpen={isModalOpenForgottenPassword}
        onClose={() => setIsModalOpenForgottenPassword(false)}
      >
        <ForgottenPasswordModal />
      </GenericModal>

      <STYLEDForm onSubmit={handleSubmit(onSubmitLogin)}>
        <div style={{ fontSize: "100px" }}>
          <VscAccount />
        </div>
        Se connecter :
        <STYLEDhr />
        <div>
          <label htmlFor="emailInputLogin">Adresse mail :</label>
          <STYLEDInput
            id="emailInputLogin"
            autoComplete="email"
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
        <div
          style={{
            position: "relative",
          }}
        >
          <label htmlFor="passwordInputLogin">Mot de passe :</label>
          <STYLEDInput
            id="passwordInputLogin"
            placeholder="Saisir votre mot de passe"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
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
          <button
            type="button"
            onClick={handleTogglePassword}
            style={{
              position: "absolute",
              top: "50%",
              right: 15,
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
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
        <STYLEDButton
          width="50%"
          onClick={openForgottenPasswordModal}
          type="button"
        >
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
}

export default LoginForm;
