import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormatIndianCurrency } from "../../utils/FormatIndianCurrency";
import Select from "react-select";

function HistoryQuotationShow() {
  const [QuotationHistory, setQuotationHistory] = useState(
    () => JSON.parse(localStorage.getItem("HistoryQuotation")) || []
  );
  const username = localStorage.getItem("Log_username");

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

  console.log(
    "filterAllHistoryDetails: " +
      JSON.stringify(filterAllHistoryDetails, null, 2)
  );

  // =======👇 Discont after Amount 👇=======
  const discontAfterAmount = totalAmount - (discount || 0);

  const finalAmountAfterDiscount =
    discontAfterAmount +
    ((cgstSgst * discontAfterAmount) / 100) * 2 +
    (igst * discontAfterAmount) / 100;

  const cgstSgstAmount = ((cgstSgst * discontAfterAmount) / 100).toFixed(2);
  const igstAmount = ((igst * discontAfterAmount) / 100).toFixed(2);

  return (
    <div className="w-full h-screen -mt-16">
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
      </div>

      {/* =======👇 Discont and Seprate History or Quotation 👇======= */}
      <div
        className={`w-[100%] h-screen mx-auto mb-6 mt-16 ${
          hideHistroyWhenClickView ? "" : "hidden"
        }`}
      >
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Discount
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
              // value={discount}
              type="text"
              onChange={(e) => setDiscount(e.target.value)}
              // onChange={(e) => setDiscount(e.target.value)} // Pass event object 'e' to the function
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
              <p className={`text-xl italic text-center`}>
                CGST (9%): {FormatIndianCurrency.format(cgstSgstAmount)}
              </p>
              <p className={`text-xl italic text-center`}>
                SGST (9%): ₹ {FormatIndianCurrency.format(cgstSgstAmount)}
              </p>
              <p className={`text-xl italic text-center `}>
                IGST (18%): ₹ {FormatIndianCurrency.format(igstAmount)}
              </p>
              <p className="text-xl italic text-center">
                Final Amount: ₹{" "}
                {FormatIndianCurrency.format(finalAmountAfterDiscount)}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default HistoryQuotationShow;

