import React, { useState } from "react";
import AnkusamLogo from "../Photos/AnkusamLogo.png";
import TUVLogo from "../Photos/TUVLogo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceForm = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, { scale: 2, backgroundColor: "#ffffff" }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("invoice.pdf");
      }
    );
  };

  const [texableValue, setTexableValue] = useState(0);

  return (
    <>
      {/*============👇 Print Section 👇========== */}

      <div className="flex justify-center mt-4 no-print">
        <button
          onClick={handlePrint}
          className="mr-4 px-4 bg-blue-500 text-white py-2 rounded"
        >
          Print
        </button>
        {/* <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white py-2 rounded"
        >
          Download PDF
        </button> */}
      </div>

      <div className="lg:w-[80%] w-[800px] mx-auto mt-4">
        <div
          className="w-full mx-auto py-2 print-border border-black border-[1px]"
          id="invoice"
        >
          {/* Company All Details or Header section */}
          <div className="px-3">
            <h1 className="font-bold text-center italic lg:text-[20px]">
              Purchase Order
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
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Date:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                20.11.2024
              </div>
            </div>

            {/* Address section */}
            <div className=" border-t-[1px] border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Address
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                3/204 E2, Venkittapuram, Near L&T By-pass Road, Coimbatore,3/204
                E2, Venkittapuram, Near L&T By-pass Road, Coimbatore, Tamil Nadu
                - 641062 Tamil Nadu - 641062
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                No:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                No: AEPL/PO/24-25/37
              </div>
            </div>

            {/* State and Supplier section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                State
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                Tamil Nadu
              </div>
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Supplier code:
              </div>
              <div className="w-[148px] lg:w-[226px] pl-1 flex items-center">
                12345
              </div>
            </div>

            {/* Mobile and Delivery date section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                Mobile
              </div>
              <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                1234567890
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
                33AXYZ3235PQR34
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
                    HSN Code
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[90.5px]">
                    Qty in PCS
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[60px]">
                    Rate
                  </th>
                  <th className="border-black py-2 w-[108.3px]">
                    Taxable Value
                  </th>
                </tr>
              </thead>
              <tbody className=" font-normal text-center text-[13px] lg:text-[18px]">
                {AllDtata.map((data, index) => (
                  <tr className="border-b-[1px] border-black" key={index}>
                    <td className="border-r-[1px] border-black py-2 w-[91px] lg:w-[104px]">
                      {index + 1}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[381px]">
                      {data.goods}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px]">
                      {data.hsnCode}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[90.5px]">
                      {data.qty}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[60px]">
                      {data.rate}
                    </td>
                    <td className="border-black py-2 w-[109.1px]"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CGST and SGST Section */}
            {/* Total */}
            <div className=" border-black flex lg:text-[18px] text-[13px]">
              <div className="w-[91px] lg:w-[152px] border-r-[1px] border-black"></div>
              <div className="w-[380px] lg:w-[553.5px] border-r-[1px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-r-[1px] border-black"></div>
              <div className="w-[91px] lg:w-[131px] border-r-[1px] border-black text-center font-semibold">
                Total
              </div>
              <div className="w-[60.2px] lg:w-[87px] border-r-[1px] border-black text-center"></div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center"></div>
            </div>

            {/* CGST */}
            <div className=" border-black flex lg:text-[18px] text-[13px]">
              <div className="w-[91px] lg:w-[152px] border-r-[1px] border-black"></div>
              <div className="w-[380px] lg:w-[553.5px] border-r-[1px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-r-[1px] border-black"></div>
              <div className="w-[91px] lg:w-[131px] border-r-[1px] border-black text-center font-semibold">
                CGST
              </div>
              <div className="w-[60.2px] lg:w-[87px] border-r-[1px] border-black text-center">
                9%
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center">9%</div>
            </div>

            {/* SGST */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[152px] border-r-[1px] border-black"></div>
              <div className="w-[380px] lg:w-[553.5px] border-r-[1px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-r-[1px] border-black"></div>
              <div className="w-[91px] lg:w-[131px] border-r-[1px] border-black text-center font-semibold">
                SGST <br />
                Rounded off
              </div>
              <div className="w-[60.2px] lg:w-[87px] border-r-[1px] border-black text-center">
                9%
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center">9%</div>
            </div>

            {/* Grand Total */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[91px] lg:w-[152px] border-r-[1px] border-black"></div>
              <div className="w-[380px] lg:w-[553.5px] border-r-[1px] border-black"></div>
              <div className="w-[68px] lg:w-[94.5px] border-r-[1px] border-black"></div>
              <div className="w-[151px] lg:w-[218px] border-r-[1px] border-black text-center font-semibold">
                Grand Total
              </div>
              <div className="w-[107px] lg:w-[158.4px] border-black text-center">12056</div>
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
        <div className="lg:mt-6"></div>
      </div>
    </>
  );
};

export default InvoiceForm;

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

const AllDtata = [
  {
    si: 1,
    goods: "40x40x1.6 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 3,
    rate: 120,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 4,
    rate: 50,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 6,
    rate: 60,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 8,
    rate: 40,
  },
];
