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
import UserInformations from "../../components/Dashboard/UserInformations";
import { useGetCurrentCustomerQuery } from "../../features/pccompareSlice";
import ImageGallery from "../../components/Dashboard/ImageGallery";
import CarouselBrowser2 from "../../components/Dashboard/CarouselBrowser2";
import CarouselBrowser from "../../components/Dashboard/CarouselBrowser";
import useCookie from "../../Hooks/useCookie";

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // console.log("authCookie:", authCookie);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de gestion | ${display}`;
  }, []);

  // get current customer info (based on auth token):
  let currentUserQuery = useGetCurrentCustomerQuery(
    auth?.data?.customer?.Id_customer
  );
  const {
    data: currentUser,
    error: currentUserError,
    isError: currentUserIsError,
    isLoading: currentUserIsLoading,
    isSuccess: currentUserIsSuccess,
  } = currentUserQuery;

  // console.log(currentUser);

  // Disconnect logic:
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };
  async function handleDisconnect(e) {
    try {
      const response = await fetcher.post("/login/logout");
      console.log(response);
      // Remove the access token cookie
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuth(null);
      setAuthCookie(null);
      setIsModalOpenDisconnect(false);
      toast.info(`Deconnexion avec succes.`);
      setDisplay("login");
    } catch (error) {
      console.error("Oops une erreur apparait :", error);
    }
  }

  const [display, setDisplay] = useState("Vos informations");

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
    <>
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
      <STYLEDContainer>
        <div>
          Bonjour, {currentUser?.data?.customer?.firstname}({currentUser?.data?.customer?.pseudo})
          {currentUser?.data?.customer?.lastname}, bienvenue sur votre page de gestion :
        </div>
        <STYLEDButton width="50%" onClick={openDisconnectModal}>
          Se déconnecter.
        </STYLEDButton>

        <hr style={{ width: "80%" }} />

        <STYLEDOptionsButtons>
          <STYLEDButton
            onClick={() => setDisplay("Vos informations")}
            className={display === "Vos informations" ? "active" : ""}
          >
            Vos informations
          </STYLEDButton>
          {auth?.data?.role === "Administrateur" ? (
            <STYLEDButton
              onClick={() => setDisplay("Gérer les utilisateurs")}
              className={display === "Gérer les utilisateurs" ? "active" : ""}
            >
              Gérer les utilisateurs
            </STYLEDButton>
          ) : null}
          {auth?.data?.role === "Administrateur" ? (
            <STYLEDButton
              onClick={() => setDisplay("Gérer le carousel")}
              className={display === "Gérer le carousel" ? "active" : ""}
            >
              Gérer le carousel
            </STYLEDButton>
          ) : null}
          <STYLEDButton
            onClick={() => setDisplay("Mes favoris")}
            className={display === "Mes favoris" ? "active" : ""}
          >
            Mes favoris
          </STYLEDButton>
          <STYLEDButton
            onClick={() => setDisplay("Mes commentaires")}
            className={display === "Mes commentaires" ? "active" : ""}
          >
            Mes commentaires
          </STYLEDButton>
          <STYLEDButton
            onClick={() => setDisplay("Ma gallerie")}
            className={display === "Ma gallerie" ? "active" : ""}
          >
            Ma gallerie
          </STYLEDButton>
        </STYLEDOptionsButtons>

        <hr style={{ width: "80%" }} />
      </STYLEDContainer>

      {display === "Vos informations" ? <UserInformations /> : null}
      {display === "Gérer les utilisateurs" ? (
        auth?.data?.role === "Administrateur" ? (
          <UserBrowser />
        ) : null
      ) : null}
      {display === "Gérer le carousel" ? (
        auth?.data?.role === "Administrateur" ? (
          <CarouselBrowser2 />
        ) : null
      ) : null}
      {display === "Ma gallerie" ? <ImageGallery /> : null}
    </>
  );
}

export default Dashboard;

const STYLEDOptionsButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  .active {
    background-color: var(--background-color-300);
    color: var(--main-color-300);
    margin: 0 10px;
    transform: translateY(-3px);
    box-shadow: 0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;
