import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function DateDuJour() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = format(date, "dd MMMM yyyy, HH:mm:ss", {
    locale: fr,
  });

  return (<div>{formattedDate}</div>);
}
