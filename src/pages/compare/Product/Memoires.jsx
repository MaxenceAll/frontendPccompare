import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  useGetAllGpuDataQuery,
  useGetAllRamDataQuery,
} from "../../../features/pccompareSlice";
import Loader from "../../../components/Tools/Loader";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../../components/styles/genericContainer";
import { STYLEDErrorMessage } from "../../../components/styles/genericParagraphError";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { STYLEDButton } from "../../../components/styles/genericButton";
import { STYLEDSelect } from "../../../components/styles/genericSelect";
import DataTable, { createTheme } from "react-data-table-component";
import NoDataFound from "../../../components/NoDataFound";
import MultiRangeSlider from "../../../components/Product/MultiRangeSlider";
import ExpandableRows from "../../../components/Product/expandableRows";

function CartesGraphique() {
  const { data, isLoading, isError } = useGetAllRamDataQuery("ram");
  console.log(data);
  // trouver les filtres en fonction des url params :
  const location = useLocation();
  const navigate = useNavigate();

  // get current URL params
  const searchParams = new URLSearchParams(location.search);

  // Parse the "marques" and "category" filters from the URL
  const initialMarques = searchParams.get("marques")
    ? searchParams.get("marques").split(",")
    : [];
  const initialTypes = searchParams.get("types")
    ? searchParams.get("types").split(",")
    : [];
  const initialCouleurs = searchParams.get("couleurs")
    ? searchParams.get("couleurs").split(",")
    : [];

  console.log(data);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Mémoires Ram`;
  }, []);

  // Table logic:
  const columns = [
    {
      cell: (row) => (
        <>
          <img
            height="auto"
            width="56px"
            // alt={row.img_alt}
            src={row.img_src}
          ></img>
        </>
      ),
      width: "60px",
    },
    {
      name: "Nom",
      selector: (row) => (
        <NavLink to={`/compare/product/ram/${row.Id_article}`}>
          {row.designation}
        </NavLink>
      ),
      sortable: true,
      maxWidth: "350px",
      wrap: true,
    },
    {
      name: "Marque",
      cell: (row) => <>{row.marque}</>,
      selector: (row) => row.marque,
      sortable: true,
      width: "95px",
      reorder: true,
    },
    {
      name: (
        <>
          Fréq.
          <br />
          (MHz)
        </>
      ),
      selector: (row) => row.frequency,
      sortable: true,
      width: "76px",
      reorder: true,
    },
    {
      name: (
        <>
          Type
        </>
      ),
      selector: (row) => row.model_name,
      cell: (row) => <>{row.model_name.slice(8)}</>,
      sortable: true,
      width: "76px",
      reorder: true,
      hide: "sm",
    },
    {
      name: (
        <>
          Nb.
          <br />
          bar.
        </>
      ),
      selector: (row) => row.modules_number + " x",
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          Capa.
          <br />
          (Go)
        </>
      ),
      selector: (row) => row.module_capacity + "Go",
      sortable: true,
      width: "76px",
      reorder: true,
    },
    {
      name: <>CAS</>,
      selector: (row) => row.cl,
      sortable: true,
      width: "64px",
      reorder: true,
      hide: "sm",
    },
    {
      name: (
        <>
          RCD
          <br />
          (ns)
        </>
      ),
      selector: (row) => row.trcd,
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          RP
          <br />
          (ns)
        </>
      ),
      selector: (row) => row.trp,
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "lg",
    },
    {
      name: <>Couleur</>,
      selector: (row) => row.color,
      sortable: true,
      width: "92px",
      reorder: true,
      hide: "md",
    },
    {
      name: <>RGB</>,
      selector: (row) => row.rgb,
      sortable: true,
      width: "92px",
      reorder: true,
      cell: (row) => (
        <>
          {row.rgb === "Sans" ? (
            <div>❌</div>
          ) : (
            <div>✔️</div>
          )}
        </>
      ),
      hide: "lg",
    },
    {
      name: "Prix",
      selector: (row) =>
        row.latest_price != null ? row.latest_price + "€" : "",
      sortable: true,
      width: "90px",
      right: true,
      reorder: true,
    },
    {
      cell: (row) => (
        <NavLink to={`/compare/product/ram/${row.Id_article}`}>
          <STYLEDButton>Voir la fiche</STYLEDButton>
        </NavLink>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "60px",
    },
  ];
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
    // console.log(data)
    // return <ExpandableRows data={data} />;
  );

  // table options :
  const paginationOptions = {
    rowsPerPageText: "Produit par page",
    rangeSeparatorText: "de",
  };
  // table custom Theme
  createTheme("customTheme", {
    text: {
      primary: "var(--main-color-100)",
      secondary: "var(--main-color-200)",
    },
    background: {
      default: "var(--background-color-200)",
    },
    context: {
      background: "#cb4b16",
      text: "#ffffff",
    },
    divider: {
      default: "var(--background-color-100)",
    },
    button: {
      default: "var(--secondary-color-300)",
      hover: "var(--main-color-100)",
      focus: "var(--secondary-color-200)",
      disabled: "rgba(255, 255, 255, .34)",
    },
    sortFocus: {
      default: "var(--background-color-400)",
    },
  });
  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "var(--secondary-color-200)",
        // fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        color: "var(--main-color-100)",
        backgroundColor: "var(--background-color-400)",
        borderBottomColor: "var(--main-color-100)",
        // borderRadius: "25px",
        outline: "1px solid var(--main-color-100)",
      },
      stripedStyle: {
        color: "var(--main-color-100)",
        backgroundColor: "var(--background-color-100)",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  // "copie" de data pour manipulations
  const [filteredData, setFilteredData] = useState(data?.data);

  // filter marque logic:
  const [selectedMarques, setSelectedMarques] = useState(initialMarques);
  const [marques, setMarques] = useState([]);
  // Trouver toutes les marques uniques :
  useEffect(() => {
    const uniqueMarques = [...new Set(data?.data?.map((item) => item.marque))];
    setMarques(uniqueMarques);
  }, [data]);
  function handleButtonClickMarque(marque) {
    // déjà click ?
    if (selectedMarques.includes(marque)) {
      // oui: on supprime
      setSelectedMarques((prev) =>
        prev.filter((selected) => selected !== marque)
      );
    } else {
      // non on ajoute
      setSelectedMarques((prev) => [...prev, marque]);
    }
  }

  // filter chipset logic:
  const [selectedTypes, setSelectedTypes] = useState(initialTypes);
  const [types, setTypes] = useState([]);
  // Trouver tous les chipsets uniques :
  useEffect(() => {
    const uniqueTypes = [
      ...new Set(data?.data?.map((item) => item.model_name)),
    ];
    setTypes(uniqueTypes);
  }, [data]);
  function handleButtonClickType(type) {
    // déjà click ?
    if (selectedTypes.includes(type)) {
      // oui: on supprime
      setSelectedTypes((prev) =>
        prev.filter((selected) => selected !== type)
      );
    } else {
      // non on ajoute
      setSelectedTypes((prev) => [...prev, type]);
    }
  }

  // filter couleurs logic :
  const [selectedCouleurs, setSelectedCouleurs] = useState(initialCouleurs);
  const [couleurs, setCouleurs] = useState([]);
  // Trouver toutes les couleurs uniques :
  useEffect(() => {
    const uniqueCouleurs = [...new Set(data?.data?.map((item) => item.color))];
    setCouleurs(uniqueCouleurs);
  }, [data]);
  function handleButtonClickCouleur(couleur) {
    // déjà click ?
    if (selectedCouleurs.includes(couleur)) {
      // oui: on supprime
      setSelectedCouleurs((prev) =>
        prev.filter((selected) => selected !== couleur)
      );
    } else {
      // non on ajoute
      setSelectedCouleurs((prev) => [...prev, couleur]);
    }
  }

  // filter price logic :
  const [priceRange, setPriceRange] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  useEffect(() => {
    const prices = data?.data?.map((item) => item.latest_price);
    if (prices) {
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [data]);
  const handlePriceChange = useCallback(
    ({ min, max }) => {
      if (min !== priceRange[0] || max !== priceRange[1]) {
        setPriceRange([min, max]);
      }
    },
    [priceRange]
  );
  // console.log(priceRange)

  // filter freq logic :
  const [freqRange, setFreqRange] = useState([]);
  const [minFreq, setMinFreq] = useState();
  const [maxFreq, setMaxFreq] = useState();
  useEffect(() => {
    const freqs = data?.data?.map((item) => item.frequency);
    if (freqs) {
      setMinFreq(Math.min(...freqs));
      setMaxFreq(Math.max(...freqs));
    }
  }, [data]);
  const handleFreqChange = useCallback(
    ({ min, max }) => {
      if (min !== freqRange[0] || max !== freqRange[1]) {
        setFreqRange([min, max]);
      }
    },
    [freqRange]
  );
  // console.log(freqRange)

  // filter capa logic :
  const [capaRange, setCapaRange] = useState([]);
  const [minCapa, setMinCapa] = useState();
  const [maxCapa, setMaxCapa] = useState();
  useEffect(() => {
    const capas = data?.data?.map((item) => item.capacity);
    if (capas) {
      setMinCapa(Math.min(...capas));
      setMaxCapa(Math.max(...capas));
    }
  }, [data]);
  const handleCapaChange = useCallback(
    ({ min, max }) => {
      if (min !== capaRange[0] || max !== capaRange[1]) {
        setCapaRange([min, max]);
      }
    },
    [capaRange]
  );
  // console.log(capaRange)

  // filter cas logic :
  const [casRange, setCasRange] = useState([]);
  const [minCas, setMinCas] = useState();
  const [maxCas, setMaxCas] = useState();
  useEffect(() => {
    const cass = data?.data?.map((item) => item.cl);
    if (cass) {
      setMinCas(Math.min(...cass));
      setMaxCas(Math.max(...cass));
    }
  }, [data]);
  const handleCasChange = useCallback(
    ({ min, max }) => {
      if (min !== casRange[0] || max !== casRange[1]) {
        setCasRange([min, max]);
      }
    },
    [casRange]
  );
  // console.log(casRange)



  // On maj les url params en fonction des filtres
  useEffect(() => {
    // get current URL params
    const searchParams = new URLSearchParams(location.search);
    // update the selected types filter
    searchParams.set("types", selectedTypes.join(","));
    // update the selected marques filter
    searchParams.set("marques", selectedMarques.join(","));
    // update the selected couleur filter
    searchParams.set("couleurs", selectedCouleurs.join(","));
    // update the URL with the new params
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [selectedTypes, selectedMarques, selectedCouleurs]);

  // On maj ici tous les filtres actifs.
  useEffect(() => {
    if (
      selectedMarques.length > 0 ||
      selectedTypes.length > 0 ||
      selectedCouleurs.length > 0 ||
      (priceRange[0] !== null && priceRange[1] !== null) ||
      (freqRange[0] !== null && freqRange[1] !== null) ||
      (capaRange[0] !== null && capaRange[1] !== null) ||
      (casRange[0] !== null && casRange[1] !== null) 
    ) {
      let filtered = data?.data;
      if (selectedMarques.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedMarques.includes(item.marque)
        );
      }
      if (selectedTypes.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedTypes.includes(item.model_name)
        );
      }
      if (selectedCouleurs.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedCouleurs.includes(item.color)
        );
      }
      if (priceRange[0] !== null && priceRange[1] !== null) {
        filtered = filtered?.filter((item) => {
          const latestPrice = item.latest_price;
          return latestPrice >= priceRange[0] && latestPrice <= priceRange[1];
        });
      }
      if (freqRange[0] !== null && freqRange[1] !== null) {
        filtered = filtered?.filter((item) => {
          const latestFreq = item.frequency;
          return latestFreq >= freqRange[0] && latestFreq <= freqRange[1];
        });
      }
      if (capaRange[0] !== null && capaRange[1] !== null) {
        filtered = filtered?.filter((item) => {
          const latestCapa = item.capacity;
          return latestCapa >= capaRange[0] && latestCapa <= capaRange[1];
        });
      }
      if (casRange[0] !== null && casRange[1] !== null) {
        filtered = filtered?.filter((item) => {
          const latestCas = item.cl;
          return latestCas >= casRange[0] && latestCas <= casRange[1];
        });
      }
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedMarques, selectedTypes, selectedCouleurs, data, priceRange, freqRange, capaRange, casRange]);

  if (isLoading) {
    return (
      <STYLEDContainer>
          <Loader />
      </STYLEDContainer>
    );
  }
  if (isError) {
    return (
      <STYLEDErrorMessage>
        Erreur lors de la recherche des categories.
      </STYLEDErrorMessage>
    );
  }

  return (
    <>
      <STYLEDCompareContainer>
        <STYLEDCompareTitle>
          <h1>Cherchez votre mémoire Ram.</h1>
          <h5>
            ({filteredData?.length}/{data?.data?.length} trouvées)
          </h5>
        </STYLEDCompareTitle>
        <STYLEDCompareFilter>
          <STYLEDMarqueFilterContainer>
            Marques:
            <hr />
            {marques.map((marque, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickMarque(marque)}
                className={selectedMarques.includes(marque) ? "active" : ""}
              >
                {marque}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedMarques([])}>
              Toutes
            </STYLEDButton>
          </STYLEDMarqueFilterContainer>
          <STYLEDTypeFilterContainer>
            Type:
            <hr />
            {types.map((type, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickType(type)}
                className={selectedTypes.includes(type) ? "active" : ""}
              >
                {type}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedTypes([])}>
              Tous
            </STYLEDButton>
          </STYLEDTypeFilterContainer>
          <STYLEDColorFilterContainer>
            Couleur :
            <hr />
            {couleurs.map((couleur, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickCouleur(couleur)}
                className={selectedCouleurs.includes(couleur) ? "active" : ""}
              >
                {couleur}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedCouleurs([])}>
              Toutes
            </STYLEDButton>
          </STYLEDColorFilterContainer>
          <STYLEDPriceFilterContainer>
            Prix :
            <hr />
            {minPrice !== undefined && maxPrice !== undefined && (
              <MultiRangeSlider
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
              />
            )}
          </STYLEDPriceFilterContainer>
          <STYLEDFreqFilterContainer>
            Fréquences :
            <hr />
            {minFreq !== undefined && maxFreq !== undefined && (
              <MultiRangeSlider
                min={minFreq}
                max={maxFreq}
                onChange={handleFreqChange}
              />
            )}
          </STYLEDFreqFilterContainer>
          <STYLEDCapaFilterContainer>
            Capacité max :
            <hr />
            {minCapa !== undefined && maxCapa !== undefined && (
              <MultiRangeSlider
                min={minCapa}
                max={maxCapa}
                onChange={handleCapaChange}
              />
            )}
          </STYLEDCapaFilterContainer>
          <STYLEDCasFilterContainer>
            Cas :
            <hr />
            {minCas !== undefined && maxCas !== undefined && (
              <MultiRangeSlider
                min={minCas}
                max={maxCas}
                onChange={handleCasChange}
              />
            )}
          </STYLEDCasFilterContainer>
        </STYLEDCompareFilter>
        <STYLEDCompareResult>
          <DataTable
            // title={`${formattedData?.length} cartes graphique trouvées.`}
            columns={columns}
            data={filteredData}
            pagination
            paginationComponentOptions={paginationOptions}
            theme="customTheme"
            fixedHeader
            highlightOnHover
            customStyles={customStyles}
            striped
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked
            noDataComponent={<NoDataFound />}
            persistTableHead
            // dense
          />
        </STYLEDCompareResult>
      </STYLEDCompareContainer>
    </>
  );
}

export default CartesGraphique;

const STYLEDMarqueFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDTypeFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDColorFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDPriceFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDFreqFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDCapaFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDCasFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;

const STYLEDCompareContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 3fr 3fr;
  grid-template-areas:
    "title title title"
    "filter result result";
  gap: 0px;
  height: 100%;
  @media only screen and (max-width: 1200px) {
    grid-template-areas:
      "title title title"
      "filter filter filter"
      "result result result";
  }
`;

const STYLEDCompareTitle = styled.div`
  grid-area: title;

  background-color: var(--background-color-400);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  border-top: 1px solid var(--secondary-color-300);
  height: auto;
`;

const STYLEDCompareFilter = styled.div`
  background-color: var(--background-color-100);
  border-right: 1px solid var(--main-color-300);
  grid-area: filter;
  padding: 5%;
`;

const STYLEDCompareResult = styled.div`
  grid-area: result;
`;
