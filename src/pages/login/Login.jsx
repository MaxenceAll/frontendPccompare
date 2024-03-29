import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import GenericModal from "../../components/Tools/GenericModal";
import { STYLEDButton } from "../../components/styles/genericButton";
import { AuthContext } from "../../Contexts/AuthContext";
import ButtonReturnToProps from "../../components/Tools/ButtonReturnToProps";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";
import { useDisconnect } from "../../Hooks/useDisconnect";

import { BiLogOut } from "react-icons/bi";

function Login() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // Login or Register logic :
  const [display, setDisplay] = useState("login");

  // Disconnect logic:
  const [disconnect, isDisconnecting] = useDisconnect();
  const [isModalOpenDisconnect, setIsModalOpenDisconnect] = useState(false);
  const openDisconnectModal = (e) => {
    setIsModalOpenDisconnect(true);
  };
  async function handleDisconnect(e) {
    disconnect();
    setIsModalOpenDisconnect(false);
  }

  return (
    <STYLEDLoginContainer>
      <GenericModal
        ariaLabelMessage="Modal de confirmation déconnexion"
        isOpen={isModalOpenDisconnect}
        onClose={() => setIsModalOpenDisconnect(false)}
      >
        <STYLEDModalDisconnect>
          <h1>
            <BiLogOut />
          </h1>
          <label>Voulez-vous vraiment vous déconnecter ?</label>
          <STYLEDButton
            onClick={(e) => handleDisconnect(e)}
            width="40%"
            type="button"
            disabled={isDisconnecting}
          >
            {isDisconnecting ? "Déconnexion en cours..." : "Oui"}
          </STYLEDButton>
          <STYLEDButton
            width="40%"
            type="button"
            onClick={() => setIsModalOpenDisconnect(false)}
          >
            Non
          </STYLEDButton>
        </STYLEDModalDisconnect>
      </GenericModal>

      <STYLEDLoginContainerBox>
        {auth?.data?.account ? (
          <>
            <p>Bonjour, {auth.data.account}</p>
            <STYLEDButton width="100%" onClick={openDisconnectModal}>
              Se déconnecter.
            </STYLEDButton>
            <ButtonReturnToProps
              destinationMsg={"d'acceuil."}
              destinationUrl={"../"}
            />
          </>
        ) : (
          <>
            {display === "login" ? (
              <>
                <LoginForm />
              </>
            ) : (
              <>
                <RegisterForm />
              </>
            )}

            <STYLEDLoginOptionsButtons
              onClick={() => setDisplay("login")}
              style={{
                backgroundColor:
                  display === "login"
                    ? "var(--background-color-400)"
                    : "var(--background-color-200)",
                color:
                  display === "login"
                    ? "var(--main-color-100)"
                    : "var(--main-color-200)",
              }}
            >
              S'identifier
            </STYLEDLoginOptionsButtons>

            <STYLEDLoginOptionsButtons
              onClick={() => setDisplay("register")}
              style={{
                backgroundColor:
                  display === "register"
                    ? "var(--background-color-400)"
                    : "var(--background-color-200)",
                color:
                  display === "register"
                    ? "var(--main-color-100)"
                    : "var(--main-color-200)",
              }}
            >
              S'enregistrer
            </STYLEDLoginOptionsButtons>
          </>
        )}
      </STYLEDLoginContainerBox>
    </STYLEDLoginContainer>
  );
}

export default Login;

const STYLEDLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const STYLEDLoginContainerBox = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 5px;
`;

const STYLEDLoginOptionsButtons = styled.button`
  width: 50%;
  border: none;
  padding: 10px;
  color: var(--main-color-100);
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    color: var(--main-color-300) !important;
    background-color: var(--background-color-400) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2) !important;
  }
`;

const STYLEDModalDisconnect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  h1 {
    font-size: 5rem;
  }
  label {
    padding-bottom: 2rem;
  }
`;
