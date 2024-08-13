import React, { useEffect, useState } from "react";
import AnkusamLogo from "../../data/Photos/CreatedQuotation/AnkusamLogo.png";
import TUVLogo from "../../data/Photos/CreatedQuotation/TUVLogo.png";
import { Link } from "react-router-dom";
import { convertToWords } from "../../utils/ConvertToWords";

const PreviewInvoiceBill = () => {
  // ==============👇 Print Functionlaity 👇====================
  //⏩ Function to handle the print action
  const handlePrint = () => {
    window.print();
  };

  //⏩ Function to disable Ctrl+P
  const disableCtrlP = (event) => {
    if (event.ctrlKey && event.key === "p") {
      event.preventDefault();
      alert("Please use the Print button to print.");
    }
  };

  //⏩ Add event listener to disable Ctrl+P when the component mounts
  useEffect(() => {
    window.addEventListener("keydown", disableCtrlP);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", disableCtrlP);
    };
  }, []);

  // ==============��👇 Shopkeeper and Goods All Detail Get in LocalStorage 👇��====================
  const [shopkeeperDetails, setShopkeeperDetails] = useState("");
  const [goodsDetails, setGoodsDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Quo_ShopkeeperDetails")) {
      setShopkeeperDetails(
        JSON.parse(localStorage.getItem("Quo_ShopkeeperDetails"))
      );
    }
    if (localStorage.getItem("Quo_SelectedGoods")) {
      setGoodsDetails(JSON.parse(localStorage.getItem("Quo_SelectedGoods")));
    }
  }, [setShopkeeperDetails, setGoodsDetails]);

  // ============= 👇 IGST, CGST, SGST, TotalAmount, FinalAmount Get in LocalStorage  👇================
  const [CgstSgst, setCgstSgst] = useState(0);
  const [igst, setIGST] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("Quo_CgstSgst")) {
      setCgstSgst(parseFloat(JSON.parse(localStorage.getItem("Quo_CgstSgst"))));
    }

    if (localStorage.getItem("Quo_Igst")) {
      setIGST(parseFloat(JSON.parse(localStorage.getItem("Quo_Igst"))));
    }

    if (localStorage.getItem("Quo_TotalAmount")) {
      setTotalAmount(
        parseFloat(JSON.parse(localStorage.getItem("Quo_TotalAmount")))
      );
    }

    if (localStorage.getItem("Quo_FinalAmount")) {
      setFinalAmount(
        parseFloat(JSON.parse(localStorage.getItem("Quo_FinalAmount")))
      );
    }
  }, [setCgstSgst, setIGST, setTotalAmount, setFinalAmount]);

  // =======👇 Current Date 👇=======
  const currentData = new Date();
  const formattedDate = currentData.toLocaleDateString("en-UK");

  return (
    <div className="w-full flex justify-center absolute -top-20 bg-white z-[99] mx-auto mt-4">
      {/*============👇 Print Section 👇========== */}

      <div className="lg:w-[80%] w-[710px] md:my-20 my-16 pb-32">
        <div
          className="w-full mx-auto py-2 print-border border-black border-[1px]"
          id="invoice"
        >
          {/* Company All Details or Header section */}
          <div className="px-3">
            <h1 className="font-bold text-center italic lg:text-[20px]">
              Quotation
            </h1>
            <div className="flex justify-around items-center px-4">
              <img
                src={AnkusamLogo}
                className="lg:w-[90px] w-[50px]"
                alt="Ankusam Logo"
              />
              <h1 className="font-bold italic font-serif lg:text-4xl text-2xl">
                Ankusam Engineering Private Limited
              </h1>
              <span className="flex flex-col items-center">
                <img
                  src={TUVLogo}
                  className="lg:w-[50px] w-[30px]"
                  alt="TUV Logo"
                />
                <h1 className="font-semibold text-[10px]">ISO 90001:2015</h1>
              </span>
            </div>
            {/* Address */}
            <div className="text-center text-[11.2px] lg:text-[17px]">
              <h1>
                3/204 E2, Venkittapuram, Near L&T By-pass Road, Coimbatore,
                Tamil Nadu - 641062
              </h1>
              <h1>
                Sales@ankusamengineering.com website:www.ankusamengineering.com
              </h1>
              <h1>Contact Number : +91 7305046742, 7305046744, 9003441337</h1>
              <h1>GSTIN: 33AAUCA1961FlZN</h1>
            </div>
            <span className="text-[10px] lg:text-[18px]">TO</span>
          </div>

          {/* Builling section */}
          <div className="text-[11px] lg:text-[19px]">
            {/* Name and date section */}
            <div className=" border-t-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Name
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {/* Sri Kumaran Steels */}
                {shopkeeperDetails?.username}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Date:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                {formattedDate}
              </div>
            </div>

            {/* Address section */}
            <div className=" border-t-[1px] border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Address
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {shopkeeperDetails?.address}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Quotation NO:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center lg:text-[17px] text-[10px]">
                {/* No: AEPL/PO/24-25/37 */}Q/2024-25/
                <span className="uppercase">{localStorage.getItem("Log_username")}</span>
                /{localStorage.getItem("QuotationNumber")}
              </div>
            </div>

            {/* State and Supplier section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                State
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {shopkeeperDetails?.state}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Supplier code:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center"></div>
            </div>

            {/* Mobile and Delivery date section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Mobile
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {shopkeeperDetails?.phone}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Date of delivery:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                {/* 15.12.2024 */}
              </div>
            </div>

            {/* GST number section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                GST no:
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {shopkeeperDetails?.gst}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold"></div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center"></div>
            </div>

            {/* Description of Goods Table Section */}
            <table className="lg:w-full">
              <thead className="bg-gray-300">
                <tr className="border-b-[1px] border-black lg:text-[18px]">
                  <th className="border-r-[1px] border-black py-2 w-[91px] lg:w-[40px]">
                    S.No.
                  </th>
                  {/* <th className="border-r-[1px] border-black py-2 w-[90.5px]">
                    Part Number
                  </th> */}
                  <th className="border-r-[1px] border-black py-2 w-[381px]">
                    Description of Goods
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[67.2px] lg:w-[65px]">
                    Rate
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[90.5px]">
                    Quantity
                  </th>

                  <th className="border-black py-2 w-[108.3px]">
                    Total Amounts
                  </th>
                </tr>
              </thead>
              <tbody className=" font-normal text-[13px] lg:text-[18px]">
                {goodsDetails?.map((goods, index) => (
                  <tr className="border-b-[1px] border-black" key={index}>
                    <td className="border-r-[1px] border-black py-2 w-[91px] lg:w-[40px] text-center">
                      {index + 1}
                    </td>
                    {/* <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px] text-center">
                      {goods.part_number}
                    </td> */}
                    <td className="border-r-[1px] border-black py-2 w-[381px] pl-4">
                      <div className="lg:text-xl text-[22] font-bold uppercase">
                        {goods.goods_name}
                      </div>
                      <div className="text-[#6151bb] font-serif lg:text-xl text-[18.2] underline my-2 uppercase">
                        Specifications:-{" "}
                      </div>
                      {goods.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="text-[#4f323b] font-semibold"
                        >
                          {"*"} {spec}
                        </div>
                      ))}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[90.5px] text-center">
                      {parseFloat(goods.rate)}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px] text-center">
                      {goods.measurement_number}
                    </td>

                    <td className="border-black py-2 w-[109.1px] text-center">
                      {parseFloat(goods.rate) * goods.measurement_number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Amount and GST Calculate */}
            {/* total amount */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                {/* Total Amounts */}
              </div>
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-10 font-semibold md:text-xl text-[13px]">
                <span className="border-l border-black pl-2 ">
                  Total Amount
                </span>
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
              ₹ {totalAmount}
              </div>
            </div>

            {/* CGST Calculate */}
            <div
              className={`border-b-[1px] border-black flex ${
                CgstSgst === 0 ? "hidden" : ""
              }`}
            >
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]"></div>
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-10 font-semibold md:text-xl text-[13px]">
                <span className="border-l border-black pl-2 lg:pr-[28.5px] pr-[18px]">
                  CGST (9%)
                </span>
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
              ₹ {(totalAmount * parseFloat(CgstSgst)) / 100}
              </div>
            </div>

            {/* SGST Calculate */}
            <div
              className={`border-b-[1px] border-black flex ${
                CgstSgst === 0 ? "hidden" : ""
              }`}
            >
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                {/* Total Amounts */}
              </div>
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-10 font-semibold md:text-xl text-[13px]">
                <span className="border-l border-black pl-2 lg:pr-[28.5px] pr-[18px]">
                  SGST (9%)
                </span>
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
              ₹ {(totalAmount * parseFloat(CgstSgst)) / 100}
              </div>
            </div>

            {/* IGST Calculate */}
            <div
              className={`border-b-[1px] border-black flex ${
                igst === 0 ? "hidden" : ""
              }`}
            >
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                {/* Total Amounts */}
              </div>
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-10 font-semibold md:text-xl text-[13px]">
                <span className="border-l border-black pl-2 lg:pr-[26px] pr-[15px]">
                  IGST (18%)
                </span>
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
              ₹ {(totalAmount * parseFloat(igst)) / 100}
              </div>
            </div>

            {/* Final Amount */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                Final Amount
              </div>
              {/* <div className="w-[380px] lg:w-[553.5px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-black"></div> */}
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-center font-semibold md:text-xl text-[13px]">
                {convertToWords(finalAmount)}
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
              ₹ {finalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Terms and conditions:- */}
          <div className="text-[11px] lg:text-[18px] border-b-[1px] pl-2 border-black">
            <h1 className=" font-semibold">Terms and conditions:-</h1>
            <ul className="pl-8 ">
              {TermsAndConditions.map((term, index) => (
                <li key={index} className="list-decimal">
                  {term.condition}
                </li>
              ))}
            </ul>
          </div>

          {/* Thanking you section */}
          <div className="text-[9px] lg:text-[18px] pl-4">
            <h3>Thanking you,</h3>
            <h1 className=" font-semibold">
              For Ankusam Engineering Private Limited,
            </h1>
            <span className="uppercase">{localStorage.getItem("Log_username")}</span>
          </div>
        </div>

        <div className="w-full md:flex justify-center items-center gap-4 mt-4 hidden">
          <button
            onClick={handlePrint}
            className=" bg-green-500 hover:bg-green-600 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black"
          >
            Print
          </button>

          <Link
            to="/createquotation"
            className="bg-gradient-to-r hover:from-green-400 to-blue-500 from-pink-500 hover:to-yellow-500 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black"
          >
            Go Back
          </Link>
        </div>
        <div className="lg:mt-6"></div>
      </div>
    </div>
  );
};

export default PreviewInvoiceBill;

const TermsAndConditions = [
  {
    id: 1,
    condition:
      "6 month warranty for machine and 1 year warranty for gear and motor .",
  },
  {
    id: 2,
    condition:
      "Warranty does not includes consumbale, electrical, wearable and plastic items.",
  },
  {
    id: 3,
    condition: " Machine once sold will not be taken back or exchanged.",
  },
  {
    id: 4,
    condition: " For any dispute, subject to Coimbatore Judiciation.",
  },
  {
    id: 5,
    condition: "Transportation insurance in customer scope.",
  },
  {
    id: 6,
    condition:
      "Bank Name : ICICI, Branch : Kalapatti, Account no - 728405000107 , IFSC Code - ICIC0007284 ",
  },
];
