import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../components/styles/genericContainer";
import { STYLEDhr } from "../../components/styles/genericHR";
import { STYLEDButton } from "../../components/styles/genericButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { STYLEDInput } from "../../components/styles/genericInput";
import { STYLEDErrorMessage } from "../../components/styles/genericParagraphError";
import fetcher from "../../helper/fetcher";
import Loader from "../../components/Tools/Loader";
import GenericModal from "../../components/Tools/GenericModal";
import UserBrowser from "../../components/Dashboard/UserBrowser";

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  // set title logic:
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} | Page de gestion`;
  }, []);

  //Mini form pour modify logic:
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  // Edit nom logic:
  ////////////////////////////////
  const [editNom, setEditNom] = useState(false);
  // le slice/mutation pour edit le nom HERE
  const handleDoubleClickNewNom = (e) => {
    e.stopPropagation();
    setEditNom(!editNom);
    reset();
  };
  const handleSubmitNewNom = (data) => {
    // console.log(data);
    // requete pour changer le nom
    try {
      toast.success(`Changement de nom avec succes !`);
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditNom(false);
    reset();
  };
  // Edit prénom logic:
  ////////////////////////////////
  const [editPrenom, setEditPrenom] = useState(false);
  // le slice/mutation pour edit le prenom HERE
  const handleDoubleClickNewPrenom = (e) => {
    e.stopPropagation();
    setEditPrenom(!editPrenom);
    reset();
  };
  const handleSubmitNewPrenom = (data) => {
    // console.log(data);
    // requete pour changer le prenom
    try {
      toast.success(`Changement de prénom avec succes !`);
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditPrenom(false);
    reset();
  };
  // Edit pseudo logic:
  ////////////////////////////////
  const [editPseudo, setEditPseudo] = useState(false);
  // le slice/mutation pour edit le prenom HERE
  const handleDoubleClickNewPseudo = (e) => {
    e.stopPropagation();
    setEditPseudo(!editPseudo);
    reset();
  };
  const handleSubmitNewPseudo = (data) => {
    // console.log(data);
    // requete pour changer le prenom
    try {
      toast.success(`Changement de pseudo avec succes !`);
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
  // le slice/mutation pour edit le email HERE
  const handleDoubleClickNewEmail = (e) => {
    e.stopPropagation();
    setEditEmail(!editEmail);
    reset();
  };
  const handleSubmitNewEmail = (data) => {
    // console.log(data);
    // requete pour changer le prenom
    try {
      toast.success(`Changement d'e-mail' avec succes !`);
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditEmail(false);
    reset();
  };

  // Disconnect logic:
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };

  return (
    <STYLEDContainer>
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

      <STYLEDContainerBox>
        <div>
          Bonjour, {auth?.data?.firstname} {auth?.data?.lastname}, bienvenue sur
          votre page de gestion :
        </div>
        <STYLEDButton width="100%" onClick={openDisconnectModal}>
          Se déconnecter.
        </STYLEDButton>
        <STYLEDhr />
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
                      auth?.data?.lastname ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewNom)}>
                          <STYLEDInput
                            defaultValue={auth?.data?.lastname}
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
                      auth?.data?.firstname ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewPrenom)}>
                          <STYLEDInput
                            defaultValue={auth?.data?.firstname}
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
                      auth?.data?.pseudo ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewPseudo)}>
                          <STYLEDInput
                            defaultValue={auth?.data?.pseudo}
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
                            handleSubmitNewPassword(auth?.data?.email)
                          )}
                        >
                          <STYLEDInput
                            readOnly={true}
                            defaultValue={auth?.data?.email}
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
                      auth?.data?.email ?? "-------------------"
                    ) : (
                      <>
                        <form onSubmit={handleSubmit(handleSubmitNewEmail)}>
                          <STYLEDInput
                            defaultValue={auth?.data?.email}
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
                  <td>Compte crée depuis:</td>
                  <td>
                    {new Date(auth?.data?.createdAt).toLocaleString() ??
                      "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Compte crée par:</td>
                  <td> {auth?.data?.createdBy ?? "-------------------"}</td>
                </tr>
                <tr>
                  <td>Dernière modification :</td>
                  <td>
                    {new Date(auth?.data?.modifiedAt).toLocaleString() ??
                      "-------------------"}
                  </td>
                </tr>
                <tr>
                  <td>Dernière modification :</td>
                  <td> {auth?.data?.modifiedBy ?? "-------------------"}</td>
                </tr>
                <tr>
                  <td>Dernière connection :</td>
                  <td>
                    {new Date(auth?.data?.last_connection).toLocaleString() ??
                      "-------------------"}
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
      </STYLEDContainerBox>
      {auth?.data?.role === "Administrateur" ? (
        <STYLEDContainer>
          <STYLEDContainerBox>
            <DIV_UserBrowserForAdmins>
              <UserBrowser />
            </DIV_UserBrowserForAdmins>
          </STYLEDContainerBox>
        </STYLEDContainer>
      ) : null}
    </STYLEDContainer>
  );
}

export default Dashboard;

const DIV_InformationUserContainer = styled.div`
 font-size: clamp(0.5rem, 3vw, 1.5rem);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  div {
    
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const DIV_UserBrowserForAdmins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
