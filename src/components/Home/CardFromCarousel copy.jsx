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
  long_description,
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
      <STYLEDCardLongDescription>{long_description}</STYLEDCardLongDescription>
      <STYLEDCardButton>
        <NavLink to={navigate_to}>
          <STYLEDButton width="450px" height="50px">
            {button_text}
          </STYLEDButton>
        </NavLink>
      </STYLEDCardButton>
    </STYLEDCard>
  );
}

const STYLEDCard = styled.div`
  position: relative;
  width: 450px;
  height: 350px;
  padding: 5%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius:25px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

const STYLEDCardTitle = styled.div`
  position: absolute;
  left:28%;
  top: 15%;
  &:hover {
  }
`;
const STYLEDCardButton = styled.div`
  position: absolute;
  left: 8.2%;
  top: 79%;
  &:hover {
  }
`;
const STYLEDCardDescription = styled.div`
  position: absolute;
  left: 20%;
  top: 30%;
  &:hover {
  }
`;
const STYLEDCardLongDescription = styled.div`
  /* display: none; */
  width: 300px;
  position: absolute;
  left: 15%;
  top: 40%;
  &:hover {
    display: inline;
  }
`;
