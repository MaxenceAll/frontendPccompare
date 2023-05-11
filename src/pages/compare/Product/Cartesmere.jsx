import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useGetAllGpuDataQuery, useGetAllMbDataQuery } from "../../../features/pccompareSlice";
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

function Cartesmere() {
  const { data, isLoading, isError } = useGetAllMbDataQuery("mb");
  console.log(data)
  // trouver les filtres en fonction des url params :
  const location = useLocation();
  const navigate = useNavigate();

  // get current URL params
  const searchParams = new URLSearchParams(location.search);

  // Parse the "marques" and "category" filters from the URL
  const initialMarques = searchParams.get("marques")
    ? searchParams.get("marques").split(",")
    : [];
  const initialChipsets = searchParams.get("chipsets")
    ? searchParams.get("chipsets").split(",")
    : [];
  const initialFormats = searchParams.get("formats")
    ? searchParams.get("formats").split(",")
    : [];


  console.log(data);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes Mère`;
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
        <NavLink to={`/compare/product/${row.Id_article}`}>
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
      width: "95px",
      reorder: true,
    },
    {
      name: "Chipset",
      selector: (row) => row.chipset,
      sortable: true,
      width: "80px",
      reorder: true,
    },
    {
      name: (
        <>
          Socket
        </>
      ),
      cell: (row) => (
        <>
          {row.model_name}
        </>
      ),
      selector: (row) => row.model_name,
      sortable: true,
      width: "100px",
      reorder: true,
      hide: "sm",
    },
    {
      name: (
        <>
          Format
        </>
      ),
      cell: (row) => (
        <>
          {row.form}
        </>
      ),
      selector: (row) => row.form,
      sortable: true,
      width: "95px",
      reorder: true,
      hide: "sm",
    },
    {
      name: (
        <>
          Max DDR
          <br />
          (GB)
        </>
      ),
      selector: (row) => row.memory_max_supported,
      sortable: true,
      width: "77px",
      reorder: true,
      hide: "md",
    },
    {
      name: (
        <>
          Long.
          <br />
          (mm)
        </>
      ),
      selector: (row) => row.length,
      sortable: true,
      width: "60px",
      reorder: true,
      hide: "lg",
    },
    {
      name: (
        <>
          Larg.
          <br />
          (mm)
        </>
      ),
      selector: (row) => row.width,
      sortable: true,
      width: "60px",
      reorder: true,
      hide: "lg",
    },
    {
      name: <>Slot DDR</>,
      selector: (row) => row.memory_slots,
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "md",
    },
    {
      name: <>Type DDR</>,
      selector: (row) => row.memory_type,
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "md",
    },
    {
      name: <>Wifi</>,
      cell: (row) => (
        <>
          {row.wireless}
        </>
      ),
      selector: (row) => row.wireless,
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
        <NavLink to={`/compare/product/${row.Id_article}`}>
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
  const [selectedChipsets, setSelectedChipsets] = useState(initialChipsets);
  const [chipsets, setChipsets] = useState([]);
  // Trouver tous les chipsets uniques :
  useEffect(() => {
    const uniqueChipsets = [
      ...new Set(data?.data?.map((item) => item.chipset)),
    ];
    setChipsets(uniqueChipsets);
  }, [data]);
  function handleButtonClickChipset(chipset) {
    // déjà click ?
    if (selectedChipsets.includes(chipset)) {
      // oui: on supprime
      setSelectedChipsets((prev) =>
        prev.filter((selected) => selected !== chipset)
      );
    } else {
      // non on ajoute
      setSelectedChipsets((prev) => [...prev, chipset]);
    }
  }


  // filter formats logic:
  const [selectedFormats, setSelectedFormats] = useState(initialFormats);
  const [formats, setFormats] = useState([]);
  // Trouver tous les chipsets uniques :
  useEffect(() => {
    const uniqueFormats = [
      ...new Set(data?.data?.map((item) => item.form)),
    ];
    setFormats(uniqueFormats);
  }, [data]);
  function handleButtonClickFormat(form) {
    // déjà click ?
    if (selectedFormats.includes(form)) {
      // oui: on supprime
      setSelectedFormats((prev) =>
        prev.filter((selected) => selected !== form)
      );
    } else {
      // non on ajoute
      setSelectedFormats((prev) => [...prev, form]);
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
  const handlePriceChange = useCallback(({ min, max }) => {
    if (min !== priceRange[0] || max !== priceRange[1]) {
      setPriceRange([min, max]);
    }
  }, [priceRange]);
  // console.log(priceRange)


  // On maj les url params en fonction des filtres
  useEffect(() => {
    // get current URL params
    const searchParams = new URLSearchParams(location.search);
    // update the selected chipsets filter
    searchParams.set("chipsets", selectedChipsets.join(","));
    // update the selected marques filter
    searchParams.set("marques", selectedMarques.join(","));
    // update the selected formats filter
    searchParams.set("formats", selectedFormats.join(","));
    // update the URL with the new params
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [selectedChipsets, selectedMarques, selectedFormats]);

  // On maj ici tous les filtres actifs.
  useEffect(() => {
    if (
      selectedMarques.length > 0 ||
      selectedChipsets.length > 0 ||
      selectedFormats.length > 0 ||
      (priceRange[0] !== null && priceRange[1] !== null)
    ) {
      let filtered = data?.data;
      if (selectedMarques.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedMarques.includes(item.marque)
        );
      }
      if (selectedChipsets.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedChipsets.includes(item.chipset)
        );
      }
      if (selectedFormats.length > 0) {
        filtered = filtered?.filter((item) =>
          selectedFormats.includes(item.form)
        );
      }
      if (priceRange[0] !== null && priceRange[1] !== null) {
        filtered = filtered?.filter((item) => {
          const latestPrice = item.latest_price;
          return latestPrice >= priceRange[0] && latestPrice <= priceRange[1];
        });
      }
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedMarques, selectedChipsets, selectedFormats, data, priceRange]);
  

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
          <h1>Cherchez votre carte mère</h1>
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
          <STYLEDChipsetFilterContainer>
            Chipsets:
            <hr />
            {chipsets.map((chipset, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickChipset(chipset)}
                className={selectedChipsets.includes(chipset) ? "active" : ""}
              >
                {chipset}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedChipsets([])}>
              Tous
            </STYLEDButton>
          </STYLEDChipsetFilterContainer>
          <STYLEDFormatsFilterContainer>
            Formats:
            <hr />
            {formats.map((format, index) => (
              <STYLEDButton
                key={index}
                onClick={() => handleButtonClickFormat(format)}
                className={selectedFormats.includes(format) ? "active" : ""}
              >
                {format}
              </STYLEDButton>
            ))}
            <STYLEDButton width="100%" onClick={() => setSelectedFormats([])}>
              Tous
            </STYLEDButton>
          </STYLEDFormatsFilterContainer>
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

export default Cartesmere;

const STYLEDMarqueFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDChipsetFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDFormatsFilterContainer = styled.div`
  padding-top: 15%;
  text-align: center;
`;
const STYLEDPriceFilterContainer = styled.div`
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
