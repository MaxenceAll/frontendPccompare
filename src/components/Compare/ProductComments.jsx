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
  // console.log(hasComment);
  useEffect(() => {
    setHasComment(
      comments.some(
        (comment) => comment.Id_customer === auth.data?.customer?.Id_customer
      )
    );
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
          customer={auth.data?.customer}
          Id_article={Id_article}
          setIsModalOpenComment={setIsModalOpenComment}
        />
      </GenericModal>

      {/* Présence de commentaire! */}
      {comments.length > 0 ? (
        <CommentsContainer>
          <Comments_new_container>
            {!hasComment && auth?.data?.role !== "Banni" ? (
              <>
                Voulez-vous commenter ce produit ?
                <STYLEDButton width={"40%"} onClick={openCommentModal}>
                  Ajouter
                </STYLEDButton>
              </>
            ) : (
              <>
                {auth?.data?.role !== "Banni" ? (
                  <i>Vous avez déjà commenté ce produit.</i>
                ) : (
                  <STYLEDErrorMessage>
                    Vous n'avez plus le droit d'agir sur les commentaires :
                    contactez les admins.
                  </STYLEDErrorMessage>
                )}
              </>
            )}
          </Comments_new_container>
          {comments.map((comment) => (
            <ProductComment key={comment.Id_comment} comment={comment} />
          ))}
        </CommentsContainer>
      // Pas de commentaire !
      ) : (
        <>
          {auth?.data?.role !== "Banni" ? (
            <CommentsContainer>
              <Comments_new_container>
                Voulez-vous commenter ce produit ?
                <STYLEDButton width={"40%"} onClick={openCommentModal}>
                  Ajouter
                </STYLEDButton>
                <NoDataFound />
              </Comments_new_container>
            </CommentsContainer>
          ) : (
            <CommentsContainer>
              <Comments_new_container>
                <STYLEDErrorMessage>
                  Vous n'avez plus le droit d'agir sur les commentaires :
                  contactez les admins.
                </STYLEDErrorMessage>
              </Comments_new_container>
            </CommentsContainer>
          )}
        </>
      )}
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
