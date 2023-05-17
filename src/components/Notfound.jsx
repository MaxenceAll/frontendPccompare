import { Link } from "react-router-dom";
import notFound from "../assets/errors/404NotFound.gif";
import styled from "styled-components";

export default function NotFound() {
  return (
    <STYLEDNotFoundContainer>
      <img src={notFound} />
      <h1>Oops, cette page n'existe pas !</h1>
      <Link to="/">Retour page principale</Link>
    </STYLEDNotFoundContainer>
  );
}

const STYLEDNotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
