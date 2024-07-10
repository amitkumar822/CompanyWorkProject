import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import loadingGfg from "../../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RejectedPo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // ========👇 Fetch Shopkeeper Name and Id 👇============
  const [shopkeeperNameId, setShopkeeperNameId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/rejected_po/get_shop_id_name.php"
        );

        if (Array.isArray(response.data.data)) {
          setShopkeeperNameId(response.data.data);
        }
      } catch (error) {
        console.error("Error: " + error);
        toast.error("Error fetch Shopkeeper Name and Id: " + error.message);
      }
    };
    fetchData();
  }, [setShopkeeperNameId]);

  // ===========👇 fetch Rejected Po Name and Id 👇============
  const [rejectedPoList, setRejectedPoList] = useState([]);
  const [shopkeeperName, setShopkeeperName] = useState("");

  const handleShopkeeperNameId = async ({ name, id }) => {
    setModelGoodsListID(true);
    setIsLoading(true);
    setShopkeeperName(name);
    const formData = new FormData();
    formData.append("shopkeeper_id", id);

    try {
      const response = await axios.post(
        "/api/rejected_po/get_rejected_po_th_shop_id.php",
        formData
      );

      if (Array.isArray(response.data)) {
        setRejectedPoList(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error: " + error);
      toast.error("Error fetch Rejected Po List: " + error.message);
      setIsLoading(false);
      setModelGoodsListID(false);
    }
  };

  // =========👇 fetch Rejected Po Goods list 👇===========
  const [goodsData, setGoodsData] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const [goodsListID, setGoodsListID] = useState("");

  const handleGoodsListId = async (id) => {
    setGoodsListID(id);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/rejected_po/get_rejected_po_th_id.php",
        formData
      );

      if (Array.isArray(response.data)) {
        setGoodsData(response.data);
        setGoodsList(response.data[0].rejected_item_description);
        setModelGoodsListID(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetch Rejected Po Goods list: " + error);
      setIsLoading(false);
    }
  };

  // ===========👇 Click goods id fetch goods details list 👇=============
  const [modelGoodsListID, setModelGoodsListID] = useState(false);

  // ===========👇 Delete Rejected Po 👇==========
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // const handleDeleteRejectedPo = () => {
  //   alert("Button deleted");
  //   setShowDeleteConfirmation(true);
  // };

  const handleDeleteConfirmation = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", goodsListID);

    try {
      const response = await axios.post(
        "/api/rejected_po/deleted_po_remarks.php",
        formData
      );

      if (response.data.deleted) {
        toast.success("Deleted Successfully!");
        setTimeout(() => {
          window.location.reload();
          setIsLoading(false);
          setShowDeleteConfirmation(false);
        }, 1000);
      } else {
        toast.error("Failed to delete!");
      }
    } catch (error) {
      console.error("Delete Rejected PO Error: " + error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto bg-[#3ec483] pt-16 relative">
        {/* Loading image section */}
        <div
          className={`w-full h-full -mt-16 z-[52] bg-[rgba(0,0,0,0.5)] absolute ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className=" absolute w-full h-screen flex justify-center items-center">
            <img
              className="w-[100px] h-[100px] fixed"
              src={loadingGfg}
              alt=""
            />
          </div>
        </div>
        <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline">
          Welcome to Dashboard
        </h1>
        <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*========👇 Shopkeeper name list section 👇============*/}
          <div className="pt-3 bg-[#f35588] text-white rounded-md shadow-md shadow-red-500 mr-1">
            <h1 className="text-2xl font-semibold uppercase text-center italic underline">
              Rejected PO List
            </h1>

            <div className="h-[470px] overflow-y-auto overflow-x-auto mt-2 no-scrollbar">
              <ul className="mx-2 text-xl italic mt-3">
                {shopkeeperNameId.map((data, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleShopkeeperNameId({ name: data.name, id: data.id })
                    }
                    className="bg-[#f64d82] hover:bg-[#cef9e2] hover:text-black duration-200 my-2 cursor-pointer rounded-md px-2 py-2 shadow-md shadow-yellow-200 hover:shadow-black"
                  >
                    {data.name}, {data.id}
                  </li>
                ))}
              </ul>
              <span className={`text-[18px] text-[yellow] px-2 ${shopkeeperNameId.length === 0 ? '' : 'hidden'}`}>Data is loading...</span>
            </div>
          </div>

          {/*==================👇 Goods Description list 👇===================*/}
          <div className="bg-[#ff5c00] rounded-md shadow-md text-white shadow-red-500 ml-1 overflow-hidden">
            {/* Search and Name Section */}
            <div className="bg-[#ff5c00] pl-3 flex justify-between py-2 px-2">
              <span className="text-xl font-semibold italic">
                {/* Sri Kumaran Steels */}
                {shopkeeperName}
              </span>
              <div className="flex gap-4 mr-4">
                <Link
                  to="/createdpoinvoice"
                  className="bg-green-500 hover:bg-green-600 duration-200 px-2 py-1 font-semibold rounded-md text-xl shadow-md shadow-white"
                >
                  CRPO
                </Link>
                <button
                  disabled={goodsData.length === 0 ? true : false}
                  onClick={() => setShowDeleteConfirmation(true)}
                  className={` duration-200 px-2 py-1 font-semibold rounded-md text-xl shadow-md shadow-white ${
                    goodsData.length === 0
                      ? "bg-gray-500"
                      : "bg-[red] hover:bg-red-600 cursor-pointer"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />
            {/* Goods list or Goods table */}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto ">
              <table className="w-full text-center">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#2d6e7e]">
                  <tr>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SI No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black  border-r-2 w-[48%]">
                      Description of Goods
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Rate
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Quantity
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      cgst (9%)
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      sgst (9%)
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {goodsList.map((items, index) => (
                    <tr
                      key={index}
                      className=" odd:bg-[#bab5f6] text-black text-[17px]"
                    >
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {index + 1}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
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
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end pr-2 border-x-2 border-b-2 border-black bg-green-500 text-xl text-black">
                <span className="mr-4 font-semibold italic">
                  Final Amount:{" "}
                </span>
                {goodsData[0]?.total}
              </div>
              <div
                className={`px-2 text-black border border-black bg-white ${
                  goodsData.length === 0 ? "hidden" : ""
                }`}
              >
                <h1 className="text-xl  text-center uppercase font-semibold underline">
                  👇Resonse for Rejected👇
                </h1>

                <p className="text-center text-xl italic py-2 px-4 border border-black my-3">
                  {goodsData[0]?.remarks}
                </p>
              </div>
              <div
                className={`bg-white text-black font-serif font-semibold capitalize ${
                  goodsData.length === 0 ? "" : "hidden"
                }`}
              >
                👈 Click Your Rejected PO List after Show Which reason Your PO
                is rejected?
              </div>
              {/* <span
                className={`ml-2 text-red-500 font-semibold 
                  ${
                  filteredData.length && "hidden"
                }
                `}
              >
                No record found..
              </span> */}
            </div>
          </div>

          {/* ==============👇 Model Goods List When Click Goods Model Open 👇=========== */}
          {modelGoodsListID && (
            <div
              className={`mx-2 text-xl italic z-50 pt-16 bg-[rgba(0,0,0,0.5)] rounded-md w-full h-screen top-0 -left-2 pl-16 fixed flex justify-center`}
            >
              <h1 className="w-[400px] text-2xl font-semibold py-1 text-center absolute bg-[#4ef037] rounded-3xl mt-4 flex items-center justify-center gap-6">
                Rejected PO List{" "}
                <span>
                  <IoMdCloseCircle
                    className="text-3xl text-red-600 cursor-pointer"
                    onClick={() => setModelGoodsListID(false)}
                  />
                </span>
              </h1>
              <div className="w-[100%] mt-[3.8rem]">
                <table className="w-[80%] mx-auto text-center px-6 py-6 bg-[#a8e6cf] rounded-lg shadow-md shadow-black border overflow-hidden">
                  <thead className=" sticky bg-[#7fa6ee] text-[yellow] border-b-2">
                    <tr>
                      <th>SI NO</th>
                      <th>Created Date</th>
                      <th>Rejected Date</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedPoList.map((data, index) => (
                      <tr
                        key={index}
                        className=" bg-[#ffcfdf] border-b-2 font-semibold font-serif"
                      >
                        <td>{index + 1}</td>
                        <td>{formatDate(data.time_of_created_new_po)}</td>
                        <td>{formatDate(data.time)}</td>
                        <td>{data.total}</td>
                        <td
                          className=" cursor-pointer font-bold text-green-600 underline"
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
        </div>

        {/* Delete Confirmation Dilog Box */}
        <div
          className={`w-full h-full z-50 bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 flex justify-center items-center ${
            !showDeleteConfirmation ? "hidden" : ""
          }`}
        >
          <div className={`w-[500px] bg-gray-600 p-4 rounded-md z-50`}>
            <h1 className="text-xl text-white font-semibold">
              Delete Confirmation
            </h1>
            <p className="text-sm text-white">
              Are you sure you want to delete the selected goods?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
                onClick={handleDeleteConfirmation}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default RejectedPo;

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
