import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import Chart from "react-google-charts";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";

function ProductPrice({ seller, historique_prix, seller_historique_article }) {
  //Tab logic :
  let optionsTab = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //Chat logic
  const uniqueSellers = [...new Set(seller.map((item) => item.seller_name))];

  const formattedData = seller_historique_article.reduce((acc, entry) => {
    const { Id_seller, Id_historique_prix } = entry;
    const sellerData = seller.find((seller) => seller.Id_seller === Id_seller);
    const historiquePrixData = historique_prix.find(
      (prix) => prix.Id_historique_prix === Id_historique_prix
    );

    if (acc[Id_seller]) {
      acc[Id_seller].data.push({
        price: historiquePrixData.price,
        date: format(new Date(historiquePrixData._date), "yyyy/MM/dd", {
          locale: fr,
        }),
      });
    } else {
      acc[Id_seller] = {
        sellerName: sellerData.seller_name,
        data: [
          {
            price: historiquePrixData.price,
            date: format(new Date(historiquePrixData._date), "yyyy/MM/dd", {
              locale: fr,
            }),
          },
        ],
      };
    }

    return acc;
  }, {});

  const currentDate = new Date();
  const dateRange = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(currentDate, i);
    return format(date, "yyyy/MM/dd", { locale: fr });
  }).reverse();

  const newArray = dateRange.map((date) => [
    date,
    ...Array(uniqueSellers.length).fill(""),
  ]);

  newArray.forEach((row, i) => {
    const currentDate = row[0];

    for (const sellerKey in formattedData) {
      const sellerData = formattedData[sellerKey];
      const sellerPrices = sellerData.data;

      const matchingPrice = sellerPrices.find(
        (priceData) => priceData.date === currentDate
      );

      row[sellerKey] = matchingPrice ? matchingPrice.price : null;
    }
  });

  uniqueSellers.unshift("Vendeur");
  const resultArray = [uniqueSellers, ...newArray];

  const populatedArray = resultArray.map((row, rowIndex) =>
    row.map((value, columnIndex) => {
      if (value === null) {
        let previousRowIndex = rowIndex - 1;
        while (previousRowIndex >= 0) {
          const previousValue = resultArray[previousRowIndex][columnIndex];
          if (previousValue !== null && !isNaN(previousValue)) {
            return previousValue;
          }
          previousRowIndex--;
        }
        return null;
      }
      return value;
    })
  );

  const options = {
    height: 555,
    legend: { position: "top", maxLines: 3 },
    vAxis: {
      minValue: populatedArray.minValue,
      format: "#,##0.00€",
    },
    backgroundColor: {
      fill: "#d4d4d8",
    },
  };

  return (
    <STYLEDContainer>
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
                  <StyledImg
                    src={seller.img_src_seller}
                    alt={seller.img_alt_seller}
                  />
                </StyledTd>
                {/* <StyledTd>{seller.name}</StyledTd> */}
                <StyledTd>
                  {new Date(mostRecenthistorique_prix._date).toLocaleString(
                    "fr-FR",
                    optionsTab
                  )}
                </StyledTd>
                <StyledTd>{mostRecenthistorique_prix.price} €</StyledTd>
                <StyledTd>
                  <STYLEDButton
                    onClick={() =>
                      alert("Ici il y aura le lien vers la site tiers")
                    }
                  >
                    Acheter!
                  </STYLEDButton>
                </StyledTd>
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>

      <STYLEDContainerBox>
        <Chart
          chartType="AreaChart"
          data={populatedArray}
          options={options}
          width="100%"
          height="555px"
          legendToggle
        />
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default ProductPrice;

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
