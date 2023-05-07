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
import { NavLink } from "react-router-dom";
import { STYLEDButton } from "../../../components/styles/genericButton";
import DataTable from "react-data-table-component";

function CartesGraphique() {
  const { data, isLoading, isError } = useGetAllGpuDataQuery();

  console.log(data);

  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes graphique`;
  }, []);

  const formatData = (data) => {
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
      };
    });
  };

  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (data) {
      setFormattedData(formatData(data?.data));
    }
  }, [data]);

  const columns = [
    {
      name: "Product Number",
      selector: "product_number",
      sortable: true,
    },
    {
      name: "Designation",
      selector: "designation",
      sortable: true,
    },
    {
      name: "Marque",
      selector: "marque",
      sortable: true,
    },
    {
      name: "Chipset",
      selector: "chipset",
      sortable: true,
    },
    {
      name: "Memory VRAM",
      selector: "memory_vram",
      sortable: true,
    },
    {
      name: "GPU Clock",
      selector: "gpu_clock",
      sortable: true,
    },
    {
      name: "Boost Clock",
      selector: "boost_clock",
      sortable: true,
    },
    {
      name: "Memory Clock",
      selector: "memory_clock",
      sortable: true,
    },
    {
      name: "Bus Interface",
      selector: "bus_interface",
      sortable: true,
    },
    {
      name: "TDP",
      selector: "tdp",
      sortable: true,
    },
    {
      name: "Power Connector",
      selector: "power_connector",
      sortable: true,
    },
    {
      name: "SM/CU",
      selector: "sm_cu",
      sortable: true,
    },
    {
      name: "Tensor Cores",
      selector: "tensor_cores",
      sortable: true,
    },
    {
      name: "RT Cores",
      selector: "rt_cores",
      sortable: true,
    },
  ];

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
          {formattedData.length} cartes graphique trouvés.
          <DataTable columns={columns} data={formattedData} />
        </STYLEDCompareResult>
      </STYLEDCompareContainer>
    </>
  );
}

export default CartesGraphique;

const STYLEDCompareContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-areas:
    "title title title"
    "filter result result";
  gap: 0px;
  height: 100%;
  @media only screen and (max-width: 1000px) {
    grid-template-areas:
      "title title title"
      "filter filter filter"
      "result result result";
  }
`;

const STYLEDCompareTitle = styled.div`
  background-color: yellow;
  grid-area: title;

  background-color: var(--background-color-100);
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
