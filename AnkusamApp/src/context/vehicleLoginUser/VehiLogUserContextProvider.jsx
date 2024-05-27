import React, { useState, useEffect } from "react";
import VehiLogUserContext from "./VehiLogUserContext";

const VehiLogUserContextProvider = ({ children }) => {
  const [vehiLogUser, setVehiLogUser] = useState(() => {
    // Retrieve user data from localStorage when the component mounts
    const savedUser = localStorage.getItem("vehiLogUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (vehiLogUser) {
      localStorage.setItem("vehiLogUser", JSON.stringify(vehiLogUser));
    } else {
      localStorage.removeItem("vehiLogUser");
    }
  }, [vehiLogUser]);

  return (
    <VehiLogUserContext.Provider value={{ vehiLogUser, setVehiLogUser }}>
      {children}
    </VehiLogUserContext.Provider>
  );
};

export default VehiLogUserContextProvider;
