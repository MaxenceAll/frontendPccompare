import React, { useState } from "react";
import styled from "styled-components";
import { DateDuJour } from "../../components/Tools/DateDuJour";
import { STYLEDButton } from "../../components/styles/genericButton";
import Avatar from "../Avatars/Avatar";
import { FaStar } from "react-icons/fa";
import RatingSelector from "./ProductRatingSelector";
import {
  useAddCommentMutation,
  useModifyCommentMutation,
} from "../../features/pccompareSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function ProductAddComment({ setIsModalOpenModifyComment, comment, customer }) {
//   console.log(comment);
//   console.log(customer);

  const [modifyComment, { isLoading: modifyCommentIsLoading }] =
    useModifyCommentMutation();
  const [note, setNote] = useState(5);
  const [content, setContent] = useState("");

  const handleModify = async () => {
    try {
      if (modifyCommentIsLoading) {
        return;
      }
      if (!content) {
        toast.error("Contenu vide, ajoutez votre commentaire !");
        return;
      }
      const resp = await modifyComment({
        Id_comment_to_find: comment?.Id_comment,
        Id_customer: customer?.Id_customer,
        note,
        content,
      });
      if (resp?.data?.result) {
        toast.success("Commentaire modifié avec succès!");
      } else if (resp?.error?.data?.isBanned) {
        toast.error("Vous n'avez plus le droit de modifier vos commentaires !");
      } else {
        toast.error("Erreur lors de la modification de votre commentaire, réessayez !");
      }          
      setIsModalOpenModifyComment(false);
    } catch (error) {
      console.error("Erreur lors de la modification du commentaire :", error);
      toast.error("Erreur lors de la modification de votre commentaire, ressayez !");
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
          <i> Votre nouvelle note:</i> &nbsp;
          <RatingSelector note={note} setNote={setNote} />
        </div>
      </CommentRating>

      <CommentSeparator />
      <CommentContent>
        <textarea
          name="text"
          placeholder="Ajoutez votre commentaire ici"
          defaultValue={comment.content}
          onChange={handleTextareaChange}
        ></textarea>
      </CommentContent>
      <STYLEDButton width={"100%"} onClick={handleModify}>
        Publier
      </STYLEDButton>
      <CommentSeparator />

      <CommentDate>
        Posté le : &nbsp;
        {format(new Date(comment.createdAt), "dd MMMM yyyy, HH:mm:ss", {
          locale: fr,
        })}
      </CommentDate>

      <Comment_Modified_At>
        Modi. le : &nbsp;
        <DateDuJour />
      </Comment_Modified_At>
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
const Comment_Modified_At = styled.div`
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
