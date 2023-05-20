import React, { useState } from "react";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";
import styled, { keyframes } from "styled-components";
import fetcher from "../../helper/fetcher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "./Avatar";

function AvatarUpload({ Id_customer }) {
  console.log(Id_customer);

  //UPLOAD Logic :
  const [selectedFile, setSelectedFile] = useState(null);
  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }
  async function handleSubmit(event) {
    // event.preventDefault();
    if (!selectedFile) {
      setTimeout(() => {
        toast.error("Aucun fichier selectionné.");
      }, 2000);
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    try {
      const response = await fetcher.post(
        `avatar/upload/${Id_customer}`,
        formData
      );
      toast.success(`Ajout de votre avatar avec succès !`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("erreur dans le handleSubmit:", error);
    }
  }

  return (
    <>
      {/* encType for including the necessary file acceptance headers */}
      Avatar actuel : <Avatar Id_customer={Id_customer} />
      <STYLEDForm onSubmit={handleSubmit} encType="multipart/form-data">
        <STYLEDInput type="file" onChange={handleFileInputChange} />
        <STYLEDButton type="submit">Choisir avatar</STYLEDButton>
      </STYLEDForm>
      {selectedFile && (
        <STYLEDImgPreview
          src={URL.createObjectURL(selectedFile)}
          alt="Image à envoyer"
        />
      )}
    </>
  );
}

export default AvatarUpload;

const STYLEDImgPreview = styled.img`
  max-width: 300px;
  height: auto;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(360deg);
  }
`;

export const STYLEDForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  animation: ${rotateAnimation} 0.5s linear;
  width: 100%;
`;
