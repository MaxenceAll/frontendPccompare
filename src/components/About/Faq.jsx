import React from "react";
import { STYLEDContainerBox } from "../styles/genericContainer";
import styled from "styled-components";

function Faq() {
  return (
    <STYLEDContainerBox>
      <STYLEDFaqContent>Ici prévoir une FAQ</STYLEDFaqContent>
    </STYLEDContainerBox>
  );
}

export default Faq;

const STYLEDFaqContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
