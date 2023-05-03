import React, { useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

function Test() {
  const [myValue, setMyValue] = useLocalStorage("myValue", "default");

  useEffect(() => {
    console.log(myValue);
  }, [myValue]);

  return (
    <div>
      <button onClick={() => setMyValue("new value")}>Update value</button>
    </div>
  );
}

export default Test;
