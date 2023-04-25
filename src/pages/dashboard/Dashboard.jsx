import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <>
      <div>{auth?.data?.email}</div>
    </>
  );
}

export default Dashboard;
