import styled, { keyframes } from "styled-components";


const appearAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;


export const STYLEDErrorMessage = styled.p` 
    font-size: 0.8rem;
    font-style: italic;
  color: white;
  background-color: #B30000;

  animation: ${appearAnimation} 0.1s linear 5;
`;