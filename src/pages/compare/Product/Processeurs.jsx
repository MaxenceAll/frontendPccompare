import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  useGetAllCpuDataQuery,
  useGetAllGpuDataQuery,
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

function Processeurs() {
  const { data, isLoading, isError } = useGetAllCpuDataQuery("cpu");
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
  const initialSockets = searchParams.get("sockets")
    ? searchParams.get("sockets").split(",")
    : [];
  const initialGpus = searchParams.get("gpus")
    ? searchParams.get("gpus").split(",")
    : [];

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Processeurs`;
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
        <NavLink to={`/compare/product/cpu/${row.Id_article}`}>
          {row.designation}
        </NavLink>
      ),
      sortable: true,
      maxWidth: "350px",
      wrap: true,
    },
    {
      name: "Marque",
      selector: (row) => row.marque,
      sortable: true,
      width: "100px",
      reorder: true,
      hide: "sm",
    },
    {
      name: <>Socket</>,
      selector: (row) => row.socket,
      cell: (row) => <div>{row.socket}</div>,
      sortable: true,
      width: "84px",
      reorder: true,
      hide: "sm",
    },
    {
      name: (
        <>
          Nomb.
          <br />
          Core
        </>
      ),
      selector: (row) => row.nb_core,
      sortable: true,
      width: "70px",
      reorder: true,
    },
    {
      name: (
        <>
          Nomb.
          <br />
          Thread
        </>
      ),
      selector: (row) => row.nb_thread,
      sortable: true,
      width: "75px",
      reorder: true,
      hide: "md",
    },
    {
      name: (
        <>
          Freq.
          <br />
          (hz)
        </>
      ),
      selector: (row) => row.cpu_frequency,
      sortable: true,
      width: "77px",
      reorder: true,
    },
    {
      name: (
        <>
          Boost.
          <br />
          (hz)
        </>
      ),
      selector: (row) => row.turbo_frequency,
      sortable: true,
      width: "76px",
      reorder: true,
      hide: "md",
    },
    {
      name: (
        <>
          Tdp
          <br />
          (w)
        </>
      ),
      selector: (row) => row.tdp,
      sortable: true,
      width: "64px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          Carte graph.
          <br />
          intég.
        </>
      ),
      selector: (row) => row.integrated_gpu,
      sortable: true,
      width: "84px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          Plate-
          <br />
          forme.
        </>
      ),
      selector: (row) => row.plateform_cpu,
      cell: (row) => <div>{row.plateform_cpu}</div>,
      sortable: true,
      width: "84px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          DDR4
          <br />
          max
        </>
      ),
      selector: (row) => row.ddr4_max,
      cell: (row) => (
        <>
          {row.ddr4_max === 0 ? (
            <div>❌</div>
          ) : (
            <div>{row.ddr4_max}</div>
          )}
        </>
      ),
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          DDR5
          <br />
          max
        </>
      ),
      selector: (row) => row.ddr5_max,
      cell: (row) => (
        <>
          {row.ddr5_max === 0 ? (
            <div>❌</div>
          ) : (
            <div>{row.ddr5_max}</div>
          )}
        </>
      ),
      sortable: true,
      width: "70px",
      reorder: true,
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
        <NavLink to={`/compare/product/cpu/${row.Id_article}`}>
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

  // filter socket logic:
  const [selectedSockets, setSelectedSockets] = useState(initialSockets);
  const [sockets, setSockets] = useState([]);
  // Trouver tous les sockets uniques :
  useEffect(() => {
    const uniqueSockets = [
      ...new Set(data?.data?.map((item) => item.socket)),
    ];
    setSockets(uniqueSockets);
  }, [data]);
  function handleButtonClickSocket(socket) {
    // déjà click ?
    if (selectedSockets.includes(socket)) {
      // oui: on supprime
      setSelectedSockets((prev) =>
        prev.filter((selected) => selected !== socket)
      );
    } else {
      // non on ajoute
      setSelectedSockets((prev) => [...prev, socket]);
    }
  }

  // filter gpus logic :
  const [selectedGpus, setSelectedGpus] = useState(initialGpus);
  const [gpus, setGpus] = useState([]);
  // Trouver toutes les couleurs uniques :
  useEffect(() => {
    const uniqueGpus = [...new Set(data?.data?.map((item) => item.integrated_gpu))];
    setGpus(uniqueGpus);
  }, [data]);
  function handleButtonClickGpu(gpu) {
    // déjà click ?
    if (selectedGpus.includes(gpu)) {
      // oui: on supprime
      setSelectedGpus((prev) =>
        prev.filter((selected) => selected !== gpu)
      );
    } else {
      // non on ajoute
      setSelectedGpus((prev) => [...prev, gpu]);
    }
  }

  // filter price logic :
  const [priceRange, setPriceRange] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  useEffect(() => {
    const prices = data?.data.map((item) => item.latest_price);
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

  // filter Freq logic :
  const [freqRange, setFreqRange] = useState([]);
  const [minFreq, setMinFreq] = useState();
  const [maxFreq, setMaxFreq] = useState();
  useEffect(() => {
    const freqs = data?.data.map((item) => item.cpu_frequency);
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


  // On maj les url params en fonction des filtres
  useEffect(() => {
    // get current URL params
    const searchParams = new URLSearchParams(location.search);
    // update the selected sockets filter
    searchParams.set("sockets", selectedSockets.join(","));
    // update the selected marques filter
    searchParams.set("marques", selectedMarques.join(","));
    // update the selected gpu filter
    searchParams.set("gpus", selectedGpus.join(","));
    // update the URL with the new params
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [selectedSockets, selectedMarques, selectedGpus]);

  // On maj ici tous les filtres actifs.
  useEffect(() => {
    if (
      selectedMarques.length > 0 ||
      selectedSockets.length > 0 ||
      selectedGpus.length > 0 ||
      (priceRange[0] !== null && priceRange[1] !== null) ||
      (freqRange[0] !== null && freqRange[1] !== null)
    ) {
      let filtered = data?.data;
      if (selectedMarques.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedMarques.includes(item.marque)
        );
      }
      if (selectedSockets.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedSockets.includes(item.socket)
        );
      }
      if (selectedGpus.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedGpus.includes(item.integrated_gpu)
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
          const latestFreq = item.cpu_frequency;
          return latestFreq >= freqRange[0] && latestFreq <= freqRange[1];
        });
      }
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedMarques, selectedSockets, selectedGpus, data, priceRange, freqRange]);

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          <Loader />
        </STYLEDContainerBox>
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
          <h1>Cherchez votre processeur</h1>
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
          <STYLEDSocketFilterContainer>
            Sockets:
            <hr />
            {sockets.map((socket, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickSocket(socket)}
                className={selectedSockets.includes(socket) ? "active" : ""}
              >
                {socket}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedSockets([])}>
              Tous
            </STYLEDButton>
          </STYLEDSocketFilterContainer>
          <STYLEDGpuFilterContainer>
            Carte Graphique Intégrée :
            <hr />
            {gpus.map((gpu, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickGpu(gpu)}
                className={selectedGpus.includes(gpu) ? "active" : ""}
              >
                {gpu}
              </STYLEDButton>
            ))}
          </STYLEDGpuFilterContainer>
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
            Fréquence du coeur :
            <hr />
            {minFreq !== undefined && maxFreq !== undefined && (
              <MultiRangeSlider
                min={minFreq}
                max={maxFreq}
                onChange={handleFreqChange}
              />
            )}
          </STYLEDFreqFilterContainer>
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

export default Processeurs;

const STYLEDMarqueFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDSocketFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDGpuFilterContainer = styled.div`
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
