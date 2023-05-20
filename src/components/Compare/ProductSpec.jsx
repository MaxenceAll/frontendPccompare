import React from "react";
import styled from "styled-components";
import { STYLEDhr } from "../styles/genericHR";

function ProductSpec(props) {
  const { spec } = props;
  // console.log(spec);
  const specs = Object.entries(spec).map(([key, value]) => {
    if (ignoreKeys_gpu.includes(key)) {
      return null;
    } else {
      const friendlyName = getFriendlyName(key);
      const suffix = suffixTable[key] || "";
      const displayValue = value ? value + suffix : "---";
      return (
        <div key={key}>
          <STYLED_Spec_key>{friendlyName}:</STYLED_Spec_key>
          <STYLED_Spec_value>{displayValue}</STYLED_Spec_value>
          <STYLEDhr />
        </div>
      );
    }
  });

  return (
    <STYLED_Spec_content>
      <STYLED_Spec_title><h3>Specifications:</h3></STYLED_Spec_title>
      <div>{specs}</div>
    </STYLED_Spec_content>
  );
}

export default ProductSpec;

// Function to get the user-friendly name of a key
const getFriendlyName = (key) => {
  return friendlyNames[key] || key;
};

// Keys a ignorer
const ignoreKeys_gpu = [
  "img_src",
  "img_alt",
  "Id_model",
  "Id_category",
  "Id_article",
  "code",
  "img_src_category",
  "img_alt_category",
  "Id_gpu",
  "Id_cpu",
  "Id_mb",
  "Id_ram",
  "nb_note",
  "nb_note_1",
  "nb_note_2",
  "nb_note_3",
  "nb_note_4",
  "nb_note_5",
];

// Map pour affichage userfriendly
const friendlyNames = {
  // ALL
  latest_price: "Dernier prix ajouté",
  // GPU
  product_number: "Référence produit",
  designation: "Nom du produit",
  model_name: "Modèle",
  marque: "Marque",
  category_name: "Type",
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
  // CPU:
  cpu_frequency: "Fréquence Base",
  turbo_frequency: "Fréquence Turbo",
  nb_core: "Nombre de coeur",
  nb_thread: "Nombre de thread",
  plateform_cpu: "Plate-forme",
  core_name: "Nom de code",
  lithography: "Finesse gravure",
  cache_l2: "Cache L2",
  cache_l3: "Cache L3",
  integrated_gpu: "CarteVidéo intégré",
  chipset_gpu: "Nom du chiptset vidéo",
  controller_type: "Type de controlleur",
  ddr4_max: "DDR4 max",
  ddr5_max: "DDR5 max",
  socket: "Socket",
  // MB:
  memory_slots: "Slot mémoire",
  memory_max_supported: "Fréquence mémoire maxi",
  max_capacity_per_slot: "Maximum par slot",
  memory_type: "Type de mémoire",
  channel: "Technologie mémoire",
  max_capacity: "Capacité maximale",
  pci16_slot3_0: "Nombre de slot pci16 3.0",
  pci16_slot4_0: "Nombre de slot pci16 4.0",
  pci16_slot5_0: "Nombre de slot pci16 5.0",
  pci1_slot3_0:"Nombre de slot pci1 3.0",
  pci1_slot4_0:"Nombre de slot pci1 4.0",
  pci1_slot5_0:"Nombre de slot pci1 5.0",
  audio_chipset:"Chipset Audio",
  audio_channel:"Nombre canaux audio",
  lan_controller: "Controlleur réseau",
  bluetooth: "Bluetooth",
  wireless:"Wifi",
  m2_slot3_0: "Nombre de slot m2 3.0",
  m2_slot4_0: "Nombre de slot m2 4.0",
  m2_slot5_0: "Nombre de slot m2 5.0",
  sata_slot: "Slot sata",
  fan_connector:"Prise ventilo",
  hdmi:"Nombre HDMI",
  displayport:"Nombre DisplayPort",
  usb3_2c: "Nombre de port USB-c 3.2",
  usb3_1c:"Nombre de port USB-c 3.1",
  usb3_1:"Nombre de port USB 3.1",
  usb3_0:"Nombre de port USB 3.0",
  usb2_0:"Nombre de port USB 2.0",
  form:"Format boitier",
  //RAM:
  form_factor: "Format de mémoire",
  capacity: "Capacité",
  frequency: "Fréquence",
  modules_number: "Nombre de barrettes",
  module_capacity: "Capacité par barrette",
  rgb: "RGB",
  cl: "CAS Latency",
  trcd:"RAS to CAS Delay",
  trp:"RAS Precharge Time",
  tras:"RAS Active Time",
  voltage:"Voltage",

};
// Map pour les unités en suffix
const suffixTable = {
  // GPU
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
  tdp: " W",
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
  // CPU:
  cpu_frequency: "Hz",
  turbo_frequency: "Hz",
  nb_core: " coeurs",
  nb_thread: " threads",
  plateform_cpu: "",
  core_name: "",
  lithography: " nm",
  cache_l2: " Mo",
  cache_l3: " Mo",
  integrated_gpu: "",
  chipset_gpu: "",
  controller_type: "",
  ddr4_max: " Mhz",
  ddr5_max: " Mhz",
  // MB:
  memory_slots: "",
  memory_max_supported: " Mhz",
  max_capacity_per_slot: " Go",
  memory_type: "",
  channel: "",
  max_capacity: " Go",
  pci16_slot3_0: "",
  pci16_slot4_0: "",
  pci16_slot5_0: "",
  pci1_slot3_0:"",
  pci1_slot4_0:"",
  pci1_slot5_0:"",
  audio_chipset:"",
  audio_channel:"",
  lan_controller: "",
  bluetooth: "",
  wireless:"",
  m2_slot3_0: "",
  m2_slot4_0: "",
  m2_slot5_0: "",
  sata_slot: "",
  fan_connector:"",
  hdmi:"",
  displayport:"",
  usb3_2c: "",
  usb3_1c:"",
  usb3_1:"",
  usb3_0:"",
  usb2_0:"",
  form:"",
  //RAM:
  form_factor: "",
  capacity: " Go",
  frequency: " Mhz",
  modules_number: " unité(s)",
  module_capacity: " Go",
  rgb: "",
  cl: "",
  trcd:"",
  trp:"",
  tras:"",
  voltage:" mV",
};


const STYLED_Spec_content = styled.div`
text-align: center;
  font-size: 0.8rem;
  box-shadow: -32px 0px 70px -13px rgba(0,0,0,0.5),inset 20px 20px 15px 0px rgba(0,0,0,0.1),inset -20px -20px 15px -3px rgba(0,0,0,0.1),inset -20px 20px 15px 0px rgba(0,0,0,0.1);  border-radius: 15px;
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
