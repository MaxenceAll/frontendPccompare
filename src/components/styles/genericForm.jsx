import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(360deg);
  }
`;

export const STYLEDForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  padding: 25px;
  display: flex;

  animation: ${rotateAnimation} 0.5s linear;
`;

