import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useGetAllGpuDataQuery } from "../../../features/pccompareSlice";
import Loader from "../../../components/Tools/Loader";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../../components/styles/genericContainer";
import { STYLEDErrorMessage } from "../../../components/styles/genericParagraphError";
import { NavLink, redirect } from "react-router-dom";
import { STYLEDButton } from "../../../components/styles/genericButton";
import { STYLEDSelect } from "../../../components/styles/genericSelect";
import DataTable, { createTheme } from "react-data-table-component";
import NoDataFound from "../../../components/NoDataFound";

function CartesGraphique() {
  const { data, isLoading, isError } = useGetAllGpuDataQuery();

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes graphique`;
  }, []);

  const columns = [
    {
      cell: (row) => (
        <>
          <img
            height="auto"
            width="56px"
            alt={row.img_alt}
            src={`https://picsum.photos/id/${row.Id_article}/5000/3333`}
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
      name: "VRAM",
      selector: (row) => row.memory_vram,
      sortable: true,
      width: "72px",
      reorder: true,
      hide: "md",
    },
    {
      name: "Clock",
      selector: (row) => row.gpu_clock,
      sortable: true,
      width: "79px",
      hide: "lg",
      reorder: true,
    },
    {
      name: "Boost",
      selector: (row) => row.boost_clock,
      sortable: true,
      width: "79px",
      hide: "lg",
      reorder: true,
    },
    {
      name: "Couleur",
      selector: (row) => row.color,
      sortable: true,
      width: "94px",
      hide: "lg",
      reorder: true,
    },
    {
      name: "Taille",
      selector: (row) => row.length,
      sortable: true,
      width: "86px",
      hide: "lg",
      reorder: true,
    },
    {
      name: "Prix",
      selector: (row) => row.latest_price,
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
  );

  // "copie" de data pour manipulations
  const [filteredData, setFilteredData] = useState(data?.data);
  // filter marque logic:
  const [selectedMarques, setSelectedMarques] = useState([]);
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
  const [selectedChipsets, setSelectedChipsets] = useState([]);
  const [chipsets, setChipsets] = useState([]);
  // console.log("selectedChipsets : ",selectedChipsets)
  // console.log("chipsets:",chipsets)
  // Trouver tous les chipsets uniques :
  useEffect(() => {
    const uniqueChipsets = [...new Set(data?.data?.map((item) => item.chipset))];
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


  // On maj ici tous les filtres actifs.
  useEffect(() => {
    if (selectedMarques.length > 0 || selectedChipsets.length > 0) {
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
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedMarques, selectedChipsets, data]);
  
  

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
          <h1>Cherchez votre carte graphique</h1>({filteredData?.length}/
          {data?.data?.length} trouvées)
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
            noDataComponent={<NoDataFound/>}
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
text-align:center;
`;
const STYLEDChipsetFilterContainer = styled.div`
padding-top: 15%;
text-align:center;
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
  height: 130px;
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
