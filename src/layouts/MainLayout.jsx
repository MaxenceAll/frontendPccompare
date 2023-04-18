
import styled from "styled-components";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <DIV_AppContainer className="app-container">

      <Header />
      {/* <Header /> */}

      <main>
        <Outlet />
      </main>

      <Footer />

    </DIV_AppContainer>
  );
}

const DIV_AppContainer = styled.div`
  background-color: var(--background-color-100);
    min-width:100dvw;
`;
