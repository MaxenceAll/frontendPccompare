import React, { useContext, useEffect, useState } from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import GenericModal from "../Tools/GenericModal";
import { STYLEDButton } from "../styles/genericButton";
import styled from "styled-components";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDInput } from "../styles/genericInput";
import fetcher from "../../helper/fetcher";
import {
  useGetCurrentCustomerQuery,
  useUpdateCustomerMutation,
} from "../../features/pccompareSlice";
import Loader from "../Tools/Loader";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import useCookie from "../../Hooks/useCookie";

function UserInformations() {
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de gestion | Vos informations`;
  }, []); 

  // get current customer info (based on auth token):
  let currentUserQuery = useGetCurrentCustomerQuery(auth?.data?.Id_customer);
  const {
    data: currentUser,
    error: currentUserError,
    isError: currentUserIsError,
    isLoading: currentUserIsLoading,
    isSuccess: currentUserIsSuccess,
  } = currentUserQuery;

  //Mini form pour modify logic:
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  // redux slice pour la query update
  const [updateCustomer, { updateCustomerIsLoading }] =
    useUpdateCustomerMutation();

  // Edit nom logic:
  ////////////////////////////////
  const [editNom, setEditNom] = useState(false);
  const handleDoubleClickNewNom = (e) => {
    e.stopPropagation();
    setEditNom(!editNom);
    reset();
  };
  const handleSubmitNewNom = async (data) => {
    data.Id_customer = auth?.data?.Id_customer;
    // console.log(data);
    try {
      const resp = await updateCustomer(data);
      // console.log("yo allo la resp est:",resp);
      if (resp?.result){
        toast.success(`Changement de prénom avec succes !`);
      } else {
        toast.error(`Oops une erreur lors de la modification: ${resp?.message}`)
      }
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditNom(false);
    reset();
  };
  // Edit prénom logic:
  ////////////////////////////////
  const [editPrenom, setEditPrenom] = useState(false);
  const handleDoubleClickNewPrenom = (e) => {
    e.stopPropagation();
    setEditPrenom(!editPrenom);
    reset();
  };
  const handleSubmitNewPrenom = async (data) => {
    data.Id_customer = auth?.data?.Id_customer;
    // console.log(data);
    try {
      const resp = await updateCustomer(data);
      console.log(resp);
      if (resp?.result){
        toast.success(`Changement de prénom avec succes !`);
      } else {
        toast.error(`Oops une erreur lors de la modification: ${resp?.message}`)
      }
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditPrenom(false);
    reset();
  };
  // Edit pseudo logic:
  ////////////////////////////////
  const [editPseudo, setEditPseudo] = useState(false);
  const handleDoubleClickNewPseudo = (e) => {
    e.stopPropagation();
    setEditPseudo(!editPseudo);
    reset();
  };
  const handleSubmitNewPseudo = async (data) => {
    data.Id_customer = auth?.data?.Id_customer;
    console.log(data);
    try {
      const resp = await updateCustomer(data);
      console.log("yo allo la resp est:",resp);  
      if (resp?.data?.result){
        console.log("yo c'est ok ici")
        setAuthCookie(resp?.accessToken ?? null, {
          "max-age": `${60 * 60 * 24 * 10}`,
        });
        const resp2 = await fetcher.get("auth");
        console.log(resp2)
        setAuth(resp2);
        toast.success(`Changement de pseudo avec succes !`);
      } else {
        toast.error(`Oops une erreur lors de la modification: ${resp?.message}`)
      }
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditPseudo(false);
    reset();
  };

  // Edit password logic:
  ////////////////////////////////
  const [editPassword, setEditPassword] = useState(false);
  const handleDoubleClickNewPassword = (e) => {
    e.stopPropagation();
    setEditPassword(!editPassword);
    reset();
  };
  const handleSubmitNewPassword = async (email) => {
    try {
      const emailObject = { email };
      const resp = await toast.promise(fetcher.post("reset", emailObject), {
        pending: "Préparation de l'e-mail...",
        error: {
          message: "Erreur lors de l'envoi",
        },
      });
      toast.success(
        `Envoi d'un e-mail à votre adresse : ${resp.data.accepted} ; vérifiez votre boite mail ! Vous avez 10 minutes pour ré-initialiser votre mot de passe.`
      );
      setEditPassword(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(`Oops, error: ${error.message}`);
    }
  };

  // Edit email logic:
  ////////////////////////////////
  const [editEmail, setEditEmail] = useState(false);
  const handleDoubleClickNewEmail = (e) => {
    e.stopPropagation();
    setEditEmail(!editEmail);
    reset();
  };
  const handleSubmitNewEmail = async (data) => {
    data.Id_customer = auth?.data?.Id_customer;
    // console.log(data);
    try {
      const resp = await updateCustomer(data);
      console.log(resp);
      if (resp?.result){
        toast.success(`Changement de prénom avec succes !`);
      } else {
        toast.error(`Oops une erreur lors de la modification: ${resp?.message}`)
      }
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditEmail(false);
    reset();
  };

  if (currentUserIsLoading) {
    return (
      <STYLEDContainer>
        <>
          <Loader />
        </>
      </STYLEDContainer>
    );
  }

  return (
    <STYLEDContainer>
      <>
        <STYLEDContainerBox>
          <DIV_InformationUserContainer>
            <table>
              <thead>
                <tr>
                  <th>Vos informations:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nom:</td>
                  <td onDoubleClick={handleDoubleClickNewNom}>
                    {!editNom ? (
                      currentUser?.data?.lastname ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewNom)}>
                          <STYLEDInput
                            width={"80%"}
                            defaultValue={currentUser?.data?.lastname}
                            placeholder="Saisir le nouveau nom"
                            type="text"
                            name="lastname"
                            {...register("lastname", {
                              required: "Saisir un nouveau nom !",
                              validate: {
                                checkLength: (value) => value.length <= 255,
                                onlyLetters: (value) =>
                                  /^[A-Za-z]+$/.test(value),
                              },
                            })}
                          ></STYLEDInput>
                          <STYLEDButton width="12%" type="submit">
                            ✓
                          </STYLEDButton>
                        </form>
                      </>
                    )}
                  </td>
                  <td>
                    <STYLEDButton onClick={handleDoubleClickNewNom}>
                      Edit
                    </STYLEDButton>
                  </td>
                </tr>
                <tr>
                  <td>Prénom:</td>
                  <td onDoubleClick={handleDoubleClickNewPrenom}>
                    {!editPrenom ? (
                      currentUser?.data?.firstname ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewPrenom)}>
                          <STYLEDInput
                            width={"80%"}
                            defaultValue={currentUser?.data?.firstname}
                            placeholder="Saisir le nouveau prénom"
                            type="text"
                            name="firstname"
                            {...register("firstname", {
                              required: "Saisir un nouveau prénom !",
                              validate: {
                                checkLength: (value) => value.length <= 255,
                                onlyLetters: (value) =>
                                  /^[A-Za-z]+$/.test(value),
                              },
                            })}
                          ></STYLEDInput>
                          <STYLEDButton width="12%" type="submit">
                            ✓
                          </STYLEDButton>
                        </form>
                      </>
                    )}
                  </td>
                  <td>
                    <STYLEDButton onClick={handleDoubleClickNewPrenom}>
                      Edit
                    </STYLEDButton>
                  </td>
                </tr>
                <tr>
                  <td>Pseudo:</td>
                  <td onDoubleClick={handleDoubleClickNewPseudo}>
                    {!editPseudo ? (
                      currentUser?.data?.pseudo ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewPseudo)}>
                          <STYLEDInput
                            width={"80%"}
                            defaultValue={currentUser?.data?.pseudo}
                            placeholder="Saisir le nouveau pseudo"
                            type="text"
                            name="pseudo"
                            {...register("pseudo", {
                              required: "Saisir un nouveau pseudo !",
                              validate: {
                                checkLength: (value) => value.length <= 255,
                              },
                            })}
                          ></STYLEDInput>
                          <STYLEDButton width="12%" type="submit">
                            ✓
                          </STYLEDButton>
                        </form>
                      </>
                    )}
                  </td>
                  <td>
                    <STYLEDButton onClick={handleDoubleClickNewPseudo}>
                      Edit
                    </STYLEDButton>
                  </td>
                </tr>
                <tr>
                  <td>Mot de passe:</td>
                  <td onDoubleClick={handleDoubleClickNewPassword}>
                    {!editPassword ? (
                      "******"
                    ) : (
                      <>
                        <form
                          onSubmit={handleSubmit(() =>
                            handleSubmitNewPassword(currentUser?.data?.email)
                          )}
                        >
                          <STYLEDInput
                            readOnly={true}
                            width={"80%"}
                            defaultValue={"Mail de récupération?"}
                          ></STYLEDInput>

                          <STYLEDButton width="12%" type="submit">
                            ✓
                          </STYLEDButton>
                        </form>
                      </>
                    )}
                  </td>
                  <td>
                    <STYLEDButton onClick={handleDoubleClickNewPassword}>
                      Edit
                    </STYLEDButton>
                  </td>
                </tr>

                <tr>
                  <td>Email:</td>
                  <td>
                    {!editEmail ? (
                      currentUser?.data?.email ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewEmail)}>
                          <STYLEDInput
                            width={"80%"}
                            defaultValue={currentUser?.data?.email}
                            placeholder="Saisir le nouvel email"
                            type="email"
                            name="email"
                            {...register("email", {
                              required: "Saisir un nouvel email !",
                              validate: {
                                checkLength: (value) => value.length <= 255,
                              },
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: "Saisir une adresse email valide !",
                              },
                            })}
                          ></STYLEDInput>
                          <STYLEDButton width="12%" type="submit">
                            ✓
                          </STYLEDButton>
                        </form>
                      </>
                    )}
                  </td>
                  <td>
                    <STYLEDButton
                      onClick={handleDoubleClickNewEmail}
                      disabled={auth?.data?.role !== "Administrateur"}
                    >
                      Edit
                    </STYLEDButton>
                  </td>
                </tr>
                <tr>
                  <td>Type de compte:</td>
                  <td> {auth?.data?.role ?? "-------------------"}</td>
                </tr>
                <tr>
                  <td>Compte crée:</td>
                  <td>
                    {new Date(currentUser?.data?.createdAt).toLocaleString() ??
                      "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Compte crée par:</td>
                  <td>
                    {currentUser?.data?.createdBy ?? "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Dernière modification:</td>
                  <td>
                    {new Date(currentUser?.data?.modifiedAt).toLocaleString() ??
                      "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Dernière modification:</td>
                  <td>

                    {currentUser?.data?.modifiedBy ?? "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Dernière connection:</td>
                  <td>
                    {new Date(
                      currentUser?.data?.last_connection
                    ).toLocaleString() ?? "-------------------"}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* ALL ERRORS here : */}
            {/* lastname : */}
            {errors.lastname?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Maximum 255 signes pour le nom svp !
              </STYLEDErrorMessage>
            )}
            {errors.lastname?.type === "onlyLetters" && (
              <STYLEDErrorMessage>
                Que des lettres pour le nom svp !
              </STYLEDErrorMessage>
            )}
            {/* firstname : */}
            {errors.firstname?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Maximum 255 signes pour le prénom svp !
              </STYLEDErrorMessage>
            )}
            {errors.firstname?.type === "onlyLetters" && (
              <STYLEDErrorMessage>
                Que des lettres pour le prénom svp !
              </STYLEDErrorMessage>
            )}
            {/* pseudo : */}
            {errors.pseudo?.type === "checkLength" && (
              <STYLEDErrorMessage>
                Maximum 255 signes pour le prénom svp !
              </STYLEDErrorMessage>
            )}
            {/* email : */}
            {errors?.email?.type === "pattern" && (
              <STYLEDErrorMessage>Adresse mail invalide.</STYLEDErrorMessage>
            )}
          </DIV_InformationUserContainer>
        </STYLEDContainerBox>
      </>
    </STYLEDContainer>
  );
}

export default UserInformations;

const DIV_InformationUserContainer = styled.div`
  font-size: clamp(0.5rem, 3vw, 1.5rem);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
