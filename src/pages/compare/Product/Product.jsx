import { useParams } from "react-router-dom";
import {
  useGetCommentsQuery,
  useGetHistoriqueDetailsQuery,
  useGetProductDetailsQuery,
  useGetSHADetailsQuery,
  useGetSellerDetailsQuery,
} from "../../../features/pccompareSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../../components/styles/genericContainer";
import Loader from "../../../components/Tools/Loader";
import { STYLEDErrorMessage } from "../../../components/styles/genericParagraphError";
import styled from "styled-components";
import ProductHeader from "../../../components/Compare/ProductHeader";
import ProductImage from "../../../components/Compare/ProductImage";
import ProductSpec from "../../../components/Compare/ProductSpec";
import ProductPrices from "../../../components/Compare/ProductPrices";
import ProductTest from "../../../components/Compare/ProductTest";
import ProductTest2 from "../../../components/Compare/ProductTest2";
import NoDataFound from "../../../components/NoDataFound";
import ProductComments from "../../../components/Compare/ProductComments";
import { STYLEDhr } from "../../../components/styles/genericHR";
import Test from "../../Test";

export default function Product() {
  const { Id_article_to_find } = useParams();

  const {
    data: productData,
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
  } = useGetProductDetailsQuery(Id_article_to_find);
  const {
    data: SHAData,
    isLoading: SHAIsLoading,
    isError: SHAIsError,
    error: SHAError,
  } = useGetSHADetailsQuery(Id_article_to_find);
  const {
    data: historiqueData,
    isLoading: historiqueIsLoading,
    isError: historiqueIsError,
    error: historiqueError,
  } = useGetHistoriqueDetailsQuery(Id_article_to_find);
  const {
    data: sellerData,
    isLoading: sellerIsLoading,
    isError: sellerIsError,
    error: sellerError,
  } = useGetSellerDetailsQuery(Id_article_to_find);
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
    error: commentsError,
  } = useGetCommentsQuery(Id_article_to_find);

  // console.log(productData);
  // console.log(SHAData);
  // console.log(historiqueData);
  // console.log(sellerData);
  // console.log(commentsData);

  if (
    productIsLoading ||
    SHAIsLoading ||
    historiqueIsLoading ||
    sellerIsLoading ||
    commentsIsLoading
  ) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }

  if (productIsError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des infos produit:{" "}
        {JSON.stringify(productError)}
      </STYLEDErrorMessage>
    );
  }
  if (SHAIsError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des infos SHA: {JSON.stringify(SHAError)}
      </STYLEDErrorMessage>
    );
  }
  if (historiqueIsError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des infos historique:{" "}
        {JSON.stringify(historiqueError)}
      </STYLEDErrorMessage>
    );
  }
  if (sellerIsError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des infos vendeur:{" "}
        {JSON.stringify(commentsError)}
      </STYLEDErrorMessage>
    );
  }
  if (commentsIsError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des commentaires :{" "}
        {JSON.stringify(commentsError)}
      </STYLEDErrorMessage>
    );
  }

  return (
    <STYLEDProductDetailsContainer>
      <Product_Header_Container>
        <ProductHeader
          article={[productData.data[0]]}
          model={[productData.data[0].model_name]}
          category={[productData.data[0].category_name]}
        />
      </Product_Header_Container>

      <Product_Image_Container>
        <ProductImage article={[productData.data[0]]} />
      </Product_Image_Container>

      <Product_Spec_Container>
        <ProductSpec spec={productData.data[0]} />
      </Product_Spec_Container>

      <Product_Prices_Container>
        {historiqueData.data.length > 0 ? (
          <>
            <StyledHeader>Les meilleurs prix :</StyledHeader>
            <STYLEDhr />
            <ProductTest
              seller={sellerData.data}
              historique_prix={historiqueData.data}
              seller_historique_article={SHAData.data}
            />
          </>
        ) : (
          <>
            <StyledHeader>Les meilleurs prix :</StyledHeader>
            <STYLEDhr />
            <div>
              <NoDataFound />
            </div>
          </>
        )}
        {/* test here :
        <Test
          seller={sellerData.data}
          historique_prix={historiqueData.data}
          seller_historique_article={SHAData.data}
        /> */}
      </Product_Prices_Container>

      <Product_Comments_Container>
        <ProductComments comments={commentsData.data} />
      </Product_Comments_Container>
    </STYLEDProductDetailsContainer>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
`;

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
