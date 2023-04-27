import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDhr } from "../styles/genericHR";

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
    <CardContainer>
      <CardImage alt={img_alt} src={img_src} />
      <CardTitle>{import.meta.env.VITE_APP_NAME}</CardTitle>
      <STYLEDhr/>
      <CardDescription>{description}</CardDescription>
      <CardLongDescription>{long_description}</CardLongDescription>
      <NavLink to={navigate_to}>
        <CardButton width={"100%"} height={"30px"}>
          {button_text}
        </CardButton>
      </NavLink>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--background-color-200);
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  width: 280px;
  height: 600px;
  margin: 2%;

  display: flex;
  flex-direction: column; /* arrange child components vertically */
  justify-content: space-between; /* push child components apart */
`;

const CardImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 4px;
`;

const CardTitle = styled.h1`
  font-size: 1.5rem;
  text-align:center;
  /* margin-top: 20px;
  margin-bottom: 10px; */
  /* margin-bottom: 20px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardDescription = styled.div`
  font-size: 1rem;
  /* margin-bottom: 20px; */
  
`;
const CardLongDescription = styled.div`
  font-size: 0.5rem;
  /* margin-bottom: 20px; */
  
`;

const CardButton = styled.button`
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  border-radius: 10px;
  color: var(--main-color-100);
  background-color: var(--background-color-200);

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    color: var(--main-color-300);
    background-color: var(--background-color-300);

    transform: translateY(-3px);
    box-shadow: 0 6px 4px rgba(0, 0, 0, 0.2);
  }
  align-self: flex-end; /* align button to the right */
`;