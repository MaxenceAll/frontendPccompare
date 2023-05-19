import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../config";
import Loader from "../Tools/Loader";
import axios from "axios";

function Avatar({ Id_customer }) {
    
  if (!Id_customer) {
    return null;
  }

  //DOWNLOAD Logic :
  const [avatarURL, setAvatarURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const url = `${config.api.url}avatar/download/${Id_customer}`;
        const options = {
          withCredentials: true,
          responseType: "blob",
        };
        const response = await axios.get(url, options);
        // console.log(response)
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        setAvatarURL(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error in handleDownload:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [Id_customer]);

  if (!avatarURL) {
    return null;
  }

  return (
    <ImageContainer>
      {isLoading && <Loader />}
      {!isLoading && (<img src={avatarURL} alt="Avatar" crossOrigin="anonymous" />)}
    </ImageContainer>
  );
}

export default Avatar;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  &:hover img {
    transform: scale(1.2);
  }
`;
