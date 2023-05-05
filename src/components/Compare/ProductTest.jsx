import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ProductTest({ seller, historique_prix, seller_historique_article }) {
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
          price: correspondingPrice.price,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date ascending
    return { name: s.name, data: prices };
  });
  
  return (
    <>
      <ResponsiveContainer width="100%" height="20%">
        <LineChart width={650} height={300} >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          {sellerData.map((sd, index) => (
            <Line
              key={sd.name}
              type="monotone"
              data={sd.data}
              dataKey="price"
              name={sd.name}
              stroke={colors[index % colors.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default ProductTest;
