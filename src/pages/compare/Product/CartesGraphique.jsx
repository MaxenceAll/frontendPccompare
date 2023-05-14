import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useGetAllGpuDataQuery } from "../../../features/pccompareSlice";
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
import { RatingStars } from "../../../components/Notes/RatingStars";

function CartesGraphique() {
  const { data, isLoading, isError } = useGetAllGpuDataQuery("gpu");

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
  const initialCouleurs = searchParams.get("couleurs")
    ? searchParams.get("couleurs").split(",")
    : [];

  console.log(data);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes graphique`;
  }, []);

  // Helper function to convert nb_note to stars
const getStars = (nb_note) => {
  switch (nb_note) {
    case 1:
      return "⭐";
    case 2:
      return "⭐⭐";
    case 3:
      return "⭐⭐⭐";
    case 4:
      return "⭐⭐⭐⭐";
    case 5:
      return "⭐⭐⭐⭐⭐";
    default:
      return "";
  }
};

  // Table logic:
  const columns = [
    {
      cell: (row) => (
        <>
            <img
              style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              height="auto"
              width="56px"
              alt={row.img_alt}
              src={row.img_src}
            />
        </>
      ),
      width: "60px",
    },
    {
      name: "Nom",
      selector: (row) => (
        <NavLink to={`/compare/product/gpu/${row.Id_article}`}>
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
    },
    {
      name: "Chipset",
      selector: (row) => row.chipset,
      sortable: true,
      width: "94px",
      hide: "sm",
      reorder: true,
    },
    {
      name: (
        <>
          VRAM
          <br />
          (GB)
        </>
      ),
      selector: (row) => row.memory_vram,
      sortable: true,
      width: "70px",
      reorder: true,
      hide: "md",
    },
    {
      name: (
        <>
          Freq.
          <br />
          (mHz)
        </>
      ),
      selector: (row) => row.gpu_clock,
      sortable: true,
      width: "76px",
      hide: "lg",
      reorder: true,
    },
    {
      name: (
        <>
          Boost
          <br />
          (mHz)
        </>
      ),
      selector: (row) => row.boost_clock,
      sortable: true,
      width: "77px",
      hide: "lg",
      reorder: true,
    },
    {
      name: (
        <>
          Longueur
          <br />
          (mm)
        </>
      ),
      selector: (row) => row.length,
      sortable: true,
      width: "100px",
      hide: "lg",
      reorder: true,
    },
    {
      name: <>Couleur</>,
      selector: (row) => row.color,
      sortable: true,
      width: "92px",
      hide: "lg",
      reorder: true,
    },
    {
      name: "Prix",
      cell: (row) => (
        <>
        {row.latest_price != null ? row.latest_price + "€" : ""}
        </>
      ),
      selector: (row) =>
        row.latest_price,
      sortable: true,
      width: "95px",
      right: true,
      reorder: true,
    },
    {
      cell: (row) => (
        <RatingStars rating={(row.nb_note_1 + row.nb_note_2*2 + row.nb_note_3*3 + row.nb_note_4*4 + row.nb_note_5*5) / (row.nb_note_1 + row.nb_note_2 + row.nb_note_3 + row.nb_note_4 + row.nb_note_5)} />
      ),
      name: "Note",
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      cell: (row) => (
        <NavLink to={`/compare/product/gpu/${row.Id_article}`}>
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
    const prices = data?.data.map((item) => item.latest_price);
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
    // update the selected couleur filter
    searchParams.set("couleurs", selectedCouleurs.join(","));
    // update the URL with the new params
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [selectedChipsets, selectedMarques, selectedCouleurs]);

  // On maj ici tous les filtres actifs.
  useEffect(() => {
    if (
      selectedMarques.length > 0 ||
      selectedChipsets.length > 0 ||
      selectedCouleurs.length > 0 ||
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
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedMarques, selectedChipsets, selectedCouleurs, data, priceRange]);
  

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
          <h1>Cherchez votre carte graphique</h1>
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
const STYLEDChipsetFilterContainer = styled.div`
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
