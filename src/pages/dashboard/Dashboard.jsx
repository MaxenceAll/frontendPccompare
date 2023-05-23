import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDContainer } from "../../components/styles/genericContainer";
import { STYLEDButton } from "../../components/styles/genericButton";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Loader from "../../components/Tools/Loader";
import GenericModal from "../../components/Tools/GenericModal";
import UserBrowser from "../../components/Dashboard/UserBrowser";
import UserInformations from "../../components/Dashboard/UserInformations";
import { useGetCurrentCustomerQuery } from "../../features/pccompareSlice";
import CarouselBrowser2 from "../../components/Dashboard/CarouselBrowser2";
import useCookie from "../../Hooks/useCookie";
import UserFavorite from "../../components/Dashboard/UserFavorite";
import { useDisconnect } from "../../Hooks/useDisconnect";
import UserComments from "../../components/Dashboard/UserComments";
import { BiLogOut } from "react-icons/bi";

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);

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

  // Disconnect logic:
  const [disconnect, isDisconnecting] = useDisconnect();
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };

  // State du choix par button
  const [display, setDisplay] = useState("Vos informations");

  if (currentUserIsLoading) {
    return (
      <STYLEDContainer>
        <Loader />
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
        <STYLEDModalDisconnect>
          <h1><BiLogOut /></h1>
          <label>Voulez-vous vraiment vous déconnecter ?</label>
          <STYLEDButton onClick={() => disconnect()} width="40%" type="button">
            Oui
          </STYLEDButton>
          <STYLEDButton
            width="40%"
            type="button"
            onClick={() => setIsModalOpenDisconnect(false)}
          >
            Non
          </STYLEDButton>
        </STYLEDModalDisconnect>
      </GenericModal>
      <STYLEDContainer>
        <div>
          Bonjour, {currentUser?.data?.customer?.firstname}(
          {currentUser?.data?.customer?.pseudo})
          {currentUser?.data?.customer?.lastname}, bienvenue sur votre page de
          gestion :
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
          // <CarouselDetails />
        ) : null
      ) : null}
      {display === "Mes favoris" ? (
        <UserFavorite currentUser={currentUser?.data?.customer?.Id_customer} />
      ) : null}
      {display === "Mes commentaires" ? <UserComments /> : null}
    </>
  );
}

export default Dashboard;

const STYLEDOptionsButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  .active {
    background-color: var(--background-color-300);
    color: var(--main-color-300);
    margin: 0 10px;
    transform: translateY(-3px);
    box-shadow: 0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

const STYLEDModalDisconnect = styled.div`
display: flex;
justify-content: center;
align-items:center;
flex-direction:column;
text-align:center;
  h1{
    font-size: 5rem;
  }
  label{
    padding-bottom: 2rem;
  }
`