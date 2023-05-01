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

import { useContext, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CPU_IMAGE from "../assets/generics/CPU.jpg";
import GPU_IMAGE from "../assets/generics/GPU.jpg";
import MEMORY_IMAGE from "../assets/generics/MEMORY.jpg";
import MB_IMAGE from "../assets/generics/MOTHERBOARD.jpg";
import { ThemeContext } from "../Contexts/ThemeContext";
import { STYLEDButton } from "./styles/genericButton";
import { BsSun, BsMoon, BsEmojiSunglasses } from "react-icons/bs";
import { AuthContext } from "../Contexts/AuthContext";
import { useRef } from "react";
import { useEffect } from "react";
import GenericModal from "./Tools/GenericModal";
import fetcher from "../helper/fetcher";
import useCookie from "../Hooks/useCookie";

function Header() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log(auth);
  // Cookie logic for disconnect
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  //Theme logic:
  const { theme, toggleTheme } = useContext(ThemeContext);
  // Dropdown menu logic:
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  // disconnect logic:
  // Disconnect logic:
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };
  async function handleDisconnect(e) {
    try {
      const response = await fetcher.post("/login/logout");
      console.log(response);
      // Remove the access token cookie
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuth(null);
      setAuthCookie(null);
      setIsModalOpenDisconnect(false);
      toast.info(`Deconnexion avec succes.`);
      setDisplay("login");
    } catch (error) {
      console.error("Oops une erreur apparait :", error);
    }
  }

  return (
    <>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "var(--background-color-100)",
          color: "var(--main-color-100)",
        }}
      />
    
      <GenericModal
        ariaLabelMessage="Modal de confirmation déconnexion"
        isOpen={isModalOpenDisconnect}
        onClose={() => setIsModalOpenDisconnect(false)}
      >
        <label>Voulez-vous vraiment vous déconnecter ?</label>
        <STYLEDButton
          onClick={(e) => handleDisconnect(e)}
          width="40%"
          type="button"
        >
          Oui
        </STYLEDButton>
        <STYLEDButton
          width="40%"
          type="button"
          onClick={() => setIsModalOpenDisconnect(false)}
        >
          Non
        </STYLEDButton>
      </GenericModal>

      <HEADER_Container>
        <nav role="navigation">
          <DIV_TopHeader>
            <div>
              <NavLink to="/">
                <GiComputerFan />
                {import.meta.env.VITE_APP_NAME}
              </NavLink>
            </div>
            {auth?.data && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active-link" : null
                  }
                >
                  <HiUser />
                  <SPAN_HiddenMobile className="hide-mobile">
                    Bonjour,{auth?.data?.pseudo}
                    <DIV_lastConnexionStyle>
                      (Dernière connection:
                      {new Date(auth?.data?.last_connection).toLocaleString()})
                      <STYLEDButton onClick={openDisconnectModal}>
                        x
                      </STYLEDButton>
                    </DIV_lastConnexionStyle>
                  </SPAN_HiddenMobile>
                </NavLink>
              </>
            )}
            <DIV_LinksContainer>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : null)}
              >
                <STYLEDHeaderLinkIcon>
                  <HiHome />
                </STYLEDHeaderLinkIcon>
                <SPAN_HiddenMobile className="hide-mobile">
                  Home
                </SPAN_HiddenMobile>
              </NavLink>

              {!auth?.data && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "active-link" : null
                  }
                >
                  <STYLEDHeaderLinkIcon>
                    <HiUser />
                  </STYLEDHeaderLinkIcon>
                  <SPAN_HiddenMobile className="hide-mobile">
                    Login
                  </SPAN_HiddenMobile>
                </NavLink>
              )}

              <NavLink
                to="/themes"
                className={({ isActive }) => (isActive ? "active-link" : null)}
              >
                <STYLEDHeaderLinkIcon>
                  <HiAdjustments />
                </STYLEDHeaderLinkIcon>
                <SPAN_HiddenMobile className="hide-mobile">
                  Theme
                </SPAN_HiddenMobile>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active-link" : null)}
              >
                <STYLEDHeaderLinkIcon>
                  <HiInformationCircle />
                </STYLEDHeaderLinkIcon>
                <SPAN_HiddenMobile className="hide-mobile">
                  Apropos
                </SPAN_HiddenMobile>
              </NavLink>
              <STYLEDButton onClick={() => toggleTheme()}>
                {theme === "dark" && <BsSun />}
                {theme === "light" && <BsMoon />}
                {theme === "custom" && <BsEmojiSunglasses />}
              </STYLEDButton>
            </DIV_LinksContainer>
          </DIV_TopHeader>

          <DIV_BotHeaderContainer>
            <DIV_BotHeader>
              <NavLink to="/builder">
                <FaWrench />
                Construire
              </NavLink>
            </DIV_BotHeader>

            <DIV_BotHeader onClick={toggleDropdown} ref={dropdownRef}>
              <FaSearchDollar />
              Chercher
              {showDropdown ? (
                <BsChevronUp onClick={toggleDropdown} />
              ) : (
                <BsChevronDown onClick={toggleDropdown} />
              )}
            </DIV_BotHeader>
          </DIV_BotHeaderContainer>
          <DIV_DropdownMenuContainer>
            {showDropdown && (
              <>
                <NavLink to="/compare?s=gpu">
                  <div>
                    Carte Graphique
                    <img src={GPU_IMAGE}></img>
                  </div>
                </NavLink>
                <NavLink to="/compare?s=cpu">
                  <div>
                    C.P.U.
                    <img src={CPU_IMAGE}></img>
                  </div>
                </NavLink>
                <NavLink to="/compare?s=motherboard">
                  <div>
                    Carte mère
                    <img src={MB_IMAGE}></img>
                  </div>
                </NavLink>
                <NavLink to="/compare?s=memory">
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
    </>
  );
}

export default Header;

const STYLEDHeaderLinkIcon = styled.div`
  text-align: center;
`;

const DIV_lastConnexionStyle = styled.div`
  font-size: 0.5rem;
`;

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
  z-index: 999;

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
  height: 100%;
  /* overflow: scroll; */
  position: relative;
  .active-link {
    /* text-decoration: underline; */
    background-color: var(--secondary-color-200);
    border-radius: 4px;
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

const DIV_LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
`;

const DIV_BotHeaderContainer = styled.div`
  background-color: var(--background-color-300);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  gap: 15%;
  position: sticky;
  top: 0;
  /* z-index: 9999999999; */
`;
const DIV_BotHeader = styled.div`
  &:hover {
    color: var(--main-color-300);
    background-color: var(--background-color-100);
    border-radius: 4px;
  }
`;
