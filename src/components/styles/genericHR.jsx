import styled from "styled-components";

export const STYLEDhr = styled.hr`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || ""};

  /* color: var(--main-color); */
  /* color: ${(props)=> props.color || "var(--main-color)"}; */
  /* background-color: var(--background-color-100); */
  background-color: ${(props)=> props.bcolor || "var(--background-color-100)"};
  
  border: 1px solid var(--main-color-100);
  border-color: ${(props) => props.color || "var(--main-color-100)"};

`;
