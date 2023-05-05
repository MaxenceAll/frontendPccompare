import React from "react";
import styled from "styled-components";

function ProductImage(props) {
  const { article } = props;
  return (
    <>
      <STYLED_Img_container>
        <img src={article.img_src} />
      </STYLED_Img_container>
    </>
  );
}

export default ProductImage;

const STYLED_Img_container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 10px;
  border: 1px solid var(--main-color);
  img {
    display: block;
    max-width: 230px;
    max-height: 95px;
    width: auto;
    height: auto;
    aspect-ratio: 2 / 1;
    transition: transform 0.6s ease-out;
  }

  &:hover img {
    transform: scale(1.2);
  }
`;
