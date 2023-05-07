import React from "react";
import { useEffect } from "react";

function Compare() {
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("c");

  const friendlyNames = {
    cg: "Cartes graphiques",
    cpu: "Processeurs",
    ram: "Mémoires",
    cm: "Cartes mères",
  };
  // set title logic
  useEffect(() => {
    const friendlyName = friendlyNames[category] || category;
    document.title = `${
      import.meta.env.VITE_APP_NAME
    } | Recherche de ${friendlyName}`;
  }, [category]);

  return (
    <>
      <div>Compare</div>
    </>
  );
}

export default Compare;
