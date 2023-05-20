import React from "react";
import styled from "styled-components";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDButton } from "../styles/genericButton";

function ProductAlerts() {
  return (
    <>
      <STYLEDhr />
      M'envoyer un e-mail si le prix descend en dessous de : &nbsp;
      <STYLEDInput type="number"></STYLEDInput>
      <STYLEDButton onClick={() => alert("Pas encore fonctionnel ☺!")}>
        Définir l'alerte
      </STYLEDButton>
    </>
  );
}

export default ProductAlerts;