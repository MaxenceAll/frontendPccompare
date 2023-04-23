import React from "react";
import { NavLink } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDhr } from "../styles/genericHR";
import styled from "styled-components";

export default function CardFromCarousel({
  id,
  img_alt,
  img_src,
  description,
  button_text,
  navigate_to,
}) {
  return (
    // <STYLEDCard>
    //   <NavLink to={navigate_to}>
    //     <img alt={img_alt} src={img_src} />
    //     <STYLEDhr />
    //     <p>{description}</p>
    //     <STYLEDButton>{button_text}</STYLEDButton>
    //   </NavLink>
    // </STYLEDCard>
    <STYLEDCard>
      <img alt={img_alt} src={img_src} />
      <h1>
        <STYLEDCardTitle>{import.meta.env.VITE_APP_NAME}</STYLEDCardTitle>
      </h1>
      <STYLEDCardDescription>{description}</STYLEDCardDescription>
      <STYLEDCardButton>
        <STYLEDButton width="300px" height="50px">
          {button_text}
        </STYLEDButton>
      </STYLEDCardButton>
    </STYLEDCard>
  );
}

const STYLEDCard = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  padding: 5%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

const STYLEDCardTitle = styled.div`
  position: absolute;
  left: 15%;
  top: 20%;
  &:hover {
  }
`;
const STYLEDCardDescription = styled.div`
  position: absolute;
  left: 15%;
  top: 40%;
  &:hover {
  }
`;
const STYLEDCardButton = styled.div`
  position: absolute;
  left: 15%;
  top: 75%;
  &:hover {
  }
`;
