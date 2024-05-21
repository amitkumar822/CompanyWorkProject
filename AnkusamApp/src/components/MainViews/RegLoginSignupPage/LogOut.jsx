import React, { useEffect } from "react";

function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={handleLogOut}
        className=" uppercase bg-red-500 rounded-md py-1 px-2"
      >
        LogOut
      </div>
    </>
  );
}

export default LogOut;
