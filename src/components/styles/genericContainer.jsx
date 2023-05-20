import styled, { keyframes } from "styled-components";

export const STYLEDContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  min-height: 250px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  padding: 2%;

  
`;



const appearAnimation = keyframes`
  from {
    transform: scale(0%);
  }
  to {
    transform: scale(100%);
  }
`;


export const STYLEDContainerBox = styled.div`

  width: 90%;
  max-width: 1000px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
  
  padding:2%;

  animation: ${appearAnimation} 0.5s linear;


`;