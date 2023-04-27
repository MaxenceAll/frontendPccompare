import React, { useContext } from "react";
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

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <div>
          Bonjour, {auth?.data?.firstname} {auth?.data?.lastname}, bienvenue sur
          votre page de gestion :
        </div>
        <STYLEDhr />
        <STYLEDContainerBox>
          Vos informations :
          <DIV_InformationUserContainer>
            <div>
              Nom: <span>{auth?.data?.lastname}</span>
            </div>
            <div>Prénom: {auth?.data?.firstname}</div>
            <div>Pseudo: {auth?.data?.pseudo}</div>
            <div>Mot de passe: XXXXXXXXXX</div>
            <div>Email: {auth?.data?.email}</div>
            <div>Type: {auth?.data?.role}</div>
            <div>Compte crée depuis: {auth?.data?.createdAt}</div>
            <div>Compte crée par: {auth?.data?.createdBy}</div>
            <div>Dernière modification depuis: {auth?.data?.modifiedAt}</div>
            <div>Dernière modification par: {auth?.data?.modifiedBy}</div>
            <div>Dernière connection le: {auth?.data?.last_connection}</div>
          </DIV_InformationUserContainer>
        </STYLEDContainerBox>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default Dashboard;

const DIV_InformationUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
