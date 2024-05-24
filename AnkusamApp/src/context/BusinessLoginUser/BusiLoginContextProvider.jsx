import { useEffect, useState } from "react";
import BusiLoginContext from "./BusiLoginContext";

const BusiLoginContextProvider = ({ children }) => {
  const [busiLogUser, setBusiLogUser] = useState(() => {
    // Retrieve user data from localStorage when the component mounts
    const savedUser = localStorage.getItem("busiLogUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user data to localStorage when the component unmounts
    if (busiLogUser) {
      localStorage.setItem("busiLogUser", JSON.stringify(busiLogUser));
    } else {
      localStorage.removeItem("busiLogUser");
    }
  }, [busiLogUser]);

  return (
    <BusiLoginContext.Provider value={ { busiLogUser, setBusiLogUser}}>
        {children}
    </BusiLoginContext.Provider>
  )
};


export default BusiLoginContextProvider;
