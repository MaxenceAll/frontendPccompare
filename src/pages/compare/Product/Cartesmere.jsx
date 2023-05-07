import React from "react";
import { useEffect } from "react";

function Cartesmere() {
  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Cartes Mère`;
  }, []);
  return <div>Cartesmere</div>;
}

export default Cartesmere;
