import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useGetAllCommentsByIdCustomerQuery } from "../../features/pccompareSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import Loader from "../Tools/Loader";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { RatingStars } from "../Notes/RatingStars";

function UserComments() {
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);

  const { data, isLoading, isError, error } =
    useGetAllCommentsByIdCustomerQuery(auth?.data?.customer?.Id_customer);
  // console.log(data);

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          Chargement de vos commentaaires...
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }
  if (isError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche de vos commentaires.
        {JSON.stringify(error)}
      </STYLEDErrorMessage>
    );
  }

  return (
    <>
      <STYLEDContainer>
        <STYLEDContainerBox>
          <STYLED_Comments_Title>Vos commentaires :</STYLED_Comments_Title>
          <Table>
            <thead>
              <TableRow>
                <TableHeader></TableHeader>
                <TableHeader>Produit</TableHeader>
                <TableHeader>Commentaire</TableHeader>
                <TableHeader>Note</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Consulter</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data?.data?.map((com) => (
                <TableRow key={com.Id_article}>
                  <TableCell>
                    <Image src={com.img_src} alt={"XXX"} />
                  </TableCell>
                  <TableCell>{com.designation}</TableCell>
                  <TableCell>{com.content}</TableCell>
                  <TableCellNote>
                    <RatingStars rating={com.note} />
                  </TableCellNote>
                  <TableCell>
                    {format(new Date(com.createdAt), "dd MMMM yyyy, HH:mm:ss", { locale: fr })}
                  </TableCell>

                  <TableCell>
                    <NavLink
                      to={`/compare/product/${com.code}/${com.Id_article}`}
                    >
                      <STYLEDButton>Let's go!</STYLEDButton>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </STYLEDContainerBox>
      </STYLEDContainer>
    </>
  );
}

export default UserComments;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: var(--background-color-300);
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--background-color-200);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--background-color-200);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid var(--main-color-200);
`;

const TableCellNote = styled.td`
  width: 80px;
  padding: 10px;
  border-bottom: 1px solid var(--main-color-200);
`;

const Image = styled.img`
  width: 55px;
  height: auto;
  aspect-ratio: 2/1;
`;

const STYLED_Comments_Title = styled.h1`
  text-align: center;
  text-decoration: underline;
`;
