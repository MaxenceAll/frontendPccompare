import styled, { keyframes } from "styled-components";
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

import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import CPU_IMAGE from "../assets/generics/CPU.jpg";
import GPU_IMAGE from "../assets/generics/GPU.jpg";
import MEMORY_IMAGE from "../assets/generics/MEMORY.jpg";
import MB_IMAGE from "../assets/generics/MOTHERBOARD.jpg";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <HEADER_Container>
      <nav role="navigation">
        <DIV_TopHeader>
          <div>
            <NavLink to="/">
              <GiComputerFan />
              {import.meta.env.VITE_APP_NAME}
            </NavLink>
          </div>

          <DIV_LinksContainer>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <HiHome />
              <SPAN_HiddenMobile className="hide-mobile">
                Home
              </SPAN_HiddenMobile>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <HiUser />
              <SPAN_HiddenMobile className="hide-mobile">
                Login
              </SPAN_HiddenMobile>
            </NavLink>

            <NavLink
              to="/themes"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              <HiAdjustments />
              <SPAN_HiddenMobile className="hide-mobile">
                Theme
              </SPAN_HiddenMobile>
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
          </DIV_LinksContainer>
        </DIV_TopHeader>

        <DIV_BotHeader>
          <div>
            <NavLink to="/builder">
              <FaWrench />
              Construire
            </NavLink>
          </div>
          <div>
            <div onClick={toggleDropdown}>
              <FaSearchDollar />
              Chercher
              {showDropdown ? <BsChevronUp /> : <BsChevronDown />}
            </div>
          </div>
        </DIV_BotHeader>
        <DIV_DropdownMenuContainer>
          {showDropdown && (
            <>
              <NavLink to="/search?s=gpu">
                <div>
                  Carte Graphique
                  <img src={GPU_IMAGE}></img>
                </div>
              </NavLink>
              <NavLink to="/search?s=cpu">
                <div>
                  C.P.U.
                  <img src={CPU_IMAGE}></img>
                </div>
              </NavLink>
              <NavLink to="/search?s=motherboard">
                <div>
                  Carte mère
                  <img src={MB_IMAGE}></img>
                </div>
              </NavLink>
              <NavLink to="/search?s=memory">
                <div>
                  Mémoires
                  <img src={MEMORY_IMAGE}></img>
                </div>
              </NavLink>
            </>
          )}
        </DIV_DropdownMenuContainer>
      </nav>
    </HEADER_Container>
  );
}

export default Header;

const fadeIn = keyframes`
0% {
        transform: rotateY(90deg)
    }
    80% {
        transform: rotateY(-10deg)
    }
    100% {
        transform: rotateY(0)
    }
`;

const DIV_DropdownMenuContainer = styled.div`
  position: absolute;
  /* left:50vw; */
  width: 100%;
  background-color: var(--background-color-200);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 120px;
    width: 120px;

    border: 1px solid;
    animation: ${fadeIn} 0.6s ease;
    &:hover {
      color: var(--secondary-color-100);
      background-color: var(--main-color-200);
      transform: translateY(-3px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
  }
`;

const HEADER_Container = styled.header`
  /* pour gèrer le focus sur double click */
  user-select: none;

  position: relative;
  .active-link {
    text-decoration: underline;
    background-color: var(--secondary-color-200);
    border-radius: 10px;
  }
`;

const SPAN_HiddenMobile = styled.span`
  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const DIV_TopHeader = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  background-color: var(--background-color-400);
  border-bottom: var(--background-color-200) 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  @media only screen and (max-width: 650px) {
    font-size: 1.5rem;
  }
`;

const DIV_LinksContainer = styled.div``;

const DIV_BotHeader = styled.div`
  background-color: var(--background-color-300);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  gap: 15%;
`;
