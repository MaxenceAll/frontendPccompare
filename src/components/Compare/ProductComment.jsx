import React, { useContext } from "react";
import styled from "styled-components";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import Avatar from "../Avatars/Avatar";
import { RatingStars } from "../Notes/RatingStars";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDButton } from "../styles/genericButton";
import { FcEditImage, FcDeleteRow } from "react-icons/fc";

function ProductComment({ comment }) {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth?.data?.customer.Id_customer);
  // console.log(comment);

  return (
    <CommentContainer>

      {auth?.data?.customer?.Id_customer === comment?.Id_customer && (
        <CommentOptions>
          <STYLEDButton><FcEditImage/>Editer</STYLEDButton>
          <STYLEDButton><FcDeleteRow/>Supprimer</STYLEDButton>
        </CommentOptions>
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
        {format(new Date(comment.createdAt), "PPPP", { locale: fr })}{" "}
        <CommentTimeAgo>
          (
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: fr,
          })}
          )
        </CommentTimeAgo>
      </CommentDate>





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
