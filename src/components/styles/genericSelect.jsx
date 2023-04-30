import styled from "styled-components";

export const STYLEDSelect = styled.select`
text-align: center;
background: var(--background-color-100);
color: var(--main-color-100);
border: 1px solid var(--main-color-100);
border-radius: 50px;

&:hover {
  background: var(--background-color-300);
  color: var(--main-color-300);
  border: 1px solid var(--main-color-300);
}

option {
  background-color: var(--background-color-400);
  color: var(--main-color-100);
  &:hover {
    background: var(--background-color-300);
    color: var(--main-color-300);
    border: 1px solid var(--main-color-300);
  }
}
`;
