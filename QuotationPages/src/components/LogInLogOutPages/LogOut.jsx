import React from "react";

function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("LoginQuotationToken");
    window.location.reload();
  };
  return (
    <>
      <div 
      onClick={handleLogOut}
      className="h-[37px] flex items-center uppercase bg-red-500 rounded-md py-1 px-2 text-white font-semibold cursor-pointer hover:bg-red-600 hover:text-[#ededed] duration-300 text-[16px]">
        LogOut
      </div>
    </>
  );
}

export default LogOut;
