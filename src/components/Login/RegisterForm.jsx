import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import { HiBan, HiCheck } from "react-icons/hi";
import { STYLEDForm } from "../styles/genericForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetcher from "../../helper/fetcher";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import usePageTitle from "../../Hooks/usePageTitle";

function RegisterForm() {
  
  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Formulaire d'inscription`);

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

  // Register Logic :
  const onSubmitRegister = async (data) => {
    data.email = data.email.toLowerCase();
    if (data.password !== data.password2) {
      toast.error(`Oooooops les mots de passe ne correspondent pas !`);
      return;
    } else {
      const resp = await toast.promise(fetcher.post(`/register/pseudo`, data), {
        pending: "Vérification de la disponibilité du pseudo ! 🟠",
        success: "Vérification terminée ! 🟢",
        error: "Oops erreur pendant la vérification du pseudo ! 🔴",
      });
      if (resp.result) {
        var response = await toast.promise(fetcher.post("/register", data), {
          pending: "✍️ Préparation du mail de vérification ! 🟠",
          success: `Mail de vérification prêt ! 🟢`,
          error: `Oops erreur pendant la préparation du mail de confirmation ! 🔴`,
        });
        if (response.result) {
          toast.success(`${response.message}`);
          reset();
        } else{
          toast.error(`Oops une erreur lors de l'envoi du mail de vérification, retour de l'api : ${response.message}`)
        }
      } else {
        toast.error(`Erreur: ${resp.message}`);
        reset();
        return;
      }
    }
  };

  return (
    <>
      <STYLEDForm onSubmit={handleSubmit(onSubmitRegister)}>
        <div style={{ fontSize: "100px" }}>
          <HiOutlineUserAdd />
        </div>
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
        <div
          style={{
            position: "relative",
          }}
        >
          <label htmlFor="password1">Mot de passe :</label>
          <STYLEDInput
            id="password1"
            placeholder="Saisir votre mot de passe"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
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
        <div
          style={{
            position: "relative",
          }}
        >
          <label htmlFor="password2">------------ :</label>
          <STYLEDInput
            id="password2"
            placeholder="Valider votre mot de passe"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
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
        {errors.firstname?.type === "required" && (
          <STYLEDErrorMessage>Il faut saisir un nom.</STYLEDErrorMessage>
        )}
        {errors.lastname?.type === "required" && (
          <STYLEDErrorMessage>Il faut saisir un prénom.</STYLEDErrorMessage>
        )}
      </STYLEDForm>
    </>
  );
}

export default RegisterForm;
