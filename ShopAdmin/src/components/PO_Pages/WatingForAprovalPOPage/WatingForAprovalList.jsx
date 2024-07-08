import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";

function WatingForAprovalList() {
  // =========👇 Fetch Shopkeeper Name and id 👇==========
  const [shopkeepersNameId, setShopkeepersNameId] = useState(
    () => JSON.parse(localStorage.getItem("WFASpNameID")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/created_po/get_all_created_po_shop_name.php"
        );

        if (Array.isArray(response.data.data)) {
          setShopkeepersNameId(response.data.data);
          localStorage.setItem(
            "WFASpNameID",
            JSON.stringify(response.data.data)
          );
        }
      } catch (error) {
        console.error("ShopkeeperName Error: " + error);
      }
    };
    fetchData();
  }, [setShopkeepersNameId]);

  //=========👇 get shopkeeper Id when clicked on shopkeeper Name 👇======
  const [spName, setSpName] = useState(
    () => localStorage.getItem("WFAspName") || ""
  );
  const [shopkeeperDetailsWhenClickSpName, setShopkeeperDetails] = useState(
    () => localStorage.getItem("WFASpId") || ""
  );
  const [createdPoListID, setCreatedPoListID] = useState([]);

  const handleShopkeeperId = async ({ name, id }) => {
    localStorage.setItem("WFAspName", name);
    localStorage.setItem("WFASpId", id);
    setSpName(name);
    setShopkeeper_id(id);

    const formData = new FormData();
    formData.append("shopkeeper_id", id);

    try {
      const response = await axios.post(
        "/api/created_po/get_created_po_th_shop_id.php",
        formData
      );

      // console.log('====================================');
      // console.log("Created poList: " + JSON.stringify(response, null, 2));
      // console.log('====================================');

      if (Array.isArray(response.data)) {
        setCreatedPoListID(response.data);
        setGoodsListID(true);
      }
    } catch (error) {
      console.log("Created Po get List Faild: " + error.message);
    }
  };

  // ===========👇 Click goods id fetch goods details list 👇=============
  const [modelGoodsListID, setGoodsListID] = useState(false);
  const [createdPoGoodsId, setCreatedPoGoodsId] = useState(
    () => localStorage.getItem("WFACreatedPoGoodsId") || ""
  ); // Edit

  const [createdPoList, setCreatedPoList] = useState(
    () => JSON?.parse(localStorage.getItem("WFACreatedPoList")) || []
  );

  const [finalAmount, setFinalAmount] = useState(
    () => localStorage.getItem("WFAFinalTotalAmout") || ""
  ); // Edit right now

  const handleGoodsListId = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    setCreatedPoGoodsId(id);
    localStorage.setItem("WFACreatedPoGoodsId", id);

    console.log("GoodsID: " + id);

    try {
      const response = await axios.post(
        "/api/created_po/get_create_po_th_created_id.php",
        formData
      );

      console.log("Response2: " + JSON.stringify(response.data[0], null, 2));

      if (Array.isArray(response.data[0].item_all_detail)) {
        setCreatedPoList(response.data[0].item_all_detail);
        setFinalAmount(response.data[0].final_total_amout);
        localStorage.setItem(
          "WFACreatedPoList",
          JSON.stringify(response.data[0].item_all_detail)
        );
        localStorage.setItem(
          "WFAFinalTotalAmout",
          response.data[0].final_total_amout
        );
        setGoodsListID(false);
      }
    } catch (error) {
      console.log("Error fetch goods list: " + error.message);
    }
  };

  //========👇 Rejected Po Response handle 👇=============
  const [modelRejectedPoResponse, setModelRejectedPoResponse] = useState(false);

  // ==========👇 Accepted Po Response handle 👇=================
  const handleAcceptedPoResponse = async () => {
    const formData = new FormData();
    formData.append("shopkeeper_id", shopkeeper_id); //this ID received by handleGoodsListId (Goods ID)
    formData.append("descriptions", createdPoList);
    formData.append("created_po_id", createdPoGoodsId);

    console.log("CreatedPOID: " + shopkeeper_id);
    console.log("created_po_id: " + createdPoGoodsId);
    console.log("descriptions: " + JSON.stringify(createdPoList, null, 2));

    // try {
    //   const response = await axios.post('/api/open_po/open_po.php', formData);
    //   console.log("ID: "+ createdPoGoodsId)

    //   console.log("Accepted Po Response: " + JSON.stringify(response, null, 2));

    // } catch (error) {
    //   console.log("Error Accepted Po Response: " + error.message);
    // }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#efe7cb] pt-16 relative">
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline capitalize">
          Wating for Aproval Purchase Order (PO)
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#82f273] rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Created Po List
            </h1>

            {/* Shopkeeper Name listed here */}
            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                {shopkeepersNameId.map((data, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleShopkeeperId({ name: data.name, id: data.id })
                    }
                    className="hover:bg-pink-400 hover:text-white duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-yellow-700"
                  >
                    {data.name}, {data.id}
                  </li>
                ))}
              </ul>
              {shopkeepersNameId.length === 0 ? (
                <span className="text-red-500 ml-4">Data is Loading...</span>
              ) : (
                ""
              )}
            </div>
          </div>

          {/*==================👇 Goods Description list 👇===================*/}
          <div className="bg-[#3696d1] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section Aproval button */}
            <div className="bg-[] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic text-white">
                {spName}
              </span>
              {/* Aproval Button */}
              <div className="flex gap-4 mr-4 text-xl font-semibold italic">
                <span
                  onClick={handleAcceptedPoResponse}
                  className="bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer shadow-md shadow-gray-600"
                >
                  Aproval
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer shadow-md shadow-gray-600">
                  Reject
                </span>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />

            {/*=====👇 Goods list or Goods table 👇=========*/}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
              <table className="w-full text-center border border-black">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#82f5c7]">
                  <tr>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SI No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black  border-r-2 w-[38%]">
                      Description of Goods
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Rate
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Qty
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      CGST
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SGST
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 w-[18%]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createdPoList.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {index + 1}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[68%]">
                        {items.descriptions}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.rate}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.quantity}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.cgst}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.sgst}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[18%]">
                        {items.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-xl font-semibold flex justify-end pr-12 border-b-2 border-black border-r-2 gap-16 bg-yellow-400">
                {" "}
                <span className=" border-r-2 border-black pr-6">
                  Final Total Amount
                </span>
                {finalAmount}
              </div>
              {createdPoList.length === 0 ? (
                <span className="text-red-500 ml-4 text-xl font-semibold">
                  👈Click Created PO List after All created PO listed here..
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* ==============👇 Model Goods List When Click Goods Model Open 👇=========== */}
          {modelGoodsListID && (
            <div
              className={`mx-2 text-xl italic z-50 pt-16 bg-[rgba(0,0,0,0.5)] rounded-md w-full h-screen top-0 -left-2 pl-16 fixed flex justify-center`}
            >
              <h1 className="w-[400px] text-2xl font-semibold py-1 text-center absolute bg-[#30d7ed] rounded-3xl mt-1 flex items-center justify-center gap-6">
                Wating For Aproval PO List{" "}
                <span>
                  <IoMdCloseCircle
                    className="text-3xl text-red-600 cursor-pointer"
                    onClick={() => setGoodsListID(false)}
                  />
                </span>
              </h1>
              <div className="w-[100%] mt-12">
                <table className="w-[80%] mx-auto text-center px-6 py-6 bg-[#a8e6cf] rounded-lg shadow-md shadow-black border overflow-hidden">
                  <thead className=" sticky bg-orange-400 text-[blue] border-b-2">
                    <tr>
                      <th>SI NO</th>
                      <th>Created PO</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdPoListID.map((data, index) => (
                      <tr
                        key={index}
                        className=" bg-yellow-300 border-b-2 font-semibold font-serif"
                      >
                        <td>{index + 1}</td>
                        <td>Recent Created Po</td>
                        <td>{formatDate(data.time)}</td>
                        <td>{data.final_total_amout}</td>
                        <td
                          className=" cursor-pointer font-bold text-pink-600 underline"
                          onClick={() => handleGoodsListId(data.id)}
                        >
                          Views
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============👇 Rejected Po Model Message or Re-mark 👇=============*/}
          {modelRejectedPoResponse && (
            <div className="absolute w-full h-screen mx-auto z-50 bg-[rgba(0,0,0,0.5)] left-0 top-0">
              <div className="mt-16 flex justify-center items-center">
                <div className="w-96 mx-auto bg-green-500 mt-20 rounded-md overflow-hidden shadow-md shadow-pink-600">
                  <h1 className="text-center text-xl bg-orange-400 font-serif font-semibold text-white py-2 underline">
                    Reason for Reject PO{" "}
                  </h1>
                  <div className="py-4 px-4">
                    <textarea
                      name=""
                      id=""
                      placeholder="Can you write resons.."
                      className="py-2 px-2 rounded-md text-xl italic w-full min-h-[200px] max-h-[300px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WatingForAprovalList;

//===========👇 Date Formate Functions 👇===========

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const options = { month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day] = formattedDate.split(" ");

  return `${month}, ${day}`; // Format date to 'Month, Day'
}
