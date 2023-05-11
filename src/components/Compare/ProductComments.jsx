import React from "react";
import styled from "styled-components";
import { GiComputerFan } from "react-icons/gi";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { STYLEDhr } from "../styles/genericHR";
import ProductComment from "./ProductComment";
import NoDataFound from "../NoDataFound";

const ProductComments = ({ comments }) => {
  console.log(comments);
  return (
    <>
      <StyledHeader>Commentaires :</StyledHeader>

      <STYLEDhr />
      {comments.length > 0 ? (
        <CommentsContainer>
          {comments.map((comment) => (
            <ProductComment key={comment.Id_comment} comment={comment} />
          ))}
        </CommentsContainer>
      ) : (
        <CommentsContainer>
          <NoDataFound />
        </CommentsContainer>
      )}
    </>
  );
};

export default ProductComments;

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
