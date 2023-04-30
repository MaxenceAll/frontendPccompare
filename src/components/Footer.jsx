import styled from "styled-components";
import { DateDuJour } from "./Tools/DateDuJour";

function Footer() {
  return (
    <FOOTER_Container>
      © {import.meta.env.VITE_APP_NAME}
      <DateDuJour />
      {import.meta.env.VITE_APP_NAME} © 
    </FOOTER_Container>
  );
}

export default Footer;

const FOOTER_Container = styled.footer`
  border-top: 2px solid var(--background-color-200);
  display: flex;
  justify-content: space-between;
  padding: 2%;
  padding-top: 5%;
  
`;
