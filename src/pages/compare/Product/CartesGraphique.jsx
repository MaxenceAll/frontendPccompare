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
      // maxwidth: "350px",
    },
    {
      name: "Marque",
      selector: (row) => row.marque,
      sortable: true,
      width: "100px",
    },
    {
      name: "Chipset",
      selector: (row) => row.chipset,
      sortable: true,
      width: "94px",
      hide: "sm",
    },
    {
      name: "VRAM",
      selector: (row) => row.memory_vram,
      sortable: true,
      width: "72px",
      hide: "md",
    },
    {
      name: "Clock",
      selector: (row) => row.gpu_clock,
      sortable: true,
      width: "79px",
      hide: "lg",
    },
    {
      name: "Boost",
      selector: (row) => row.boost_clock,
      sortable: true,
      width: "79px",
      hide: "lg",
    },
    {
      name: "Couleur",
      selector: (row) => row.color,
      sortable: true,
      width: "94px",
      hide: "lg",
    },
    {
      name: "Taille",
      selector: (row) => row.length,
      sortable: true,
      width: "86px",
      hide: "lg",
    },
    {
      name: "Prix",
      selector: (row) => row.latest_price,
      sortable: true,
      width: "90px",
      right: true,
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

  // filter marque logic:
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMarque, setSelectedMarque] = useState("");
  const [marques, setMarques] = useState([]);
  console.log(filteredData)
  console.log(selectedMarque)
  // console.log(marques)
  useEffect(() => {
    // loop through the data array and find the unique marques
    const uniqueMarques = [...new Set(data?.data?.map((item) => item.marque))];
    setMarques(uniqueMarques);
  }, [data]);
  //
  function handleButtonClick(marque) {
    setSelectedMarque(marque);
  }
  useEffect(() => {
    // filter the data array based on the selected marque
    if (selectedMarque !== "") {
      const filtered = data?.data?.filter((item) => item.marque === selectedMarque);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMarque, data]);

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


  useEffect(() => {
    if (!isLoading && !isError && data) {
      // filter the data array based on the selected marque
      if (selectedMarque !== "") {
        const filtered = data?.data?.filter((item) => item.marque === selectedMarque);
        setFilteredData(filtered);
      } else {
        setFilteredData(data?.data);
      }
    }
  }, [selectedMarque, isLoading, isError, data]);

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
          <h1>Cherchez votre carte graphique</h1>({filteredData.length}/{data?.data?.length}{" "}
          trouvées)
        </STYLEDCompareTitle>
        <STYLEDCompareFilter>
          <STYLEDMarqueFilterContainer>
            Différentes Marques
            <hr />
            {marques?.map((marque) => (
              <STYLEDButton
              key={marque}
              onClick={() => handleButtonClick(marque)}
              >
                {marque}
              </STYLEDButton>
            ))}
            <STYLEDButton
            width="100%"
            onClick={() => handleButtonClick("")}
            >Toutes</STYLEDButton>
            {/* <STYLEDSelect onChange={handleSelectChange}>
            <option value="">Tous</option>
              {marques?.map((marque) => (
                <option key={marque} value={marque}>
                  {marque}
                </option>
              ))}
            </STYLEDSelect> */}
          </STYLEDMarqueFilterContainer>
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
            // dense
          />
        </STYLEDCompareResult>
      </STYLEDCompareContainer>
    </>
  );
}

export default CartesGraphique;

const STYLEDMarqueFilterContainer = styled.div``;

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
