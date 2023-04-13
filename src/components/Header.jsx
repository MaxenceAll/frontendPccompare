import styled from "styled-components";
import {
  HiUser,
  HiInformationCircle,
  HiCog,
  HiAdjustments,
  HiHome,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

import { GiComputerFan } from "react-icons/gi";
import { FaWrench, FaSearchDollar } from "react-icons/fa";

function Header() {
  return (
    <nav>
      <DIV_LayoutHeader>
        <NavLink to="/">
          <DIV_AppTitle>
          <GiComputerFan />
          {import.meta.env.VITE_APP_NAME}
          </DIV_AppTitle>
        </NavLink>

        <DIV_HeaderBtnContainer>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            <HiHome />
            <SPAN_HiddenMobile className="hide-mobile">Home</SPAN_HiddenMobile>
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            <HiUser />
            <SPAN_HiddenMobile className="hide-mobile">Login</SPAN_HiddenMobile>
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            <FaWrench />
            <SPAN_HiddenMobile className="hide-mobile">
              Register
            </SPAN_HiddenMobile>
          </NavLink>

          <NavLink
            to="/themes"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            <HiAdjustments />
            <SPAN_HiddenMobile className="hide-mobile">Theme</SPAN_HiddenMobile>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            <HiInformationCircle />
            <SPAN_HiddenMobile className="hide-mobile">
              Apropos
            </SPAN_HiddenMobile>
          </NavLink>
        </DIV_HeaderBtnContainer>
      </DIV_LayoutHeader>

      <DIV_SecondaryNavBarContainer>
        <NavLink to="/builder">
          <div>
            <FaWrench />
            Construire
          </div>
        </NavLink>
        <NavLink to="/search">
          <div>
            <FaSearchDollar />
            Rechercher
          </div>
        </NavLink>
      </DIV_SecondaryNavBarContainer>
    </nav>
  );
}

export default Header;

const DIV_SecondaryNavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-right: 2px solid var(--background-color-200);
    border-left: 2px solid var(--background-color-200);
    border-bottom: 2px solid var(--background-color-200);
    padding: 15%;
  }
  div:hover {
    background-color: var(--background-color-100);
    color: var(--main-color-300);
  }
`;

const DIV_LayoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: var(--background-color-100) 2px solid;
  background-color: var(--background-color-300);
`;
const SPAN_HiddenMobile = styled.span`
  @media only screen and (max-width: 650px) {
    display: none;
  }
`;
const DIV_AppTitle = styled.div`
  font-size: 2rem;
`;

const DIV_HeaderBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 80px;
  gap: 5%;
  padding-left: 2%;
  padding-right: 2%;
  @media only screen and (max-width: 650px) {
    font-size: 2rem;
  }

  .active-link {
    text-decoration: underline;
    background-color: var(--secondary-color-200);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding-left: 2%;
    padding-right: 2%;
    text-transform: uppercase;
  }
`;
