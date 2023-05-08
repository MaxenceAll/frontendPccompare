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
import DataTable, { createTheme } from "react-data-table-component";

function CartesGraphique() {
  const { data, isLoading, isError } = useGetAllGpuDataQuery();
  const [formattedData, setFormattedData] = useState([]);

  console.log(data);

    // format the data and set the state
    useEffect(() => {
      if (data) {
        const formatted = formatData(data.data);
        setFormattedData(formatted);
      }
    }, [data]);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes graphique`;
  }, []);

  const formatData = (data) => {
    if (!data) {
      return [];
    }
    return data.map((item) => {
      return {
        id: item.Id_article,
        product_number: item.product_number,
        designation: item.designation,
        marque: item.marque,
        img_src: item.img_src,
        img_alt: item.img_alt,
        model_name: item.model_name,
        category_name: item.category_name,
        code: item.code,
        ean: item.ean,
        upc: item.upc,
        chipset: item.chipset,
        color: item.color,
        gpu_clock: item.gpu_clock,
        boost_clock: item.boost_clock,
        memory_clock: item.memory_clock,
        bus_interface: item.bus_interface,
        bus_width: item.bus_width,
        memory_vram: item.memory_vram,
        slot_width: item.slot_width,
        length: item.length,
        width: item.width,
        height: item.height,
        tdp: item.tdp,
        psu_needed: item.psu_needed,
        nb_hdmi: item.nb_hdmi,
        nb_dp: item.nb_dp,
        nb_usbc: item.nb_usbc,
        power_connector: item.power_connector,
        pixel_rate: item.pixel_rate,
        texture_rate: item.texture_rate,
        fp32: item.fp32,
        shader: item.shader,
        tmu: item.tmu,
        rop: item.rop,
        sm_cu: item.sm_cu,
        tensor_cores: item.tensor_cores,
        rt_cores: item.rt_cores,
        latest_price: item.latest_price,
      };
    });
  };

  // const formattedData = formatData(data?.data);

  const columns = [
    // {
    //   name: "Product Number",
    //   selector: "product_number",
    //   sortable: true,
    // },

    {
      cell: (row) => (<><img height="auto" width="56px" alt={row.img_alt} src={`https://picsum.photos/id/${row.id}/5000/3333`}></img></>
      ),
      width: "60px",
    },

    {
      name: "Nom",
      selector: (row) => (
        <NavLink to={`/compare/product/${row.id}`}>
          {row.designation}
        </NavLink>
      ),
      sortable: true,
      // width: "350px",
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
      hide: 'sm',
    },
    {
      name: "VRAM",
      selector: (row) => row.memory_vram,
      sortable: true,
      width: "72px",
      hide: 'md',
    },
    {
      name: "Clock",
      selector: (row) => row.gpu_clock,
      sortable: true,
      width: "79px",
      hide: 'lg',
    },
    {
      name: "Boost",
      selector: (row) => row.boost_clock,
      sortable: true,
      width: "79px",
      hide: 'lg',      
    },
    {
      name: "Couleur",
      selector: (row) => row.color,
      sortable: true,
      width: "94px",
      hide: 'md',
    },
    {
      name: "Taille",
      selector: (row) => row.length,
      sortable: true,
      width: "86px",
      hide: 'md',
    },
    {
      name: "Prix",
      selector: (row) => row.latest_price,
      sortable: true,
      width: "90px",
      right:true,
    },
    {
      cell: (row) => (
        <NavLink to={`/compare/product/${row.id}`}>
          <STYLEDButton>Voir la fiche</STYLEDButton>
        </NavLink>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "60px",
    },

    // {
    //   name: "Memory Clock",
    //   selector: "memory_clock",
    //   sortable: true,
    // },
    // {
    //   name: "Bus Interface",
    //   selector: "bus_interface",
    //   sortable: true,
    // },
    // {
    //   name: "TDP",
    //   selector: "tdp",
    //   sortable: true,
    // },
    // {
    //   name: "Power Connector",
    //   selector: "power_connector",
    //   sortable: true,
    // },
    // {
    //   name: "SM/CU",
    //   selector: "sm_cu",
    //   sortable: true,
    // },
    // {
    //   name: "Tensor Cores",
    //   selector: "tensor_cores",
    //   sortable: true,
    // },
    // {
    //   name: "RT Cores",
    //   selector: "rt_cores",
    //   sortable: true,
    // },
  ];

  // table options :
  const paginationOptions = {
    rowsPerPageText: "Produit par page",
    rangeSeparatorText: "de",
  };

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
        color:"var(--main-color-100)" ,
        backgroundColor: "var(--background-color-400)",
        borderBottomColor: "var(--main-color-100)",
        // borderRadius: "25px",
        outline: "1px solid var(--main-color-100)",
      },
      stripedStyle: {
        color: "var(--main-color-100)",
        backgroundColor: "var(--background-color-100)"
      }
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };


  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

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
        </STYLEDCompareTitle>
        <STYLEDCompareFilter>Filter box</STYLEDCompareFilter>
        <STYLEDCompareResult>
          <DataTable
            title={`${formattedData?.length} cartes graphique trouvées.`}
            columns={columns}
            data={formattedData}
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

const STYLEDCompareContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto;
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
  background-color: yellow;
  grid-area: title;

  background-color: var(--background-color-400);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  border-top: 1px solid var(--secondary-color-300);
  height: 100px;
`;

const STYLEDCompareFilter = styled.div`
  background-color: red;
  grid-area: filter;
`;

const STYLEDCompareResult = styled.div`
  background-color: green;
  grid-area: result;
`;
