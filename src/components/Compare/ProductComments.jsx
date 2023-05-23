import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductComment from "./ProductComment";
import NoDataFound from "../NoDataFound";
import { AuthContext } from "../../Contexts/AuthContext";
import { STYLEDButton } from "../styles/genericButton";
import GenericModal from "../Tools/GenericModal";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import ProductAddComment from "./ProductAddComment";

const ProductComments = ({ comments, Id_article }) => {

  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);
  // console.log(auth?.data?.role);
  // console.log(comments)
  // console.log(comments[0]?.Id_article);

  // A déjà commenté ou pas ?
  const [hasComment, setHasComment] = useState(false);

  useEffect(() => {
    if (auth.data?.customer?.Id_customer) {
      setHasComment(
        comments.some(
          (comment) => comment.Id_customer === auth?.data?.customer?.Id_customer
        )
      );
    }
  }, [auth, comments]);

  // Modal pour ajouter comment logic :
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const openCommentModal = (e) => {
    setIsModalOpenComment(true);
  };

  return (
    <>
      <GenericModal
        ariaLabelMessage="Modal d'ajout de commentaire"
        isOpen={isModalOpenComment}
        onClose={() => setIsModalOpenComment(false)}
      >
        <ProductAddComment
          customer={auth?.data?.customer}
          role={auth?.data?.role}
          Id_article={Id_article}
          setIsModalOpenComment={setIsModalOpenComment}
        />
      </GenericModal>

      <Comments_new_container>
        {!hasComment ? (
          <>
            Voulez-vous commenter ce produit ?
            <STYLEDButton width={"40%"} onClick={openCommentModal}>
              Ajouter
            </STYLEDButton>
          </>
        ) : (
          <i>Vous avez déjà commenté ce produit !</i>
        )}
      </Comments_new_container>

      <CommentsContainer>
        {comments.map((comment) => (
          <ProductComment key={comment.Id_comment} comment={comment} />
        ))}
      </CommentsContainer>

    </>
  );
};

export default ProductComments;

const Comments_new_container = styled.div`
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CommentsContainer = styled.div`
  margin: 20px;
`;
