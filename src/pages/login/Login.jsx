import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import GenericModal from "../../components/Tools/GenericModal";
import { STYLEDButton } from "../../components/styles/genericButton";
import useCookie from "../../Hooks/useCookie";
import { AuthContext } from "../../Contexts/AuthContext";
import ButtonReturnToProps from "../../components/Tools/ButtonReturnToProps";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";
import fetcher from "../../helper/fetcher";

function Login() {
  // Context Logic :
  const { auth, setAuth } = useContext(AuthContext);
  // console.log("authcontext:", auth);
  const [authCookie, setAuthCookie] = useCookie("accessToken");
  // console.log("authCookie:", authCookie);

  // Login or Register logic :
  const [display, setDisplay] = useState("login");

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
    <STYLEDLoginContainer>
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

      <STYLEDLoginContainerBox>
        {auth?.data?.email ? (
          <>
            <p>Bonjour, {auth.data.email}</p>
            <STYLEDButton width="100%" onClick={openDisconnectModal}>
              Se déconnecter.
            </STYLEDButton>
            <ButtonReturnToProps
              destinationMsg={"d'acceuil."}
              destinationUrl={"home"}
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
