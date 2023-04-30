import styled from "styled-components";

export const STYLEDInput = styled.input`
  width: ${props => props.width || ""};
  height: ${props => props.height || ""};
  color: var(--main-color);
  background-color: var(--background-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--main-color);
  }
  &:read-only {
    cursor: not-allowed;
    background-color: var(--background-color-400);
    color: var(--main-color-200);
  }
`;

