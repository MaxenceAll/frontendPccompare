import React, { useState, useEffect } from "react";
import Image from "./Image/Image";
import axios from "axios";
import fetcher from "../../helper/fetcher";
import Loader from "../Tools/Loader";

function ImageGallery_list({ userId }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetcher.get(`uploads/${userId}`);
        console.log("la résponse est :", response);
        setImages(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [userId]);

  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {!isLoading && (
        <div>
          {images.map((filename) => (
            <Image key={filename} userId={userId} filename={filename} />
          ))}
        </div>
      )}
    </>
  );
}

export default ImageGallery_list;
