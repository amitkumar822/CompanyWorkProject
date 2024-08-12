import React, { useEffect, useState } from "react";
import AnkusamLogo from "../../data/Photos/CreatedQuotation/AnkusamLogo.png";
import TUVLogo from "../../data/Photos/CreatedQuotation/TUVLogo.png";
import { Link } from "react-router-dom";
import { convertToWords } from "../../utils/ConvertToWords";

const PreviewInvoiceBill = () => {
  // ==============👇 Print Functionlaity 👇====================
  const handlePrint = () => {
    window.print();
  };


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
                Sri Kumaran Steels
                {/* {shopkeeperDetails?.ShopkeeperName} */}
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Date:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                20.11.2024
                {/* {formattedDate} */}
              </div>
            </div>

            {/* Address section */}
            <div className=" border-t-[1px] border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Address
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {/* {shopkeeperDetails.address} */}
                Erode Tamil Nadu
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Quotation NO:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                {/* No: AEPL/PO/24-25/37 */}Q-2024-25/
                {/* {localStorage.getItem("qutations_id")} */}
              </div>
            </div>

            {/* State and Supplier section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                State
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {/* {shopkeeperDetails.state} */}
                Tamil Nadu
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
                {/* {shopkeeperDetails.mobile} */}
                65325645
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Date of delivery:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                15.12.2024
              </div>
            </div>

            {/* GST number section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                GST no:
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                {/* {shopkeeperDetails.gst} */}
                QXP324EP4
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold"></div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center"></div>
            </div>

            {/* Description of Goods Table Section */}
            <table className="lg:w-full">
              <thead className="bg-gray-300">
                <tr className="border-b-[1px] border-black lg:text-[18px]">
                  <th className="border-r-[1px] border-black py-2 w-[91px] lg:w-[104px]">
                    S.No.
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[381px]">
                    Description of Goods
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[67.2px] lg:w-[65px]">
                    Rate
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[90.5px]">
                    Quantity
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[60px]">
                    CGST (9%)
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[60px]">
                    SGST (9%)
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[60px]">
                    IGST (18%)
                  </th>
                  <th className="border-black py-2 w-[108.3px]">
                    Total Amounts
                  </th>
                </tr>
              </thead>
              <tbody className=" font-normal text-center text-[13px] lg:text-[18px]">
                {/* {goodsDetails.map((goods, index) => ( */}
                  <tr className="border-b-[1px] border-black" key={1}>
                    <td className="border-r-[1px] border-black py-2 w-[91px] lg:w-[104px]">
                      {/* {index + 1} */}
                      1
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[381px]">
                      {/* {goods.label} */}
                      item1
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[90.5px]">
                      {/* {parseInt(goods.rate)} */}
                      236
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px]">
                      {/* {goods.quantity} */}
                      1
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[60px]">
                      {/* {goods.cgst} */}
                      30.1
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[60px]">
                      {/* {goods.sgst} */}
                     30.1
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[60px]">
                      {/* {goods.igst} */}
                     0
                    </td>
                    <td className="border-black py-2 w-[109.1px]">
                      {/* {parseInt(
                        totalGSTAmount(
                          parseInt(goods.rate),
                          parseInt(goods.quantity)
                        )
                      )} */}
                      1236
                    </td>
                  </tr>
                {/* ))} */}
              </tbody>
            </table>

            {/* Grand Total */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                Total Amounts
              </div>
              {/* <div className="w-[380px] lg:w-[553.5px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-black"></div> */}
              <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-center font-semibold md:text-xl text-[13px]">
                {/* {convertToWords(finalAmount.toFixed(0))} */}
                Number to Word convert
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px]">
                {/* {finalAmount.toFixed(0)} */}
                1236
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
            <h3 className="mt-6">Manikanndan P</h3>
            <h2 className="font-semibold">Managing Director</h2>
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
    condition: "Material need to be delivered as per specification.",
  },
  {
    id: 2,
    condition:
      "If Material is not as per specification then supplier need to take back at his own responsibility and transport.",
  },
  {
    id: 3,
    condition: "Payment will be done through cheque only.",
  },
  {
    id: 4,
    condition:
      "Supplier Invoice must refer Purchase Order, If not Material will not be accepted.",
  },
  {
    id: 5,
    condition: "Part Quantity supply is not accepted.",
  },
  {
    id: 6,
    condition:
      "Material must be supplied within specification date or max within 30 days. If Material is not supplied within mentioned period then PO is deemed to be cancelled.",
  },
  {
    id: 7,
    condition: "Any discrepency to be communicated through mail only.",
  },
  {
    id: 8,
    condition:
      "Supplier is expected to maintain confidentiality about our specification, Not to disclose with any third party.",
  },
  {
    id: 9,
    condition:
      "Ankusam Engineering own responsibility to change terms and conditions.",
  },
];
