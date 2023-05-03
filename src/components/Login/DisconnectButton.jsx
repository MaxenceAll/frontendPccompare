import React from "react";
import { useDisconnect } from "../../Hooks/useDisconnect";
import { STYLEDButton } from "../styles/genericButton";

function DisconnectButton() {
  const [disconnect, isDisconnecting] = useDisconnect();

  function handleLogoutClick() {
    disconnect();
  }

  return (
    <STYLEDButton disabled={isDisconnecting} onClick={handleLogoutClick}>
      {isDisconnecting ? "Déconnexion en cours..." : "Déconnexion"}
    </STYLEDButton>
  );
}

export default DisconnectButton;
