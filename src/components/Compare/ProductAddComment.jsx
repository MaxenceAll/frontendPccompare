import React, { useState } from "react";
import styled from "styled-components";
import { DateDuJour } from "../../components/Tools/DateDuJour";
import { STYLEDButton } from "../../components/styles/genericButton";
import Avatar from "../Avatars/Avatar";
import RatingSelector from "./ProductRatingSelector";
import { useAddCommentMutation } from "../../features/pccompareSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import Loader from "../Tools/Loader";

function ProductAddComment({
  customer,
  Id_article,
  setIsModalOpenComment,
  role,
}) {
  // console.log(role);
  if (!customer) {
    return (
      <CommentNeedConnect>
        Il faut s'identifier pour commenter !
        <NavLink to={"../../login"}>
          <STYLEDButton>Se connecter</STYLEDButton>
        </NavLink>
      </CommentNeedConnect>
    );
  }
  if (role === "Banni") {
    <CommentBanned>
      <STYLEDErrorMessage>
        Vous n'avez plus le droit de faire de commentaire !
      </STYLEDErrorMessage>
    </CommentBanned>;
  }

  const [addComment, { isLoading: addCommentIsLoading }] =
    useAddCommentMutation();
  const [note, setNote] = useState(5);
  const [content, setContent] = useState("");

  const handlePublish = async () => {
    try {
      if (addCommentIsLoading) {
        return <Loader />;
      }
      if (!content) {
        toast.error("Contenu vide, ajoutez votre commentaire !");
        return;
      }
      const resp = await addComment({
        Id_customer: customer?.Id_customer,
        Id_article,
        note,
        content,
      });
      if (resp?.data?.result) {
        toast.success("Commentaire ajouté avec succès!");
      } else if (resp?.error?.data?.isBanned) {
        toast.error("Vous n'avez plus le droit d'ajouter des commentaires !");
      } else {
        toast.error(
          "Erreur lors de l'ajout' de votre commentaire, réessayez !"
        );
      }
      setIsModalOpenComment(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      toast.error(
        "Erreur lors de la publication de votre commentaire, ressayez !"
      );
    }
  };

  const handleTextareaChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <CommentContainer>
      <CommentCreator>
        <Avatar Id_customer={customer?.Id_customer} />
        &nbsp;
        {customer?.pseudo}
        &nbsp;
      </CommentCreator>

      <CommentRating>
        <div>
          <i> Votre note:</i> &nbsp;
          <RatingSelector note={note} setNote={setNote} />
        </div>
      </CommentRating>

      <CommentSeparator />
      <CommentContent>
        <textarea
          name="text"
          placeholder="Ajoutez votre commentaire ici"
          onChange={handleTextareaChange}
        ></textarea>
      </CommentContent>
      <STYLEDButton width={"100%"} onClick={handlePublish}>
        Publier
      </STYLEDButton>
      <CommentSeparator />

      <CommentDate>
        Posté le : &nbsp;
        <DateDuJour />
      </CommentDate>
    </CommentContainer>
  );
}

export default ProductAddComment;

const CommentContainer = styled.div`
  background-color: var(--background-color-200);
  border: 1px solid var(--secondary-color-200);
  border-radius: 15px;
  padding: 2%;
  margin-bottom: 10px;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.5),
    inset 20px 20px 15px 0px rgba(0, 0, 0, 0.1),
    inset -20px -20px 15px -3px rgba(0, 0, 0, 0.1),
    -20px 20px 15px -3px rgba(0, 0, 0, 0.1);
  /* position: relative; */
  width: 70vw;
  /* height: 50vh; */
`;

const CommentContent = styled.div`
  margin-bottom: 5px;
  & textarea {
    padding: 1%;
    width: 50vw;
    height: 50%;
    resize: vertical;
    border: none;
    background-color: transparent;
    color: var(--main-color-100);
    background-color: var(--background-color-100);
  }
`;

const CommentCreator = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  text-align: left;
  display: flex;
`;

const CommentRating = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const CommentSeparator = styled.hr`
  margin-top: 10px;
`;

const CommentNeedConnect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CommentBanned = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
