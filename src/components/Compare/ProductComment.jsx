import React, { useContext, useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import Avatar from "../Avatars/Avatar";
import { RatingStars } from "../Notes/RatingStars";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDButton } from "../styles/genericButton";
import { FcEditImage, FcDeleteRow , FcFullTrash} from "react-icons/fc";
import { useRemoveCommentMutation } from "../../features/pccompareSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericModal from "../Tools/GenericModal";
import ProductModifyComment from "../Compare/ProductModifyComment";

function ProductComment({ comment }) {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth?.data?.customer.Id_customer);
  // console.log(comment);

  const [removeComment, { isLoading: removeCommentIsLoading }] =
    useRemoveCommentMutation();
  const handleRemoveComment = async () => {
    // console.log(comment?.Id_comment);
    try {
      if (removeCommentIsLoading) {
        return;
      }
      const resp = await removeComment({
        Id_comment_to_find: comment?.Id_comment,
      });
      if (resp?.data?.result) {
        toast.success("Commentaire supprimé avec succès!");
      } else if (resp?.error?.data?.isBanned) {
        toast.error("Vous n'avez plus le droit de supprimer vos commentaires !");
      } else {
        toast.error("Erreur lors de la suppression de votre commentaire, réessayez !");
      } 
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
      toast.error(
        "Erreur lors de la suppression de votre commentaire, ressayez !"
      );
    }
  };

  // Modal pour ajouter comment logic :
  const [isModalOpenModifyComment, setIsModalOpenModifyComment] =
    useState(false);
  const openModifyCommentModal = (e) => {
    setIsModalOpenModifyComment(true);
  };

  return (
    <CommentContainer>
      <GenericModal
        ariaLabelMessage="Modal de modification de commentaire"
        isOpen={isModalOpenModifyComment}
        onClose={() => setIsModalOpenModifyComment(false)}
      >
        <ProductModifyComment
          setIsModalOpenModifyComment={setIsModalOpenModifyComment}
          comment={comment}
          customer={auth?.data?.customer}
        />
      </GenericModal>

      {auth?.data?.customer?.Id_customer === comment?.Id_customer && (
        <CommentOptions>
          <STYLEDButton onClick={openModifyCommentModal} disabled={auth?.data?.role === "Banni"}>
            <FcEditImage />
            Editer
          </STYLEDButton>
          <STYLEDButton onClick={handleRemoveComment} disabled={auth?.data?.role === "Banni"}>
            <FcDeleteRow />
            Supprimer
          </STYLEDButton>
        </CommentOptions>
      )}

        {auth?.data?.role === "Modérateur" || auth?.data?.role === "Administrateur" && (
        <CommentModerate>
        <STYLEDButton onClick={handleRemoveComment}>
          <FcFullTrash />
          Modérer
        </STYLEDButton>
      </CommentModerate>
        )}

      <CommentCreator>
        <Avatar Id_customer={comment?.Id_customer} />
        &nbsp;
        {comment.createdBy}
        &nbsp;
        <CommentRating>
          <em>
            <RatingStars rating={comment.note} />
          </em>
        </CommentRating>
      </CommentCreator>

      <CommentSeparator />
      <CommentContent>
        <em>{comment.content}</em>
      </CommentContent>
      <CommentSeparator />

      <CommentDate>
        Posté le : &nbsp;
        {format(new Date(comment.createdAt), "PPPP", { locale: fr })}
        <CommentTimeAgo>
          (
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: fr,
          })}
          )
        </CommentTimeAgo>
      </CommentDate>

      <Comment_Modified_At>
        {comment.modifiedAt ? (
          <i>
            Modi. le : &nbsp;
            {format(new Date(comment.modifiedAt), "PPPP", { locale: fr })}
            <CommentTimeAgo>
              (
              {formatDistanceToNow(new Date(comment.modifiedAt), {
                addSuffix: true,
                locale: fr,
              })}
              )
            </CommentTimeAgo>
          </i>
        ) : null}
      </Comment_Modified_At>
    </CommentContainer>
  );
}

export default ProductComment;

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
  position: relative;
`;

const CommentOptions = styled.div`
  position: absolute;
  top: 5%;
  right: 1%;
`;
const CommentModerate = styled.div`
  position: absolute;
  bottom: 5%;
  right: 1%;
`;

const CommentContent = styled.div`
  margin-bottom: 5px;
`;

const CommentCreator = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
`;
const Comment_Modified_At = styled.div`
  font-size: 0.8rem;
  text-align: left;
  display: flex;
`;

const CommentRating = styled.div`
  font-size: 1.5rem;
`;

const CommentSeparator = styled.hr`
  margin-top: 10px;
`;

const CommentTimeAgo = styled.span`
  margin-left: 10px;
  font-size: 0.7em;
  color: var(--main-color-200);
`;
