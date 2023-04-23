import React, { useContext, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // console.log("authCookie:", authCookie);

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

  return (<>

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
        ariaLabelMessage="Modal de récupération de mot de passe"
        isOpen={isModalOpenForgottenPassword}
        onClose={() => setIsModalOpenForgottenPassword(false)}
      >
        <ForgottenPasswordModal />
      </GenericModal>

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
          Doit contenir au moins une Majuscule, une minuscule, une chiffre et un
          caractère spécial..
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
    </>);
}

export default LoginForm;
