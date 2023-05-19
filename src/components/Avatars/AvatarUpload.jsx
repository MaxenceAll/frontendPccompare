import React, { useState } from "react";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";
import styled, { keyframes } from "styled-components";
import fetcher from "../../helper/fetcher";

function AvatarUpload({Id_customer}) {

    console.log(Id_customer)

  //UPLOAD Logic :
  const [selectedFile, setSelectedFile] = useState(null);
  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }
  async function handleSubmit(event) {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    // console.log(formData);
    try {
      const response = await fetcher.post(
        `avatar/upload/${Id_customer}`,
        formData
      );
    
    //   console.log(response);
    } catch (error) {
      console.error("erreur dans le handleSubmit:", error);
    }
  }
  return (
    <>
      {/* encType for including the necessary file acceptance headers */}
      <STYLEDForm onSubmit={handleSubmit} encType="multipart/form-data">
        <STYLEDInput type="file" onChange={handleFileInputChange} />
        <STYLEDButton type="submit">Upload</STYLEDButton>
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
`;
