import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../Tools/Loader';
import axios from 'axios';

function AvatarImage({ userId, filename }) {
    
  if (!filename) {
    return null;
  }

//   console.log(userId);
//   console.log(filename)
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(imageData)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `http://localhost:5050/uploads/${userId}/${filename}`;
        const options = {
          withCredentials: true,
          responseType: "arraybuffer"
        };
        const response = await axios.get(url, options);
        // console.log(response)
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        setImageData(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [filename, userId]);

  if (!imageData) {
    return null;
  }



  return (
    <ImageContainer>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <img src={imageData} alt={filename} crossOrigin="anonymous"/>
        </>
      )}
    </ImageContainer>
  );
}

export default AvatarImage;

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
