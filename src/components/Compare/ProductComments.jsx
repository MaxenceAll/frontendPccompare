import React from "react";
import styled from "styled-components";
import { STYLEDhr } from "../styles/genericHR";
import { GiComputerFan } from "react-icons/gi";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";

const ProductComments = ({ comments }) => {

  console.log(comments)
  
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <StyledHeader>Commentaires :</StyledHeader>

      <STYLEDhr />

      <CommentsContainer>
        {comments.map((comment) => (
          <CommentContainer key={comment.Id_comment}>
            <div>
              <CommentContent>
                <span>
                  <GiComputerFan />
                  {comment.createdBy}
                </span>
                <CommentTimeAgo>
                  (
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                  )
                </CommentTimeAgo>
              </CommentContent>
              <span>{comment.content}</span>
            </div>

            <CommentSeparator />

            <CommentDate>
              <em>
                Posté le : &nbsp;
                {format(new Date(comment.createdAt), "PP", { locale: fr })}
              </em>
            </CommentDate>

            <CommentRating>
              <em>Note: {comment.note}/5</em>
            </CommentRating>
          </CommentContainer>
        ))}
      </CommentsContainer>
    </>
  );
};

export default ProductComments;

const StyledFooter = styled.div``;

const StyledHeader = styled.h1`
  text-align: center;
`;

const CommentContainer = styled.div`
  border: 1px solid var(--secondary-color-200);
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentContent = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
`;

const CommentRating = styled.p`
  font-size: 0.5rem;
`;

const CommentSeparator = styled.hr`
  margin-top: 10px;
`;

const CommentsContainer = styled.div`
  margin: 20px;
`;

const CommentTimeAgo = styled.span`
  margin-left: 10px;
  font-size: 0.5em;
  color: var(--main-color-200);
`;
