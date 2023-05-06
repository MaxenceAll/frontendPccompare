import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetcher from '../../../helper/fetcher';
import Loader from '../../Tools/Loader';
import axios from 'axios';
import { useUpdateCustomerMutation } from '../../../features/pccompareSlice';

function Image({ userId, filename }) {

  // console.log(userId);
  // console.log(filename)
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(imageData)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `http://localhost:5050/uploads/${userId}/${filename}`;
        const options = {
          withCredentials: true,
          responseType: "arraybuffer"
        };
        const response = await axios.get(url, options);        // const response = await fetcher.get(`uploads/${userId}/${filename}`,{ responseType: "arraybuffer" });
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



  const handleDelete = async (userId, filename) => {
    setIsLoading(true);
    try {
      await fetcher.delete(`uploads/${userId}/${filename}`);
      consolelog(`Successfully deleted file ${filename}`);
      setImageData(null);
    } catch (error) {
      console.error(`Error deleting file ${filename}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageContainer>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <img src={imageData} alt={filename} crossOrigin="anonymous"/>
          <div className="delete-btn" onClick={() => handleDelete(userId, filename)}>
            X
          </div>
        </>
      )}
    </ImageContainer>
  );
}

export default Image;

const ImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin: 4px;
  border: 1px solid var(--main-color);
  border-radius: 15%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  &:hover img {
    transform: scale(1.2);
  }

  .delete-btn {
    position: absolute;
    color: red;
    bottom: 5px;
    right: 5px;
    display: none;
    cursor: pointer;
  }

  .delete-btn::before {
    content: "Supprimer";
  }

  &:hover .delete-btn {
    display: block;
  }
`;
