import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import fetcher from "../../helper/fetcher";

export default function ProductTest2(props) {

    console.log(props)

    // const nb_seller = props.seller.data.length;
    // console.log(nb_seller)
    // const sellerNames = props.seller.data.map((seller) => seller.seller_name);
    // console.log(sellerNames);
    // const chart_headers = ['Date', ...sellerNames];
    // console.log(chart_headers);


    // const chart_nb_date = props.historique_prix.data.length;
    // console.log(chart_nb_date)

    const [prices, setPrices] = useState([])
    console.log(prices);
    const [dates, setDates] = useState([])
    console.log(dates)
    const [chartData, setChartData] = useState([]);
    console.log("chartData=",chartData)

    useEffect(() => {
    
        const getData = async () => {
          try {            
            const response = await fetcher.get(`compare/historique/1/1`);
            setPrices(response.data.map(item => item.price))
            setDates(response.data.map(item => item._date))


// Initialize an object to store the grouped data
const groupedData = prices.reduce((accumulator, currentValue, index) => {
    // Get the current date for the current price
    const currentDate = dates[index];
    // If the current price doesn't exist as a key in the accumulator object, create it and initialize it with an empty array
    if (!accumulator[currentValue]) {
      accumulator[currentValue] = [];
    }
    // Push the current date and price values to the corresponding array in the accumulator object
    accumulator[currentValue].push({ date: currentDate, price: currentValue });
    // Return the updated accumulator object
    return accumulator;
  }, {});
  
  // Convert the object of arrays to an array of arrays
  let result = Object.values(groupedData).map(arr => arr.map(obj => [obj.date, obj.price]));
  let test = ["Date", "LDLC"];
  setChartData(prevChartData => [...prevChartData, ...test, ...result]);
  
  console.log(result);
  
  
          } catch (error) {
            console.error(error);
          } 
        };
          getData();    

      }, []);
    

  const options = {
    title: "Historique des prix",
    hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "60%", height: "80%" },
  };
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
