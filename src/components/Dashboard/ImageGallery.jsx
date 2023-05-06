import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";
import GenericModal from "../Tools/GenericModal";
import { AuthContext } from "../../Contexts/AuthContext";
import ImageGallery_list from "./ImageGallery_list";
import fetcher from "../../helper/fetcher";
import config from "../../../config";
import SelectImage from "./Image/SelectImage";
import Image from "./Image/Image";
import { toast } from "react-toastify";
import { useUpdateCustomerMutation } from "../../features/pccompareSlice";
import AvatarImage from "../Header/AvatarImage";

function ImageGallery() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  // pour le re-render after submit
  const [key, setKey] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(formData);

    try {
      const response = await fetcher.post("uploads", formData);
      console.log(response);
      // console.log(response.data);
      setKey(key + 1);
    } catch (error) {
      console.error("erreur dans le handleSubmit:", error);
    }
  }

  // tests logic :
  // redux slice pour la query update
  const [updateCustomer, { updateCustomerIsLoading }] =
    useUpdateCustomerMutation();
  const [isModalNewImage, setIsModalNewImage] = useState(false);
  const handleChooseImage = (e) => {
    setIsModalNewImage(true);
  };
  const handleSelectImage = async (filename) => {
    console.log("filename caught:", filename);
    let data = {};
    data.Id_customer = auth?.data?.customer?.Id_customer;
    data.img_src = filename;
    console.log(data);
    try {
      //update en db l'img_src
      const response = await updateCustomer(data);
      console.log(response);
      toast.success(`Changement d'avatar avec succès.`);
    } catch (error) {
      toast.error(`Oops une erreur : ${error}`);
    }
    setIsModalNewImage(false);
  };
  const handeDeleteAvatar = async () => {
    let data = {};
    data.Id_customer = auth?.data?.customer?.Id_customer;
    data.img_src = '';
    console.log(data);
    try {
      //delete en db l'img_src
      const response = await updateCustomer(data);
      console.log(response);
      toast.success(`Suppression d'avatar avec succès.`);
    } catch (error) {
      toast.error(`Oops une erreur : ${error}`);
    }
  };

  return (
    <>
      <STYLEDContainer>
        <STYLEDContainer>
          <STYLEDContainerBox>
            Ici vous pouvez ajouter des images afin de les utiliser en
            commentaire ou en photo de profil !
            {/* encType pour include les headers acceptation de fichier */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <STYLEDInput type="file" onChange={handleFileInputChange} />
              <STYLEDButton type="submit">Uploader</STYLEDButton>
            </form>
            {selectedFile && (
              <>
                <STYLEDImgPreview
                  src={URL.createObjectURL(selectedFile)}
                  alt="Image Uploadée"
                />
              </>
            )}
          </STYLEDContainerBox>
        </STYLEDContainer>

        <STYLEDContainer>
          <STYLEDContainerBox>
            Votre bibliothèque :
            <ImageGallery_list
              userId={auth?.data?.customer?.Id_customer}
              key={key}
            />
          </STYLEDContainerBox>
        </STYLEDContainer>

        <GenericModal
          ariaLabelMessage="Modal d'ajout d'image."
          isOpen={isModalNewImage}
          onClose={() => setIsModalNewImage(false)}
        >
          <SelectImage
            userId={auth?.data?.customer?.Id_customer}
            onSelectImage={handleSelectImage}
          />
        </GenericModal>

        <STYLEDContainer>
          <STYLEDContainerBox>
            <Container>
              Choisissez votre avatar :
              {auth?.data?.customer?.img_src ? (
                <>
                  <AvatarImage
                    userId={auth?.data?.customer?.Id_customer}
                    filename={auth?.data?.customer?.img_src}
                  />
                  <STYLEDButton
                  onClick={handeDeleteAvatar}
                  >Supprimer ma photo</STYLEDButton>
                </>
              ) : (
                <STYLEDButton
                  width="100%"
                  height="100%"
                  onClick={handleChooseImage}
                >
                  Choisir une image
                </STYLEDButton>
              )}
            </Container>
          </STYLEDContainerBox>
        </STYLEDContainer>
      </STYLEDContainer>
    </>
  );
}

export default ImageGallery;

const STYLEDImgPreview = styled.img`
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

