import React from "react";
import styled from "styled-components";
import ProductSpec from "../../../components/Compare/ProductSpec";
import ProductHeader from "../../../components/Compare/ProductHeader";
import ProductPrices from "../../../components/Compare/ProductPrices";
import ProductComments from "../../../components/Compare/ProductComments";
import ProductImage from "../../../components/Compare/ProductImage";
import ProductTest from "../../../components/Compare/ProductTest";

function Product() {
  // fake data :
  const article = {
    Id_article: 1,
    product_number: "24G-P5-4999-KR",
    designation: "EVGA RTX 3090 Ti FTW3 KINGPIN",
    marque: "EVGA",
    img_src: "https://tpucdn.com/gpu-specs/images/b/9743-front.jpg",
    img_alt: "EVGA RTX 3090 Ti FTW3 KINGPIN",
    Id_model: 2,
  };
  const model = {
    Id_model: 2,
    name: "RTX 3000",
    Id_category: 1,
  };
  const category = {
    Id_category: 1,
    name: "Cartes Graphique",
    code: "cg",
    img_src: null,
    img_alt: "Cartes Graphique",
  };
  const gpu = {
    Id_gpu: 147,
    ean: null,
    upc: null,
    chipset: "3090Ti",
    color: "Black",
    gpu_clock: 1560,
    boost_clock: 1905,
    memory_clock: 1313,
    bus_interface: "4.0 x16",
    bus_width: 384,
    memory_vram: 24,
    slot_width: 3,
    length: 331,
    width: 150,
    height: 70,
    tdp: 450,
    psu_needed: 850,
    nb_hdmi: 1,
    nb_dp: 3,
    nb_usbc: 0,
    power_connector: "1 x 16 Pin ",
    pixel_rate: 213,
    texture_rate: 640,
    fp32: 41,
    shader: 10752,
    tmu: 336,
    rop: 112,
    sm_cu: 874,
    tensor_cores: 336,
    rt_cores: 84,
    Id_article: 147,
  };
  const comments = [
    {
      Id_comment: 1,
      content:
        "This GPU is amazing! I was able to play all my favorite games at max settings with no issues.",
      note: 5,
      createdBy: "Secutor",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2023-04-01",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 6,
      Id_article: 1,
    },
    {
      Id_comment: 2,
      content:
        "I'm disappointed with this GPU. It's not as powerful as I expected and I've had some stability issues.",
      note: 2,
      createdBy: "TestPseudo_100",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2023-04-03",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 7,
      Id_article: 1,
    },
    {
      Id_comment: 3,
      content: "Good GPU for the price. I've had no issues so far.",
      note: 4,
      createdBy: "TestPseudo_2",
      deletedBy: null,
      modifiedBy: null,
      createdAt: "2023-04-05",
      deletedAt: null,
      modifiedAt: null,
      Id_customer: 8,
      Id_article: 1,
    },
  ];

  const seller = [
    {
      Id_seller: 1,
      name: "LDLC",
      img_src: "https://upload.wikimedia.org/wikipedia/fr/c/c7/LDLC_logo.jpg",
      img_alt: "LDLC logo",
    },
    {
      Id_seller: 2,
      name: "Amazon",
      img_src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/langfr-1920px-Amazon_logo.svg.png",
      img_alt: "Amazon logo",
    },
    {
      Id_seller: 3,
      name: "TopAchat",
      img_src:
        "https://upload.wikimedia.org/wikipedia/fr/1/14/Logo-topachat_200.jpg",
      img_alt: "TopAchat logo",
    },
  ];

  const historique_prix = [
    { Id_historique_prix: 1, price: 450, date: "2023-05-02" },
    { Id_historique_prix: 2, price: 550, date: "2023-05-04" },
    { Id_historique_prix: 3, price: 430, date: "2023-05-05" },
    { Id_historique_prix: 4, price: 480, date: "2023-05-01" },
    { Id_historique_prix: 5, price: 520, date: "2023-05-03" },
    { Id_historique_prix: 6, price: 850, date: "2023-04-01" },
    { Id_historique_prix: 7, price: 740, date: "2023-04-02" },
    { Id_historique_prix: 8, price: 820, date: "2023-04-03" },
    { Id_historique_prix: 9, price: 480, date: "2023-04-04" },
    { Id_historique_prix: 10, price: 810, date: "2023-04-05" },
    { Id_historique_prix: 11, price: 810, date: "2023-02-01" },
    { Id_historique_prix: 12, price: 735, date: "2023-02-02" },
    { Id_historique_prix: 13, price: 725, date: "2023-02-03" },
    { Id_historique_prix: 14, price: 638, date: "2023-02-04" },
    { Id_historique_prix: 15, price: 520, date: "2023-02-08" },
    { Id_historique_prix: 50, price: 520, date: "2023-03-05" },
    { Id_historique_prix: 51, price: 520, date: "2023-05-01" },
    { Id_historique_prix: 52, price: 520, date: "2023-01-22" },
    { Id_historique_prix: 53, price: 520, date: "2023-03-11" },
    { Id_historique_prix: 54, price: 520, date: "2023-02-08" },
  ];

  const seller_historique_article = [
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 1,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 2,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 3,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 4,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 5,
    },
    {
      Id_article: 1,
      Id_seller: 2,
      Id_historique_prix: 6,
    },
    {
      Id_article: 1,
      Id_seller: 2,
      Id_historique_prix: 7,
    },
    {
      Id_article: 1,
      Id_seller: 2,
      Id_historique_prix: 8,
    },
    {
      Id_article: 1,
      Id_seller: 2,
      Id_historique_prix: 9,
    },
    {
      Id_article: 1,
      Id_seller: 2,
      Id_historique_prix: 10,
    },


    {
      Id_article: 1,
      Id_seller: 3,
      Id_historique_prix: 11,
    },
    {
      Id_article: 1,
      Id_seller: 3,
      Id_historique_prix: 12,
    },
    {
      Id_article: 1,
      Id_seller: 3,
      Id_historique_prix: 13,
    },
    {
      Id_article: 1,
      Id_seller: 3,
      Id_historique_prix: 14,
    },
    {
      Id_article: 1,
      Id_seller: 3,
      Id_historique_prix: 15,
    },





    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 50,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 51,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 52,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 53,
    },
    {
      Id_article: 1,
      Id_seller: 1,
      Id_historique_prix: 54,
    },




  ];

  return (
    <STYLEDProductDetailsContainer>
      <Product_Header_Container>
        <ProductHeader model={model} article={article} category={category} />
      </Product_Header_Container>

      <Product_Image_Container>
        <ProductImage article={article} />
      </Product_Image_Container>

      <Product_Spec_Container>
        <ProductSpec spec={gpu} />
      </Product_Spec_Container>

      <Product_Prices_Container>
        <ProductPrices
          seller={seller}
          historique_prix={historique_prix}
          seller_historique_article={seller_historique_article}
        />
        <ProductTest
          seller={seller}
          historique_prix={historique_prix}
          seller_historique_article={seller_historique_article}
        />
      </Product_Prices_Container>

      <Product_Comments_Container>
        <ProductComments comments={comments} />
      </Product_Comments_Container>
    </STYLEDProductDetailsContainer>
  );
}

export default Product;

const STYLEDProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 2fr;
  grid-template-rows: auto auto auto auto 2fr;
  gap: 0px 0px;
  grid-auto-flow: column;
  grid-template-areas:
    "Header Header Header Header"
    "Image Image Image Image"
    "Spec Spec Price Price"
    "Spec Spec Price Price"
    "Spec Spec Comments Comments";
  @media only screen and (max-width: 1000px) {
    grid-template-areas:
      "Header Header Header Header"
      "Image Image Image Image"
      "Price Price Price Price"
      "Spec Spec Spec Spec"
      "Comments Comments Comments Comments";
  }
`;

// TODO fix les border en fonction du media QUERY.

const Product_Header_Container = styled.div`
  /* max-height: 400px; */
  grid-area: Header;
  background-color: var(--background-color-100);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-top: 1px solid var(--secondary-color-300);
`;
const Product_Image_Container = styled.div`
  /* max-height: 400px; */
  /* height: 122px; */
  grid-area: Image;
  background-color: var(--main-color-400);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  object-fit: cover;

  border-top: 1px solid var(--secondary-color-300);
`;
const Product_Spec_Container = styled.div`
  grid-area: Spec;
  background-color: var(--background-color-100);
  padding: 5%;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid var(--secondary-color-100);
  border-top: 1px solid var(--secondary-color-100);
  border-bottom: 1px solid var(--secondary-color-100);
`;
const Product_Prices_Container = styled.div`
  grid-area: Price;
  background-color: var(--background-color-100);

  border-top-right-radius: 5px;
  border-right: 1px solid var(--secondary-color-100);
  border-top: 1px solid var(--secondary-color-100);
  padding: 2%;
  /* border-bottom: 1px solid var(--secondary-color-300); */
`;
const Product_Comments_Container = styled.div`
  grid-area: Comments;
  background-color: var(--background-color-100);

  border-bottom-right-radius: 5px;
  border-right: 1px solid var(--secondary-color-100);
  border-bottom: 1px solid var(--secondary-color-100);
`;
