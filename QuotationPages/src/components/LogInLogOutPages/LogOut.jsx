import React from "react";

function LogOut() {
  const handleLogOut = () => {
    localStorage.removeItem("LoginQuotationToken");
    localStorage.removeItem("Log_username");
    localStorage.removeItem("QuoShopkeeperDetails");
    localStorage.removeItem("Quo_ShopkeeperDetails");
    localStorage.removeItem("Quo_SelectedGoods");
    localStorage.removeItem("Quo_CgstSgst");
    localStorage.removeItem("Quo_Igst");
    localStorage.removeItem("Dash_Goods_details");
    localStorage.removeItem("QuotationNumber");
    localStorage.removeItem("Quo_TotalAmount");
    localStorage.removeItem("Quo_FinalAmount");
    localStorage.removeItem("Quo_SelectedGoodsNameOnly");
    localStorage.removeItem("HistoryQuotation");
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={handleLogOut}
        className="h-[37px] flex items-center uppercase bg-red-500 rounded-md py-1 px-2 text-white font-semibold cursor-pointer hover:bg-red-600 hover:text-[#ededed] duration-300 text-[16px]"
      >
        LogOut
      </div>
    </>
  );
}

export default LogOut;
