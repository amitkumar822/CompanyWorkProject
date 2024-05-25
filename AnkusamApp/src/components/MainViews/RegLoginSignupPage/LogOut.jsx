import React, { useEffect } from "react";

function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vehiLogUser");
    localStorage.removeItem("busiLogUser")
    // Refresh the page
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