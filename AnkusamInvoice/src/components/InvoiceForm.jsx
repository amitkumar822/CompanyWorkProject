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
    const input = document.getElementById('invoice');
    html2canvas(input, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div className="w-[200mm] mx-auto mt-4">
        <div className="w-full mx-auto py-2 px-2 print-border border border-black " id="invoice">
          {/* Purchase Order or Header section */}
          <div>
            <h1 className="font-bold text-center italic">Purchase Order</h1>
            <div className="flex justify-around items-center px-4">
              <img src={AnkusamLogo} className="w-[50px]" alt="Ankusam Logo" />
              <h1 className="font-bold italic font-serif">
                Ankusam Engineering Private Limited
              </h1>
              <span className="flex flex-col items-center">
                <img src={TUVLogo} className="w-[30px]" alt="TUV Logo" />
                <h1 className="font-semibold text-[10px]">ISO 90001:2015</h1>
              </span>
            </div>
            {/* Address */}
            <div className="text-center text-[10px]">
              <h1>3/204 E2, Venkittapuram, Near L&T By-pass Road, Coimbatore, Tamil Nadu - 641062</h1>
              <h1>Sales@ankusamengineering.com website:www.ankusamengineering.com</h1>
              <h1>Contact Number : +91 7305046742, 7305046744, 9003441337</h1>
              <h1>GSTIN: 33AAUCA1961FlZN</h1>
            </div>
            <span className="text-[10px]">TO</span>
          </div>
        </div>
        <div className="flex justify-center mt-4 no-print">
          <button onClick={handlePrint} className="mr-4 bg-blue-500 text-white px-4 py-2 rounded">
            Print
          </button>
          <button onClick={handleDownloadPDF} className="bg-green-500 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
