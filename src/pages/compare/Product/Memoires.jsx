import React from "react";
import { useEffect } from "react";

function Memoires() {
  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Mémoires Ram`;
  }, []);
  return <div>Memoires</div>;
}

export default Memoires;
