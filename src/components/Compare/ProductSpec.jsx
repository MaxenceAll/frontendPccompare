import React from "react";
import styled from "styled-components";
import { STYLEDhr } from "../styles/genericHR";

function ProductSpec(props) {
  const { spec } = props;
  console.log(spec);
  const specs = Object.entries(spec).map(([key, value]) => {
    if (key === "Id_gpu" || key === "Id_article") {
      return null;
    } else {
      const friendlyName = getFriendlyName(key);
      const suffix = suffixTable[key] || "";
      const displayValue = value ? value + suffix : "---";
      return (
        <div key={key}>
          <STYLED_Spec_key>{friendlyName}:</STYLED_Spec_key>
          <STYLED_Spec_value>{displayValue}</STYLED_Spec_value>
          <hr />
        </div>
      );
    }
  });

  return (
    <STYLED_Spec_content>
      <STYLED_Spec_title>Specifications:</STYLED_Spec_title>
      <div>{specs}</div>
    </STYLED_Spec_content>
  );
}

export default ProductSpec;

// Map pour affichage userfriendly
const friendlyNames = {
  ean: "Numéro [EAN]",
  upc: "Numéro [UPC]",
  chipset: "Chipset",
  color: "Couleur",
  gpu_clock: "Fréquence GPU",
  boost_clock: "Fréquence Boost",
  memory_clock: "Fréquence mémoire",
  bus_interface: "Interface de bus",
  bus_width: "Largeur de bus",
  memory_vram: "Mémoire vidéo",
  slot_width: "Largeur de slot",
  length: "Longueur",
  width: "Largeur",
  height: "Hauteur",
  tdp: "Puis. de concep. therm.",
  psu_needed: "Alimentation nécessaire",
  nb_hdmi: "Nombre de ports HDMI",
  nb_dp: "Nombre de ports DisplayPort",
  nb_usbc: "Nombre de ports USB-C",
  power_connector: "Connecteur d'alimentation",
  pixel_rate: "Taux de pixels",
  texture_rate: "Taux de textures",
  fp32: "Performances FP32",
  shader: "Unités de shaders",
  tmu: "Unités de texture",
  rop: "Raster Op Units",
  sm_cu: "SM/CU",
  tensor_cores: "Cœurs Tensor",
  rt_cores: "Cœurs RT",
};
// Map pour les unités en suffix
const suffixTable = {
  chipset: "",
  color: "",
  gpu_clock: " MHz",
  boost_clock: " MHz",
  memory_clock: " MHz",
  bus_interface: "",
  bus_width: "-bit",
  memory_vram: " GB",
  slot_width: "",
  length: " mm",
  width: " mm",
  height: " mm",
  tdp: "",
  psu_needed: " Watts",
  nb_hdmi: "",
  nb_dp: "",
  nb_usbc: "",
  power_connector: "",
  pixel_rate: " GP/s",
  texture_rate: " GT/s",
  fp32: " TFLOPS",
  shader: "",
  tmu: "",
  rop: "",
  sm_cu: "",
  tensor_cores: "",
  rt_cores: "",
};


// Function to get the user-friendly name of a key
const getFriendlyName = (key) => {
  return friendlyNames[key] || key;
};

const STYLED_Spec_content = styled.div`
  font-size: 0.8rem;
`;

const STYLED_Spec_title = styled.div`
  text-decoration: underline;
  text-align: center;
  padding: 5%;
`;

const STYLED_Spec_key = styled.div`
  font-weight: bold;
`;

const STYLED_Spec_value = styled.div`
  text-align: center;
`;
