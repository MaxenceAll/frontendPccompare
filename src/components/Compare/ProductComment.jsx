import React from "react";
import styled from "styled-components";
import { GiComputerFan } from "react-icons/gi";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { STYLEDhr } from "../styles/genericHR";
import { useGetAvatarCommentQuery } from "../../features/pccompareSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import Loader from "../Tools/Loader";
import Image from "../Dashboard/Image/Image";
import AvatarImage from "../Header/AvatarImage";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";

function ProductComment({ comment }) {
  console.log(comment);

  const {
    data: avatarData,
    isLoading,
    isError,
    error,
  } = useGetAvatarCommentQuery(comment.Id_comment);

  console.log(avatarData?.data[0]?.img_src);

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }
  if (isError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des infos produit: {JSON.stringify(error)}
      </STYLEDErrorMessage>
    );
  }

  return (
    <CommentContainer>
      <div>
        <CommentContent>
          <span>
            {avatarData?.data && avatarData?.data[0]?.img_src ? (
              <AvatarImage
                filename={avatarData?.data[0]?.img_src}
                userId={avatarData?.data[0]?.Id_customer}
              />
            ) : (
              <GiComputerFan />
            )}
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
          {format(new Date(comment.createdAt), "PPPP", { locale: fr })}
        </em>
      </CommentDate>

      <CommentRating>
        <em>Note: {comment.note}/5</em>
      </CommentRating>
    </CommentContainer>
  );
}

export default ProductComment;

const StyledHeader = styled.h1`
  text-align: center;
`;

const CommentContainer = styled.div`
  border: 1px solid var(--secondary-color-200);
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
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
