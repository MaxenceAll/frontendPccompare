import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";

import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
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

function LoginForm() {

    const { auth, setAuth } = useContext(AuthContext);
    console.log("authcontext:",auth); 
    const [authCookie, setAuthCookie] = useCookie("accessToken");
    console.log("authCookie:",authCookie);

  const [isModalOpenForgottenPassword, setIsModalOpenForgottenPassword] =
  useState(false);

  const handleRenewPassword = () =>{
      alert("handleRenew pass");
  }

  const passwordForgottenEmailInputRef = useRef(null);
  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

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
    } catch (err) {
      console.error("Hey, l'erreur est:", err);
    }
  };

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>

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

        <STYLEDLoginContainerBoxForm onSubmit={handleSubmit(onSubmitLogin)}>
            <ForgottenPasswordModal/>
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
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    ),
                },
              })}
            />
            {errors.password ? <HiBan /> : <HiCheck />}
          </div>

          <STYLEDhr />

          <STYLEDButton width="50%" type="submit">
            S'identifier
          </STYLEDButton>

          {errors.email && (
            <STYLEDErrorMessage>{errors.email.message}</STYLEDErrorMessage>
          )}
          {errors.password?.type === "matchPattern" && (
              <STYLEDErrorMessage>
                Doit contenir au moins une Majuscule,
                une minuscule, une chiffre et un caractère spécial..
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
          <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
            Mot de passe oublié ?
          </STYLEDButton>
        </STYLEDLoginContainerBoxForm>

        
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default LoginForm;


const STYLEDLoginContainerBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-height: 250px; */
  padding: 25px;
`;
