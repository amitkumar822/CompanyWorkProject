import React from "react";
import { useNavigate } from "react-router";

function LogOut() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("TokeLoginVehiPage");
    localStorage.removeItem("vehiLogUser");
    localStorage.removeItem("busiLogUser")
    localStorage.removeItem("TokenLoginBusinpage")
    // Refresh the page
    navigate('');
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={handleLogOut}
        className="h-[40px] flex items-center uppercase bg-red-500 rounded-md py-1 px-2 text-white font-semibold cursor-pointer hover:bg-red-600 hover:text-[#ededed] duration-300"
      >
        LogOut
      </div>
    </>
  );
}

export default LogOut;



//👉 1 hour after automatically logout

// import React, { useEffect } from "react";

// const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// function LogOut() {
//   const handleLogOut = () => {
//     localStorage.removeItem("TokeLoginVehiPage");
//     localStorage.removeItem("vehiLogUser");
//     localStorage.removeItem("busiLogUser");
//     localStorage.removeItem("TokenLoginBusinpage");
//     localStorage.removeItem("tokenSetTime");
//     // Refresh the page
//     window.location.reload();
//   };

//   useEffect(() => {
//     // Check if tokens have expired
//     const tokenSetTime = localStorage.getItem("tokenSetTime");
//     if (tokenSetTime) {
//       const currentTime = Date.now();
//       const elapsed = currentTime - parseInt(tokenSetTime, 10);

//       if (elapsed >= TOKEN_EXPIRATION_TIME) {
//         handleLogOut();
//       } else {
//         // Set a timeout to log out the user after the remaining time
//         const remainingTime = TOKEN_EXPIRATION_TIME - elapsed;
//         setTimeout(handleLogOut, remainingTime);
//       }
//     }
//   }, []);

//   return (
//     <div
//       onClick={handleLogOut}
//       className="h-[40px] flex items-center uppercase bg-red-500 rounded-md py-1 px-2 text-white font-semibold cursor-pointer hover:bg-red-600 hover:text-[#ededed] duration-300"
//     >
//       LogOut
//     </div>
//   );
// }

// // Function to set tokens and the timestamp when they are set
// export function setTokens(tokens) {
//   localStorage.setItem("TokeLoginVehiPage", tokens.TokeLoginVehiPage);
//   localStorage.setItem("vehiLogUser", tokens.vehiLogUser);
//   localStorage.setItem("busiLogUser", tokens.busiLogUser);
//   localStorage.setItem("TokenLoginBusinpage", tokens.TokenLoginBusinpage);
//   localStorage.setItem("tokenSetTime", Date.now().toString());
// }

// export default LogOut;
