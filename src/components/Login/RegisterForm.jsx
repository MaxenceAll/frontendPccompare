import React, { useState } from "react";
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

function RegisterForm() {
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  console.log(authCookie);

  const openForgottenPasswordModal = (e) => {
    setIsModalOpenForgottenPassword(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

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
    } catch (error) {
      console.error(error);
    }
  };


  return (
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
        {errors.firstname ? <HiBan /> : <HiCheck />}
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
              checkLength: (value) => value.length >= 2,
            },
          })}
        />
        {errors.pseudo ? <HiBan /> : <HiCheck />}
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
        {errors.email ? <HiBan /> : <HiCheck />}
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
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  value
                ),
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
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  value
                ),
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
      {errors.password2?.type === "matchPattern" && (
        <STYLEDErrorMessage>
          Doit contenir au moins une Majuscule, une minuscule, une chiffre et un
          caractère spécial..
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
          Doit contenir au moins une Majuscule, une minuscule, une chiffre et un
          caractère spécial..
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
      <STYLEDButton width="50%" onClick={openForgottenPasswordModal}>
        Mot de passe oublié ?
      </STYLEDButton>
    </STYLEDLoginContainerBoxForm>
  );
}

export default RegisterForm;

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
