import styled from "styled-components";

export const STYLEDhr = styled.hr`
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || ""};
  
  color: var(--main-color);
  background-color: var(--background-color);

  border: 1px solid var(--main-color);

`;
