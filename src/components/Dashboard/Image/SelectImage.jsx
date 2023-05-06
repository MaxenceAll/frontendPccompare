import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components'

import { v4 as uuidv4 } from 'uuid';
import Image from "./Image";
import { STYLEDButton } from "../../styles/genericButton";
import fetcher from "../../../helper/fetcher";

function SelectImage({ userId , onSelectImage }) {
  const [images, setImages] = useState([]);

  const handleSelect = (filename) => {
    onSelectImage(filename);
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetcher.get(`uploads/${userId}`);
        console.log(response)
        setImages(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, [userId]);

  return (
    <>
      <div>
        {images.map((filename) => (
          <div key={uuidv4()}>
            <Image userId={userId} filename={filename} />
            <STYLEDButton onClick={() => handleSelect(filename)}>Choisir</STYLEDButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectImage;

const STYLEDChooseImageContainer = styled.div`
display: flex;

`