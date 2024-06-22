import React from "react";
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

  return (
    <>
      <div className="w-[800px] mx-auto mt-4">
        <div
          className="w-full mx-auto py-2 print-border border-black border-[1px]"
          id="invoice"
        >
          {/* Company All Details or Header section */}
          <div className="px-3">
            <h1 className="font-bold text-center italic">Purchase Order</h1>
            <div className="flex justify-around items-center px-4">
              <img src={AnkusamLogo} className="w-[50px]" alt="Ankusam Logo" />
              <h1 className="font-bold italic font-serif text-2xl">
                Ankusam Engineering Private Limited
              </h1>
              <span className="flex flex-col items-center">
                <img src={TUVLogo} className="w-[30px]" alt="TUV Logo" />
                <h1 className="font-semibold text-[10px]">ISO 90001:2015</h1>
              </span>
            </div>
            {/* Address */}
            <div className="text-center text-[11.2px]">
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
            <span className="text-[10px]">TO</span>
          </div>

          {/* Builling section */}
          <div className="text-[11px]">
            {/* Name and date section */}
            <div className=" border-t-[1px] border-black flex">
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Name
              </div>
              <div className="w-[449.5px] pl-1 border-r-[1px] border-black font-semibold">
                Sri Kumaran Steels
              </div>
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Date:
              </div>
              <div className="w-[148px] pl-1 font-semibold flex items-center">
                20.11.2024
              </div>
            </div>

            {/* Address section */}
            <div className=" border-t-[1px] border-b-[1px] border-black flex">
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Address
              </div>
              <div className="w-[449.5px] pl-1 border-r-[1px] border-black font-semibold">
                3/204 E2, Venkittapuram, Near L&T By-pass Road, Coimbatore,3/204
                E2, Venkittapuram, Near L&T By-pass Road, Coimbatore, Tamil Nadu
                - 641062 Tamil Nadu - 641062
              </div>
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                No:
              </div>
              <div className="w-[148px] pl-1 font-semibold flex items-center">
                No: AEPL/PO/24-25/37
              </div>
            </div>

            {/* State and Supplier section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                State
              </div>
              <div className="w-[449.5px] pl-1 border-r-[1px] border-black font-semibold">
                Tamil Nadu
              </div>
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Supplier code:
              </div>
              <div className="w-[148px] pl-1 font-semibold flex items-center">
                12345
              </div>
            </div>

            {/* Mobile and Delivery date section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Mobile
              </div>
              <div className="w-[449.5px] pl-1 border-r-[1px] border-black font-semibold">
                1234567890
              </div>
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                Date of delivery:
              </div>
              <div className="w-[148px] pl-1 font-semibold flex items-center">
                15.12.2024
              </div>
            </div>

            {/* GST number section */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center">
                GST no:
              </div>
              <div className="w-[449.5px] pl-1 border-r-[1px] border-black font-semibold">
                33AXYZ3235PQR34
              </div>
              <div className="w-[90.3px] pl-1 border-r-[1px] border-black flex items-center"></div>
              <div className="w-[148px] pl-1 font-semibold flex items-center"></div>
            </div>

            {/* Description of Goods Table Section */}
            <table>
              <thead className="bg-gray-300">
                <tr className="border-b-[1px] border-black">
                  <th className="border-r-[1px] border-black py-2 w-[90.3px]">
                    S.No.
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[381px]">
                    Description of Goods
                  </th>
                  <th className="border-r-[1px] border-black py-2 w-[68.2px]">
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
              <tbody className=" font-normal text-center text-[13px]">
                {AllDtata.map((data, index) => (
                  <tr className="border-b-[1px] border-black" key={index}>
                    <td className="border-r-[1px] border-black py-2 w-[90.3px]">
                      {index + 1}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[381px]">
                      {data.goods}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[68.2px]">
                      {data.hsnCode}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[90.5px]">
                      {data.qty}
                    </td>
                    <td className="border-r-[1px] border-black py-2 w-[60px]"></td>
                    <td className="border-black py-2 w-[109.1px]"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CGST and SGST Section */}
            {/* Total */}
            <div className=" border-black flex">
              <div className="w-[90.4px] border-r-[1px] border-black"></div>
              <div className="w-[381px] border-r-[1px] border-black"></div>
              <div className="w-[68px] border-r-[1px] border-black"></div>
              <div className="w-[90.7px] border-r-[1px] border-black text-center font-semibold text-[13px]">
                Total
              </div>
              <div className="w-[60.2px] border-r-[1px] border-black text-center"></div>
              <div className="w-[108.8px] border-black text-center"></div>
            </div>

            {/* CGST */}
            <div className="border-black flex">
              <div className="w-[90.4px] border-r-[1px] border-black"></div>
              <div className="w-[381px] border-r-[1px] border-black"></div>
              <div className="w-[68px] border-r-[1px] border-black"></div>
              <div className="w-[90.7px] border-r-[1px] border-black text-center font-semibold">
                CGST
              </div>
              <div className="w-[60.2px] border-r-[1px] border-black text-center">
                9%
              </div>
              <div className="w-[108.8px] border-black text-center">9%</div>
            </div>

            {/* SGST */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[90.4px] border-r-[1px] border-black"></div>
              <div className="w-[381px] border-r-[1px] border-black"></div>
              <div className="w-[68px] border-r-[1px] border-black"></div>
              <div className="w-[90.7px] border-r-[1px] border-black text-center font-semibold">
                SGST <br />
                Rounded off
              </div>
              <div className="w-[60.2px] border-r-[1px] border-black text-center">
                9%
              </div>
              <div className="w-[108.8px] border-black text-center">9%</div>
            </div>
            
            {/* Grand Total */}
            <div className=" border-b-[1px] border-black flex">
              <div className="w-[90.4px] border-r-[1px] border-black"></div>
              <div className="w-[381px] border-r-[1px] border-black"></div>
              <div className="w-[68px] border-r-[1px] border-black"></div>
              <div className="w-[151px] border-r-[1px] border-black text-center font-semibold">
                Grand Total
              </div>
              <div className="w-[108.8px] border-black text-center">12056</div>
            </div>
          </div>

          {/* Terms and conditions:- */}
          <div className="text-[11px] border-b-[1px] pl-2 border-black">
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
          <div className="text-[9px] pl-4">
            <h3>Thanking you,</h3>
            <h1 className=" font-semibold">
              For Ankusam Engineering Private Limited,
            </h1>
            <h3 className="mt-6">Manikanndan P</h3>
            <h2 className="font-semibold">Managing Director</h2>
          </div>
        </div>

        {/*============👇 Print Section 👇========== */}

        <div className="flex justify-center mt-4 no-print">
          <button
            onClick={handlePrint}
            className="mr-4 bg-blue-500 text-white py-2 rounded"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white py-2 rounded"
          >
            Download PDF
          </button>
        </div>
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
    qty: 10,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
  {
    si: 2,
    goods: "50x60x1.7 mm Thickness MS & Sq Tube",
    hsnCode: "23",
    qty: 5,
  },
];
