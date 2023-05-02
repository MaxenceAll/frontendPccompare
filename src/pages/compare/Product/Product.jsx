import React from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import ProductSpec from "../../../components/Compare/ProductSpec";
import ProductHeader from "../../../components/Compare/ProductHeader";
import ProductPrices from "../../../components/Compare/ProductPrices";
import ProductComments from "../../../components/Compare/ProductComments";

function Product() {
  return (
    <STYLEDProductDetailsContainer>
      <Product_header>
        <ProductHeader />
      </Product_header>

      <Product_image>
        <img src="/docs/testGPU2.png"></img>
      </Product_image>

      <Product_spec>
        <ProductSpec />
      </Product_spec>

      <Product_prices>
        <ProductPrices />
      </Product_prices>

      <Product_comments>
        <ProductComments />
      </Product_comments>
    </STYLEDProductDetailsContainer>
  );
}

export default Product;

const STYLEDProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: column;
  grid-template-areas:
    "Header Header Header Header"
    "Image Image Image Image"
    "Spec Price Price Price"
    "Spec Price Price Price"
    "Spec Comments Comments Comments";
  @media only screen and (max-width: 1000px) {
    grid-template-areas:
      "Header Header Header Header"
      "Image Image Image Image"
      "Spec Spec Spec Spec"
      "Price Price Price Price"
      "Comments Comments Comments Comments";
  }
`;

const Product_header = styled.div`
  /* max-height: 400px; */
  grid-area: Header;
  background-color: var(--background-color-300);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Product_image = styled.div`
  /* max-height: 400px; */
  grid-area: Image;
  background-color: var(--background-color-200);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  object-fit: cover;
`;
const Product_spec = styled.div`
  grid-area: Spec;
  background-color: var(--background-color-100);
`;
const Product_prices = styled.div`
  grid-area: Price;
  background-color: var(--background-color-300);
`;
const Product_comments = styled.div`
  grid-area: Comments;
  background-color: var(--background-color-200);
`;
