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
import ProductAddComment from "./ProductAddComment";

const ProductComments = ({ comments }) => {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);
  // console.log(comments);

  // A déjà commenté ou pas ?
  const [hasComment, setHasComment] = useState(false);
  console.log(hasComment);
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
        <ProductAddComment customer={auth.data?.customer}/>
      </GenericModal>

      {comments.length > 0 ? (
        <CommentsContainer>
          <Comments_new_container>
            {!hasComment ? (
              <>
                Voulez-vous commenter ce produit ?
                <STYLEDButton width={"40%"} onClick={openCommentModal}>
                  Ajouter
                </STYLEDButton>
              </>
            ) : (
              <i>Vous avez déjà commenté ce produit.</i>
            )}
          </Comments_new_container>
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
