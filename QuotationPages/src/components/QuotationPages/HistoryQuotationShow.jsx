import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormatIndianCurrency } from "../../utils/FormatIndianCurrency";
import AnkusamLogo from "../../data/Photos/CreatedQuotation/AnkusamLogo.png";
import TUVLogo from "../../data/Photos/CreatedQuotation/TUVLogo.png";
import { convertToWords } from "../../utils/ConvertToWords";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import loadingGfg from "../../data/GfgLoding/loading.gif";

function HistoryQuotationShow() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginQuotationToken")) {
      navigate("/");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // ==============👇 Print Functionlaity 👇====================
  //⏩ Function to handle the print action
  const handlePrint = () => {
    window.print();
  };

  // =======👇 Current Date 👇=======
  const currentData = new Date();
  const formattedDate = currentData.toLocaleDateString("en-UK");

  const [QuotationHistory, setQuotationHistory] = useState(
    () => JSON.parse(localStorage.getItem("HistoryQuotation")) || []
  );

  // const [username, setUserName] = useState("");

  const username =
    localStorage.getItem("HistorySapratName") ||
    localStorage.getItem("Log_username");

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("username", username);

      try {
        const apiEndPoints = {
          mani: "/api/add_item/get_mani_quotation_history.php",
          subathra: "/api/add_item/get_subathra_quotation_th_id.php",
          ilakkiya: "/api/add_item/get_llakkiya_quotation_th_name.php",
          omkumar: "/api/add_item/get_omkumar_quotation.php",
        };

        const endpoint = apiEndPoints[username];

        const response = await axios.post(endpoint, formData);

        if (Array.isArray(response.data)) {
          localStorage.setItem(
            "HistoryQuotation",
            JSON.stringify(response.data)
          );
          setQuotationHistory(response.data);
        }
      } catch (error) {
        console.error("Quotation History Error: " + error);
      }
    };
    fetchData();
  }, []);

  //=============👇 Filters History All Details By ID 👇=================
  const [hideHistroyWhenClickView, setHidenHistoryWhenClickView] =
    useState(false);

  const [filterAllHistoryDetails, setFilterAllHistoryDetails] = useState([]);

  // console.log("filterAllHistoryDetails: \n" + JSON.stringify(filterAllHistoryDetails?.id, null, 2))

  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState();
  // TODO: CGST IGST API
  const [cgstSgst, setCgstSgst] = useState(0);
  const [igst, setIGST] = useState(0);

  const handleFilterHistoryById = (id) => {
    const filterHistoryDetails = QuotationHistory.find(
      (details) => details.id === id
    );
    setFilterAllHistoryDetails(filterHistoryDetails);

    setTotalAmount(parseFloat(filterHistoryDetails?.amout?.total_amount));

    if (filterHistoryDetails?.customer_detail?.state === "Tamil Nadu - 33") {
      setCgstSgst(9);
      setIGST(0);
    } else {
      setCgstSgst(0);
      setIGST(18);
    }

    setHidenHistoryWhenClickView(true);
  };

  // =======👇 Discont after Amount 👇=======
  const discontAfterAmount = totalAmount - (discount || 0);

  const finalAmountAfterDiscount =
    discontAfterAmount +
    ((cgstSgst * discontAfterAmount) / 100) * 2 +
    (igst * discontAfterAmount) / 100;

  const cgstSgstAmount = ((cgstSgst * discontAfterAmount) / 100).toFixed(2);
  const igstAmount = ((igst * discontAfterAmount) / 100).toFixed(2);

  // =======👇 Discont After Generate New Quotation 👇=======
  const [pdfPreviewShowHiden, setPdfPreviewShowHiden] = useState(false);

  const handleNewQuotationGenerate = async () => {
    setIsLoading(true);
    const amoutGSTDetails = {
      total_amount: discontAfterAmount.toFixed(2),
      final_Amount: finalAmountAfterDiscount.toFixed(2),
      cgst: cgstSgstAmount,
      sgst: cgstSgstAmount,
      igst: igstAmount,
    };

    const formData = new FormData();
    formData.append("amout", JSON.stringify(amoutGSTDetails));
    formData.append("id", filterAllHistoryDetails?.id);

    try {
      const apiEndPoints = {
        mani: "/api/update_mani_amount.php",
        subathra: "/api/update_subhatra_amount.php",
        ilakkiya: "/api/update_Ilakkiya_amount.php",
        omkumar: "/api/update_omkumar_amount.php",
      };

      const endpoint = apiEndPoints[username];

      const response = await axios.post(endpoint, formData);

      if (response.data.updated) {
        toast.success("Quotation Amount Updated Successfully!", {
          position: "top-center",
          autoClose: 1700,
        });
        setPdfPreviewShowHiden(true);
        setHidenHistoryWhenClickView(false);
        setIsLoading(false);
      } else {
        toast.error("Failed to Update Quotation Amount!", {
          position: "top-center",
          autoClose: 1700,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error: " + error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1700,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen -mt-16">
      {/* Loading image section */}
      <div
        className={`w-full h-[110%] -mt-16 z-[52] bg-[rgba(0,0,0,0.5)] fixed ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>

      {/* ====👇 View All History Quotation 👇==== */}
      <div
        className={`w-[85%] mx-auto pt-16 ${
          hideHistroyWhenClickView ? "hidden" : ""
        }`}
      >
        <h1 className="text-center text-2xl font-semibold italic font-serif mt-4">
          Your Quotation History Listed Here.
        </h1>
        <table className="w-[99%] mx-auto mb-4 border bg-[#00faac] border-black shadow-md shadow-pink-400">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                SI No
              </th>
              <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                Quotation NO
              </th>
              <th className="py-2 px-2 border-b-2 border-black  border-r-2">
                Customer Name
              </th>
              <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                Date & Time
              </th>
              <th className="py-2 px-2 border-b-2 border-black border-r-2  w-[170px]">
                Total Amount
              </th>
              <th className="py-2 px-2 border-b-2 border-black border-r-2  w-[170px]">
                Final Amount
              </th>
              <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {QuotationHistory?.map((items, index) => (
              <tr key={index} className=" odd:bg-pink-200 text-[17px]">
                <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                  {index + 1}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                  Q/2024-25/<span className="uppercase">{username}</span>/
                  {items?.id}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                  {items.customer_detail.username}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black text-justify">
                  {items.created_date}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[170px]">
                  {FormatIndianCurrency.format(items.amout?.total_amount)}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[170px]">
                  {FormatIndianCurrency.format(items.amout?.final_Amount)}
                </td>
                <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                  <span
                    onClick={() => handleFilterHistoryById(items.id)}
                    className="bg-green-500 hover:bg-green-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer"
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <span
          className={`text-2xl text-red-600 ${
            QuotationHistory.length === 0 ? "" : "hidden"
          }`}
        >
          Please Wait Data is loading...
        </span>
      </div>

      {/* =======👇 Discont and Seprate History or Quotation 👇======= */}
      <div
        className={`w-[100%] h-screen mx-auto mb-6 mt-16 ${
          hideHistroyWhenClickView ? "" : "hidden"
        }`}
      >
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Discount Page
        </h1>
        <form
          // onSubmit={handleSubmit}
          className="w-[90%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
        >
          <label htmlFor="shopkeepername" className="text-xl italic">
            Customer Name
          </label>
          <input
            id="shopkeepername"
            type="text"
            readOnly
            value={filterAllHistoryDetails?.customer_detail?.username || ""}
            className="w-[78.7%] min-h-10 max-h-20 border border-black rounded-md px-4 py-1 my-4 ml-4"
          />

          <br />
          <span className="grid grid-cols-2">
            <div className="flex items-center">
              <label htmlFor="address" className="text-xl italic mr-2">
                Address
              </label>
              <textarea
                type="text"
                value={filterAllHistoryDetails?.customer_detail?.address || ""}
                placeholder="Your address"
                className="w-[79.5%] min-h-10 max-h-20 border border-black rounded-md px-4 py-1 mr-4"
                readOnly
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="state" className="text-xl italic mr-2">
                State
              </label>
              <input
                type="text"
                value={filterAllHistoryDetails?.customer_detail?.state || ""}
                placeholder="Your state"
                className="w-[74%] border border-black rounded-md px-4 py-1"
                readOnly
              />
            </div>
          </span>
          <br />
          <br />
          <label htmlFor="mobile" className="text-xl italic mr-4">
            Mobile
          </label>
          <input
            type="text"
            value={filterAllHistoryDetails?.customer_detail?.phone || ""}
            placeholder="Your mobile number"
            className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
            readOnly
          />
          <label htmlFor="gst" className="text-xl italic mr-4">
            GST
          </label>
          <input
            type="text"
            value={filterAllHistoryDetails?.customer_detail?.gst || ""}
            placeholder="Your GST number"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
            readOnly
          />
          <br />
          <br />
          {/* Goods List  */}
          <table className="w-[99%] mx-auto mb-4 border border-black rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  SI No
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  Part No
                </th>
                <th className="py-2 px-2 border-b-2 border-black  border-r-2">
                  Goods Name
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  Specifications
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2  w-[170px] text-center">
                  Quantity
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2  w-[170px] text-center">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {filterAllHistoryDetails?.descriptions?.map((items, index) => (
                <tr key={index} className=" odd:bg-pink-200 text-[17px]">
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {items.part_number}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {items.goods_name}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black text-justify">
                    {items.specifications.map((items, index) => (
                      <div key={index}>
                        {"👉"} {items}
                      </div>
                    ))}
                  </td>

                  <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[170px] text-center">
                    {items.measurement_number}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[170px] text-center">
                    {FormatIndianCurrency.format(items.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <label htmlFor="discount" className="text-xl italic mr-4">
              Discount
            </label>
            <input
              id="discount"
              type="text"
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Your discount"
              className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
            />
          </div>

          {/* Total Amount */}
          {filterAllHistoryDetails && (
            <div className="w-[50%] mx-auto mt-4 border border-black rounded-md py-2 px-2">
              <p className="text-xl italic text-center ">
                Total Amount: {FormatIndianCurrency.format(discontAfterAmount)}
              </p>
              <p
                className={`text-xl italic text-center ${
                  parseInt(cgstSgstAmount) === 0 ? "hidden" : ""
                }`}
              >
                CGST (9%): {FormatIndianCurrency.format(cgstSgstAmount)}
              </p>
              <p
                className={`text-xl italic text-center ${
                  parseInt(cgstSgstAmount) === 0 ? "hidden" : ""
                }`}
              >
                SGST (9%): ₹ {FormatIndianCurrency.format(cgstSgstAmount)}
              </p>
              <p
                className={`text-xl italic text-center ${
                  parseInt(igstAmount) === 0 ? "hidden" : ""
                } `}
              >
                IGST (18%): ₹ {FormatIndianCurrency.format(igstAmount)}
              </p>
              <p className="text-xl italic text-center">
                Final Amount: ₹{" "}
                {FormatIndianCurrency.format(finalAmountAfterDiscount)}
              </p>
            </div>
          )}

          {/* Discont After Generate Quotation Button */}
          <div className="w-full flex justify-center items-center">
            <span
              onClick={handleNewQuotationGenerate}
              className="bg-green-400 hover:bg-green-500 text-xl mt-2 py-1 px-2 rounded-md cursor-pointer"
            >
              Generate Quotation
            </span>
          </div>
        </form>
      </div>

      {/* ======👇 Pdf Generate Section 👇======= */}

      <div
        className={`w-full flex justify-center absolute -top-20 bg-white z-[99] mx-auto mt-4 ${
          pdfPreviewShowHiden ? "" : "hidden"
        }`}
      >
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
                  Sales@ankusamengineering.com
                  website:www.ankusamengineering.com
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
                  {filterAllHistoryDetails?.customer_detail?.username}
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
                  {filterAllHistoryDetails?.customer_detail?.address}
                </div>
                <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                  Quotation NO:
                </div>
                <div className="w-[148px] lg:w-[226px] pl-1 flex items-center lg:text-[17px] text-[10px]">
                  {/* No: AEPL/PO/24-25/37 */}Q/2024-25/
                  <span className="uppercase">{username}</span>/
                  {filterAllHistoryDetails?.id}
                </div>
              </div>

              {/* State and Supplier section */}
              <div className=" border-b-[1px] border-black flex">
                <div className="w-[91px] lg:w-[150px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                  State
                </div>
                <div className="w-[448px] lg:w-[650px] pl-1 border-r-[1px] border-black">
                  {filterAllHistoryDetails?.customer_detail?.state}
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
                  {filterAllHistoryDetails?.customer_detail?.phone}
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
                  {filterAllHistoryDetails?.customer_detail?.gst}
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
                  {filterAllHistoryDetails?.descriptions?.map(
                    (goods, index) => (
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
                          {FormatIndianCurrency.format(parseFloat(goods.rate))}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px] text-center">
                          {goods.measurement_number}
                        </td>

                        <td className="border-black py-2 w-[109.1px] text-center">
                          {FormatIndianCurrency.format(
                            parseFloat(goods.rate) * goods.measurement_number
                          )}
                        </td>
                      </tr>
                    )
                  )}
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
                  {FormatIndianCurrency.format(totalAmount)}
                </div>
              </div>

              {/* Total Discount Amount */}
              <div className=" border-b-[1px] border-black flex">
                <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                  {/* Total Amounts */}
                </div>
                <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-9 font-semibold md:text-xl text-[13px]">
                  <span className="border-l border-black pl-[5px]">
                    Total Discount
                  </span>
                </div>
                <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
                  - {FormatIndianCurrency.format(discount || 0)}
                </div>
              </div>

              {/* Discount After Amount */}
              <div className=" border-b-[1px] border-black flex">
                <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]">
                  {/* Total Amounts */}
                </div>
                <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end lg:pr-[89px] pr-[72px] font-semibold md:text-xl text-[13px]">
                  <span className="border-l border-black pl-2 ">Amount</span>
                </div>
                <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
                  {FormatIndianCurrency.format(discontAfterAmount)}
                </div>
              </div>

              {/* CGST Calculate */}
              <div
                className={`border-b-[1px] border-black flex ${
                  parseInt(cgstSgstAmount) === 0 ? "hidden" : ""
                }`}
              >
                <div className="w-[120px] lg:w-[152px] border-black border-r-[1px] text-center font-semibold md:text-xl text-[13px]"></div>
                <div className="w-[599px] lg:w-[866px] border-r-[1px] border-black text-end pr-10 font-semibold md:text-xl text-[13px]">
                  <span className="border-l border-black pl-2 lg:pr-[28.5px] pr-[18px]">
                    CGST (9%)
                  </span>
                </div>
                <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
                  {FormatIndianCurrency.format(cgstSgstAmount)}
                </div>
              </div>

              {/* SGST Calculate */}
              <div
                className={`border-b-[1px] border-black flex ${
                  parseInt(cgstSgstAmount) === 0 ? "hidden" : ""
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
                  {FormatIndianCurrency.format(cgstSgstAmount)}
                </div>
              </div>

              {/* IGST Calculate */}
              <div
                className={`border-b-[1px] border-black flex ${
                  parseInt(igstAmount) === 0 ? "hidden" : ""
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
                  {FormatIndianCurrency.format(igstAmount)}
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
                  {convertToWords(finalAmountAfterDiscount)}
                </div>
                <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px] flex pl-3">
                  {FormatIndianCurrency.format(
                    finalAmountAfterDiscount.toFixed(2)
                  )}
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
              <span className="uppercase">
                {localStorage.getItem("Log_username")}
              </span>
            </div>
          </div>

          <div className="w-full md:flex justify-center items-center gap-4 mt-4 hidden">
            <button
              onClick={handlePrint}
              className=" bg-green-500 hover:bg-green-600 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black"
            >
              Print
            </button>

            <span
              // to="/historyquotation"
              onClick={() => setPdfPreviewShowHiden(false)}
              className="bg-gradient-to-r hover:from-green-400 to-blue-500 from-pink-500 hover:to-yellow-500 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black cursor-pointer"
            >
              Go Back
            </span>
          </div>
          <div className="lg:mt-6"></div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default HistoryQuotationShow;

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
