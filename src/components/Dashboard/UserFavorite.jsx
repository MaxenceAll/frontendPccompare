import React from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import Loader from "../Tools/Loader";
import { useGetAllFavoriteByIdCustomerQuery } from "../../features/pccompareSlice";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";

function UserFavorite({ currentUser }) {
//   console.log(currentUser);

  useGetAllFavoriteByIdCustomerQuery;
  const { data, isLoading, isError, error } =
    useGetAllFavoriteByIdCustomerQuery(currentUser);
//   console.log(data);

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          Chargement de vos favoris...
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }
  if (isError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche de vos favoris.
        {JSON.stringify(error)}
      </STYLEDErrorMessage>
    );
  }

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <STYLED_Favorite_Title>Vos favoris :</STYLED_Favorite_Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Nom du produit</TableHeader>
              <TableHeader>Marque</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader>Consulter</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data?.data?.map((fav) => (
              <TableRow key={fav.Id_article}>
                <TableCell>{fav.designation}</TableCell>
                <TableCell>{fav.marque}</TableCell>
                <TableCell>
                  <Image src={fav.img_src} alt={fav.img_alt} />
                </TableCell>
                <TableCell>
                    <NavLink to={`/compare/product/${fav.code}/${fav.Id_article}`} >
                        <STYLEDButton>Let's go!</STYLEDButton>
                    </NavLink>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default UserFavorite;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: var(--background-color-200);
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--background-color-200);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--background-color-300);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--main-color-200);
`;

const Image = styled.img`
  width: 50px;
  height: auto;
  aspect-ratio: 2/1;
`;

const STYLED_Favorite_Title = styled.h1`
text-align: center;
text-decoration: underline;
`
