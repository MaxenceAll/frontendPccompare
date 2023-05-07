import React from "react";
import { useEffect } from "react";

function Processeurs() {
  // set title logic:
  useEffect(() => {
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Page de recherche | Processeurs`;
  }, []);
  return <div>Processeurs</div>;
}

export default Processeurs;
