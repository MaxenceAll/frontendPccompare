import React, { useState } from "react";
import { STYLEDContainer, STYLEDContainerBox } from "../components/styles/genericContainer";
import { STYLEDInput } from "../components/styles/genericInput";
import { STYLEDButton } from "../components/styles/genericButton";
import styled from "styled-components";
import fetcher from "../helper/fetcher";
import axios from "axios";
import config from "../../config";

function Test() {
  const Id_customer = "6";

  //UPLOAD Logic :
  const [selectedFile, setSelectedFile] = useState(null);
  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    // console.log(formData);
    try {
      const response = await fetcher.post(`avatar/upload/${Id_customer}`, formData);
      // console.log(response);
    } catch (error) {
      console.error("erreur dans le handleSubmit:", error);
    }
  }
  //DOWNLOAD Logic :
  const [avatarURL, setAvatarURL] = useState(null);
  async function handleDownload() {

    //TODO THIS FUCKING DOESNT WORK NO FUCKING IDEA WHY :
    // try {
    //   const response = await fetcher.get(`avatar/download/${Id_customer}`, { responseType: 'blob' });
    //   // console.log(response)
    //   // console.log(response.headers);
    //   const blob = new Blob([response.data], { type: response.headers["content-type"] });
    //   console.log(blob)
    //   setAvatarURL(URL.createObjectURL(blob));
    // } catch (error) {
    //   console.error("Error in handleDownload:", error);
    // }
    try {
      const url = `${config.api.url}avatar/download/${Id_customer}`;
      const options = {
        withCredentials: true,
        responseType: "blob"
      };
      const response = await axios.get(url, options);
      // console.log(response)
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      setAvatarURL(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error in handleDownload:", error);
    }
  }

  return (
    <>
      <STYLEDContainer>
        <STYLEDContainerBox>
          {/* encType for including the necessary file acceptance headers */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <STYLEDInput type="file" onChange={handleFileInputChange} />
            <STYLEDButton type="submit">Upload</STYLEDButton>
          </form>
          {selectedFile && (
            <>
              <STYLEDImgPreview src={URL.createObjectURL(selectedFile)} alt="Uploaded Image" />
            </>
          )}
        </STYLEDContainerBox>

          <STYLEDContainerBox>
            <STYLEDButton onClick={handleDownload}>Download Avatar</STYLEDButton>
            {avatarURL && <STYLEDImgPreview src={avatarURL} alt="Downloaded Avatar" />}
          </STYLEDContainerBox>

      </STYLEDContainer>
    </>
  );
}

export default Test;

const STYLEDImgPreview = styled.img`
  width: 300px;
`;