import styled from "styled-components";

export const STYLEDButton = styled.button`
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
  &:disabled {
    cursor: not-allowed;
    background-color: var(--background-color-400);
    color: var(--main-color-200);
  }
  &.active {
    color: var(--background-color-300);
    background-color: var(--main-color-300);
  }
`;
