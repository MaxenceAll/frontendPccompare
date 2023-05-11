import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { STYLEDSelect } from "../components/styles/genericSelect";

function Test({ seller, historique_prix, seller_historique_article }) {
  console.log(seller);
  console.log(historique_prix);
  console.log(seller_historique_article);

  const sellerIds = [
    ...new Set(seller_historique_article.map((item) => item.Id_seller)),
  ];
  console.log(sellerIds);

  const [days, setDays] = useState(30);
  const [data, setData] = useState([]);
  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };
  console.log(days)

  useEffect(() => {
    // Generate data array based on selected days option
    const currentDate = new Date();
    const dates = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      return date.toLocaleDateString();
    });

    const sellers = ['Seller 1', 'Seller 2', 'Seller 3'];

    const newData = [
      ['Date', ...sellers],
      ...dates.map((date) => [date, ...sellers.map(() => Math.random() * 10)]),
    ];

    setData(newData);
  }, [days]);

  const options = {
    title: "Price Comparison Chart",
    curveType: "function",
    legend: { position: "right" },
  };

  return (
    <>
          <label htmlFor="days-select">Number of days:</label>
      <STYLEDSelect id="days-select" value={days} onChange={handleDaysChange}>
        <option value="30">30</option>
        <option value="60">60</option>
        <option value="120">120</option>
        <option value="150">150</option>
      </STYLEDSelect>
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </>
  );
}

export default Test;
