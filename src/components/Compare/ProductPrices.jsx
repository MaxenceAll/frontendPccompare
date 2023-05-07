import React from "react";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDhr } from "../styles/genericHR";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function ProductPrices({
  seller,
  historique_prix,
  seller_historique_article,
}) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //setup charts:
  const colors = [
    "#8884d8",
    "#599c73",
    "#ffc658",
    "#f57f18",
    "#b4c6e7",
    "#f7a35c",
  ];
  const sellerData = seller.map((s) => {
    const prices = seller_historique_article
      .filter((sha) => sha.Id_seller === s.Id_seller)
      .map((sha) => {
        const correspondingPrice = historique_prix.find(
          (p) => p.Id_historique_prix === sha.Id_historique_prix
        );
        return {
          date: correspondingPrice.date,
          // date: new Date(correspondingPrice.date).toLocaleString(
          //   "fr-FR",
          //   options
          // ),
          price: correspondingPrice.price,
        };
      });
    return { name: s.name, data: prices };
  });

  console.log(sellerData);

  return (
    <>
      <StyledHeader>Les meilleurs prix :</StyledHeader>
      <STYLEDhr />
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Vendeur :</StyledTh>
            {/* <StyledTh>Vendeur:</StyledTh> */}
            <StyledTh>Date(dernière mise à jour) :</StyledTh>
            <StyledTh>Prix:</StyledTh>
            <StyledTh>Lien:</StyledTh>
          </tr>
        </thead>
        <tbody>
          {seller.map((seller) => {
            // Get the most recent historical price ID for this seller
            const sellerhistorique_prixIds = seller_historique_article
              .filter((sha) => sha.Id_seller === seller.Id_seller)
              .map((sha) => sha.Id_historique_prix);
            const mostRecenthistorique_prixId =
              sellerhistorique_prixIds[sellerhistorique_prixIds.length - 1];

            // Get the most recent historical price object for this seller
            const mostRecenthistorique_prix = historique_prix.find(
              (hp) => hp.Id_historique_prix === mostRecenthistorique_prixId
            );

            // Render the seller's row
            return (
              <StyledTr key={seller.Id_seller}>
                <StyledTd>
                  <StyledImg src={seller.img_src} alt={seller.img_alt} />
                </StyledTd>
                {/* <StyledTd>{seller.name}</StyledTd> */}
                <StyledTd>
                  {new Date(mostRecenthistorique_prix.date).toLocaleString(
                    "fr-FR",
                    options
                  )}
                </StyledTd>
                <StyledTd>{mostRecenthistorique_prix.price} €</StyledTd>
                <StyledTd>
                  <STYLEDButton>Acheter!</STYLEDButton>
                </StyledTd>
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>

      <ResponsiveContainer width="100%" height="20%">
        <AreaChart width={650} height={300}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          {sellerData.map((sd, index) => (
            <Area
              key={sd.name}
              type="monotone"
              data={sd.data}
              dataKey="price"
              name={sd.name}
              stroke={colors[index % colors.length]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 5%;
`;

const StyledTh = styled.th`
  /* background-color: var(--background-color-200); */
  border-bottom: 1px solid var(--secondary-color-200);
  padding: 8px;
  text-align: left;
  font-weight: bold;
`;

const StyledTr = styled.tr`
  border-bottom: 1px solid var(--secondary-color-100);
  padding: 8px;
  text-align: left;
  /* height:50px; */
`;

const StyledTd = styled.td`
  /* border: 1px solid var(--secondary-color-100); */
  padding: 8px;
  text-align: center;
`;

const StyledImg = styled.img`
  width: 50px;
  display: block;
  margin: auto;
`;
