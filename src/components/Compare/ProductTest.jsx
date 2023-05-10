import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styled from "styled-components";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDButton } from "../styles/genericButton";

function ProductTest({ seller, historique_prix, seller_historique_article }) {


console.log(seller);

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

  // Create an array of unique seller IDs
  const sellerIds = [
    ...new Set(seller_historique_article.map((item) => item.Id_seller)),
  ];

  // For each seller, create an array of price history records
  const sellerData = sellerIds.map((id) => {
    // Get the seller object corresponding to the ID
    const sellerObj = seller.find((item) => item.Id_seller === id);

    // Get the seller's price history records and map them to an array of { date, price } objects
    const sellerHistoriquePrix = seller_historique_article
      .filter((item) => item.Id_seller === id)
      .map((item) => {
        const historiquePrixObj = historique_prix.find(
          (prix) => prix.Id_historique_prix === item.Id_historique_prix
        );
        return { date: new Date(historiquePrixObj._date).toLocaleDateString(), price: historiquePrixObj.price };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    // Return an object containing the seller's name and price history data
    return { name: sellerObj.seller_name, data: sellerHistoriquePrix };
  });
  // console.log(sellerData)


  const CustomTooltip = ({ active, payload }) => {
    // console.log(payload)
    if (active && payload && payload.length) {
      return (
        <StyledToolTip_div >
          <p>{`${payload[0].payload.date}`}</p>
          <p>{`${payload[0].name} : ${payload[0].value}`}</p>
        </StyledToolTip_div>
      );
    }
  
    return null;
  };

  // console.log(sellerData)

  return (<>

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
                <StyledImg src={seller.img_src_seller} alt={seller.img_alt_seller} />
              </StyledTd>
              {/* <StyledTd>{seller.name}</StyledTd> */}
              <StyledTd>
                {new Date(mostRecenthistorique_prix._date).toLocaleString(
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

    <StyledBigContainer_div> 
        {sellerData.map((seller, index) => (
          <div key={seller.name}>
            <h2>{seller.name}</h2>
            <ResponsiveContainer  minWidth={400} minHeight={300}>
              <AreaChart width={800} height={400} data={seller.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin", "dataMax"]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend dataKey="price" />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
    </StyledBigContainer_div>
    </>);
}

export default ProductTest;

const StyledBigContainer_div = styled.div`
display: flex;
justify-content:center;
align-items:center;
flex-direction: row;
flex-wrap: wrap;
`

const StyledToolTip_div = styled.div`
background-color: var(--background-color-200);
color:var(--main-color-100);
font-size: 1rem;
border: 1px solid var(--background-color-400)
`


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
