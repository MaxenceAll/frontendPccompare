import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";

import Chart from "react-google-charts";

function Test({ seller, historique_prix, seller_historique_article }) {
  console.log(seller);
  console.log(historique_prix);
  console.log(seller_historique_article);

  const uniqueSellers = Array.from(
    new Set(seller.map((item) => item.seller_name))
  );
  console.log(uniqueSellers);
  const formattedData = {};

  // Loop through the seller_historique_article data
  for (let entry of seller_historique_article) {
    const { Id_seller, Id_historique_prix } = entry;

    // correspondance Id seller avec Id historique prix
    const sellerData = seller.find((seller) => seller.Id_seller === Id_seller);
    const historiquePrixData = historique_prix.find(
      (prix) => prix.Id_historique_prix === Id_historique_prix
    );

    // Si le seller exist déjà dans formattedata
    if (formattedData[Id_seller]) {
      // Sil existe on ajoute les valeurs dans le tableau déjà existant
      formattedData[Id_seller].data.push({
        price: historiquePrixData.price,
        date: format(new Date(historiquePrixData._date), "yyyy/MM/dd", {
          locale: fr,
        }),
      });
    } else {
      // Si le seller existe PAS déjà dans formattedata on le crée
      formattedData[Id_seller] = {
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
  }

  // Sortir toutes les 30 dernieres dates
  const currentDate = new Date();
  const dateRange = [];
  for (let i = 0; i < 30; i++) {
    const date = subDays(currentDate, i);
    dateRange.push(format(date, "yyyy/MM/dd", { locale: fr }));
  }

  console.log(dateRange);
  console.log(formattedData);

  const newArray = [];

  for (let i = 0; i < dateRange.length; i++) {
    const tempArray = [];

    for (let j = 0; j < uniqueSellers.length; j++) {
      if (j === 0) {
        tempArray.push(dateRange[i]);
      } else {
        tempArray.push("");
      }
    }

    newArray.push(tempArray);
  }

  // Iterate over each date in the newArray
  for (let i = 0; i < newArray.length; i++) {
    const currentDate = newArray[i][0]; // Assumes the date is always at the first index

    // Iterate over each seller in the formattedData object
    for (const sellerKey in formattedData) {
      const sellerData = formattedData[sellerKey];
      const sellerName = sellerData.sellerName;
      const sellerPrices = sellerData.data;

      // Find the matching price for the current date
      const matchingPrice = sellerPrices.find(
        (priceData) => priceData.date === currentDate
      );

      // Populate the newArray with the matching seller price or null
      newArray[i][sellerKey] = matchingPrice ? matchingPrice.price : null;
    }
  }

  // Output the new arrays
  console.log(uniqueSellers);
  console.log(newArray);

  // Add "Vendeur" as the first element
  uniqueSellers.unshift("Vendeur");
  const resultArray = [uniqueSellers, ...newArray.reverse()];
  console.log(resultArray);

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

  console.log(populatedArray);

  const options = {
    height: 300,
    legend: { position: "top", maxLines: 3 },
    vAxis: {
      minValue: populatedArray.minValue,
    },
  };
  const styles = {};

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <Chart
          chartType="AreaChart"
          data={populatedArray}
          options={options}
          width="100%"
          height="555px"
          legendToggle
          // style={styles}
        />
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default Test;
