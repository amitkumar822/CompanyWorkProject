import React, { useEffect, useState } from "react";
import axios from "axios";
import loadingGfg from "../../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloseCircle } from "react-icons/io";
import AnkusamLogo from "../../../data/Photos/CreatedPOInvoice/AnkusamLogo.png";
import TUVLogo from "../../../data/Photos/CreatedPOInvoice/TUVLogo.png";
import { useNavigate } from "react-router";

function OpenPo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  //============👇 Open PO Print And Download Functionality 👇====================
  const handlePrintOpenPO = () => {
    window.print();
  };

  const [isLoading, setIsLoading] = useState(false);

  // ================👇 Fetch Shopkeeper Name and ID 👇===============
  const [shopkeepersNameId, setShopkeepersNameId] = useState(
    () => JSON.parse(localStorage.getItem("openPoNameID")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/open_po/get_shop_id_name.php");

        if (Array.isArray(response.data.data)) {
          setShopkeepersNameId(response.data.data);
          localStorage.setItem(
            "openPoNameID",
            JSON.stringify(response.data.data)
          );
        }
      } catch (error) {
        console.error("Fetch Shopkeeper Name and ID Error: " + error);
      }
    };
    fetchData();
  }, [setShopkeepersNameId]);

  //==============👇 get shopkeeper Id when clicked on shopkeeper Name 👇==========
  const [modelGoodsListID, setModelGoodsListID] = useState(false);
  const [aprovalPoListID, setAprovalPoListID] = useState(
    () => JSON.parse(localStorage.getItem("openPoAprovalPoList")) || []
  );
  const [shopkeeperName, setShopkeeperName] = useState(
    () => localStorage.getItem("openPoShopkeeperName") || ""
  );

  const [shopkeeperAdressAllDetails, setShopkeeperAdressAllDetails] = useState(
    () =>
      JSON.parse(localStorage.getItem("openPoShopkeeperAdressAllDetails")) || []
  );

  const handleShopkeeperId = async ({ name, id }) => {
    setModelGoodsListID(true);
    setIsLoading(true);
    setShopkeeperName(name);
    localStorage.setItem("openPoShopkeeperName", name);

    //when click shopkeeper name clears all olds goods descriptors
    localStorage.removeItem("openPoAprovalGoodsDescriptions");

    const formData = new FormData();
    formData.append("shopkeeper_id", id);

    const formDataSpAdressDetails = new FormData();
    formDataSpAdressDetails.append("id", id);

    try {
      const response = await axios.post(
        "/api/open_po/get_open_po_th_shop_id.php",
        formData
      );

      const responseSpAdressDetails = await axios.post(
        "/api/open_po/get_shop_detail_th_id.php",
        formDataSpAdressDetails
      );

      if (Array.isArray(responseSpAdressDetails.data)) {
        setShopkeeperAdressAllDetails(responseSpAdressDetails.data);
        localStorage.setItem(
          "openPoShopkeeperAdressAllDetails",
          JSON.stringify(responseSpAdressDetails.data)
        );
      }

      if (Array.isArray(response.data)) {
        setAprovalPoListID(response.data);
        setIsLoading(false);
        localStorage.setItem(
          "openPoAprovalPoList",
          JSON.stringify(response.data)
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error to fetch Goods details: " + error);
      toast.error("Error to fetch Goods details: => " + error.message);
    }
  };

  // ============👇 get Aproval Po List 👇==============
  const [aprovalPoList, setAprovalPoList] = useState(
    () => JSON.parse(localStorage.getItem("openPoAprPoList")) || []
  );
  const [aprovalGoodsDescriptions, setAprovalGoodsDescriptions] = useState(
    () =>
      JSON.parse(localStorage.getItem("openPoAprovalGoodsDescriptions")) || []
  );

  const handleGoodsListId = async (id) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/open_po/get_open_po_th_id.php",
        formData
      );

      if (Array.isArray(response.data)) {
        setAprovalPoList(response.data);
        localStorage.setItem("openPoAprPoList", JSON.stringify(response.data));
        setAprovalGoodsDescriptions(response.data[0].descriptions);
        localStorage.setItem(
          "openPoAprovalGoodsDescriptions",
          JSON.stringify(response.data[0].descriptions)
        );
        setIsLoading(false);
        setModelGoodsListID(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error get Aproval Po List: " + error);
    }
  };

  // ==========👇 Preview Open PO 👇===========
  const [showPreview, setShowPreview] = useState(false);
  const handlePreviewInvoice = () => {
    setShowPreview(true);
  };

  // =============👇 Handle Close PO 👇============
  const [showClosePoConfirmation, setShowClosePoConfirmation] = useState(false);

  const handleClosePo = async () => {
    if (
      !(
        shopkeeperAdressAllDetails[0]?.id ||
        aprovalPoList[0]?.id ||
        aprovalPoList[0]?.time ||
        aprovalPoList[0]?.time_of_created_new_po ||
        aprovalPoList[0]?.total_amount
      ) ||
      aprovalGoodsDescriptions.length === 0
    ) {
      alert("All Fields not full");
      return;
    }

    const formData = new FormData();
    formData.append("shopkeeper_id", shopkeeperAdressAllDetails[0]?.id);
    formData.append("item_id", aprovalPoList[0]?.id);
    formData.append("time", aprovalPoList[0]?.time);
    formData.append(
      "time_of_created_new_po",
      aprovalPoList[0]?.time_of_created_new_po
    );
    formData.append("total_amount", aprovalPoList[0]?.total_amount);
    formData.append("descriptions", JSON.stringify(aprovalGoodsDescriptions));

    // =========Delete FormData ========
    const deleteFormData = new FormData();
    deleteFormData.append("id", aprovalPoList[0]?.id);

    try {
      const response = await axios.post(
        "/api/closed_po/closed_po.php",
        formData
      );

      if (response.data.success) {
        toast.success("PO Closed Successfully!");
        setShowClosePoConfirmation(false);
        // delete the open po from the database
        const deleteResponse = await axios.post(
          "/api/open_po/delete_open_po.php",
          deleteFormData
        );

        if (deleteResponse.data.deleted) {
          // clear all local storage items after successful deletion
          localStorage.removeItem("openPoNameID");
          localStorage.removeItem("openPoShopkeeperName");
          localStorage.removeItem("openPoShopkeeperAdressAllDetails");
          localStorage.removeItem("openPoAprovalPoList");
          localStorage.removeItem("openPoAprovalGoodsDescriptions");

          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      }
    } catch (error) {
      console.log("Error to Close Po: " + error.message);
      setShowClosePoConfirmation(false);
    }
  };

  // ===========👇 Delete Rejected Po 👇==========
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteConfirmation = async () => {
    const formData = new FormData();
    formData.append("id", aprovalPoList[0]?.id);

    try {
      const response = await axios.post(
        "/api/open_po/delete_open_po.php",
        formData
      );
      if (response.data.deleted) {
        toast.success("PO Deleted Successfully!");
        setShowClosePoConfirmation(false);

        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (error) {
      console.log("Error Faild to Delete: " + error);
      setShowClosePoConfirmation(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto  pt-16 relative">
        {/* Loading image section */}
        <div
          className={`w-full md:h-screen -mt-16 z-[52] bg-[rgba(0,0,0,0.5)] absolute ${
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

        {/* ========👇 Shopkeeper And Open PO Goods All Details 👇=========== */}
        <div className={`${showPreview ? "hidden" : ""} bg-[#d4e75b] h-screen`}>
          <h1 className="text-center py-2 text-[26px] font-bold italic font-serif underline capitalize">
            Welcome to Open PO (Purchase Order)
          </h1>
          {/* =========👇 Goods and Shopkeeper All Details */}
          <div className="w-[98%] grid lg:grid-cols-[22%_auto] mx-auto rounded-lg shadow-md shadow-red-500 overflow-hidden">
            {/*========👇 Shopkeeper name list section 👇============*/}
            <div className="pt-3 bg-[#ff98da] rounded-md shadow-md shadow-red-500 mr-1">
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
                      {data.name}
                      {/* , {data.id} */}
                    </li>
                  ))}
                </ul>
                {shopkeepersNameId.length === 0 ? (
                  <span className="ml-4">Data is Loading...</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/*==================👇 Goods Description list 👇===================*/}
            <div className="bg-[#f77fee] rounded-md shadow-md shadow-red-500 ml-1 overflow-hidden">
              {/* Search and Name Section Aproval button */}
              <div className="bg-[] pl-3 flex justify-between py-2 px-2">
                <span className="text-xl font-semibold italic">
                  {shopkeeperName}
                </span>
                {/* Aproval Button */}
                <div className="flex gap-4 mr-4 text-xl font-semibold italic">
                  <button
                    onClick={() => setShowClosePoConfirmation(true)}
                    className="bg-[#34b79b] text-white hover:bg-[#49dcbc] duration-200 py-1 px-2 rounded-md shadow-md shadow-[yellow] font-serif"
                  >
                    Close PO
                  </button>
                  <button
                    onClick={handlePreviewInvoice}
                    className="bg-green-500 hover:bg-green-600 duration-200 py-1 px-2 rounded-md shadow-md shadow-[yellow] text-white font-serif"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="bg-red-500 hover:bg-red-600 duration-200 py-1 px-2 rounded-md shadow-md shadow-[yellow] text-white font-serif"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className="border border-[#c0d69c]" />

              {/*=====👇 Goods list or Goods table 👇=========*/}
              <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar">
                <table className="w-full text-center border border-black">
                  <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#bcfcc9]">
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
                        CGST(9%)
                      </th>
                      <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                        SGST(9%)
                      </th>
                      <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                        IGST(18%)
                      </th>
                      <th className="py-2 px-2 border-b-2 border-black border-r-2 w-[18%]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {aprovalGoodsDescriptions.map((items, index) => (
                      <tr key={index} className=" odd:bg-[#afffea] text-[17px]">
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
                        <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                          {items.igst}
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
                  {aprovalPoList[0]?.total_amount}
                </div>
                {aprovalGoodsDescriptions.length === 0 ? (
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
                <h1 className="w-[400px] text-2xl font-semibold py-1 text-center absolute bg-[#23ff26] rounded-3xl mt-1 flex items-center justify-center gap-6">
                  Successful Aproval PO List{" "}
                  <span>
                    <IoMdCloseCircle
                      className="text-3xl text-red-600 cursor-pointer"
                      onClick={() => setModelGoodsListID(false)}
                    />
                  </span>
                </h1>
                <div className="w-[100%] mt-12">
                  <table className="w-[80%] mx-auto text-center px-6 py-6 bg-[#a8e6cf] rounded-lg shadow-md shadow-black border overflow-hidden">
                    <thead className=" sticky bg-[#8be3e1] text-[blue] border-b-2">
                      <tr>
                        <th>SI NO</th>
                        <th>Created Date</th>
                        <th>Aproval Date</th>
                        <th>Aproval Time</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aprovalPoListID.map((data, index) => (
                        <tr
                          key={index}
                          className=" bg-yellow-300 border-b-2 font-semibold font-serif"
                        >
                          <td>{index + 1}</td>
                          <td>{formatDate(data.time)}</td>
                          <td>{formatDate(data.time_of_created_new_po)}</td>
                          <td>{formatTime(data.time)}</td>
                          <td>{data.total_amount}</td>
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
          </div>

          {/* =============👇 Delete Confirmation Dilog Box 👇============= */}
          <div
            className={`w-full h-full z-50 bg-[rgba(0,0,0,0.5)]  top-0 left-0 flex justify-center items-center fixed ${
              !showDeleteConfirmation ? "hidden" : ""
            }`}
          >
            <div className={`w-[500px] bg-[#d56767] p-4 rounded-md z-50`}>
              <h1 className="text-xl text-white font-semibold">
                Delete Confirmation
              </h1>
              <p className="text-sm text-white">
                Are you sure you want to delete the selected goods?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded-md font-semibold shadow-md shadow-yellow-400"
                  onClick={() => setShowDeleteConfirmation(false)}
                >
                  No
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 duration-200 text-white px-4 py-2 rounded-md font-semibold shadow-md shadow-yellow-400"
                  onClick={handleDeleteConfirmation}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>

          {/* =============👇 Close PO Confirmation Dilog Box 👇============= */}
          <div
            className={`w-full h-full z-50 bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex justify-center items-center ${
              !showClosePoConfirmation ? "hidden" : ""
            }`}
          >
            <div className={`w-[500px] bg-[#678ed5] p-4 rounded-md z-50`}>
              <h1 className="text-xl text-white font-semibold">
                Close PO Confirmation
              </h1>
              <p className="text-sm text-white">
                Are you sure you want to colose PO?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded-md font-semibold shadow-md shadow-yellow-400"
                  onClick={() => setShowClosePoConfirmation(false)}
                >
                  No
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 duration-200 text-white px-4 py-2 rounded-md font-semibold shadow-md shadow-yellow-400"
                  onClick={handleClosePo}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================👇 Print Open PO 👇========================= */}

        <div
          className={`w-full flex justify-center absolute -top-20 bg-white z-[99] mx-auto mt-4 ${
            showPreview ? "" : "hidden"
          } `}
        >
          <div className="lg:w-[80%] w-[710px] md:my-20 my-16 pb-32">
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
                    <h1 className="font-semibold text-[10px]">
                      ISO 90001:2015
                    </h1>
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
                  <h1>
                    Contact Number : +91 7305046742, 7305046744, 9003441337
                  </h1>
                  <h1>GSTIN: 33AAUCA1961FlZN</h1>
                </div>
                <span className="text-[10px] lg:text-[18px]">TO</span>
              </div>

              {/* Builling section */}
              <div className="text-[11px] lg:text-[19px]">
                {/* Name and date section */}
                <div className=" border-t-[1px] border-black flex">
                  <div className="w-[74px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Name
                  </div>
                  <div className="w-[448px] lg:w-[747px] pl-1 border-r-[1px] border-black">
                    {shopkeeperName}
                  </div>
                  <div className="w-[91px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Date:
                  </div>
                  <div className="w-[113px] lg:w-[166px] pl-1 flex items-center">
                    {formatOnlyDate(aprovalPoList[0]?.time)}
                  </div>
                </div>

                {/* Address section */}
                <div className=" border-t-[1px] border-b-[1px] border-black flex">
                  <div className="w-[74px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Address
                  </div>
                  <div className="w-[448px] lg:w-[747px] pl-1 border-r-[1px] border-black">
                    {shopkeeperAdressAllDetails[0]?.address}
                  </div>
                  <div className="w-[91px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    No:
                  </div>
                  <div className="w-[113px] lg:w-[166px] pl-1 flex items-center">
                    AEPL/PO/24-25/{aprovalPoList[0]?.id}
                  </div>
                </div>

                {/* State and Supplier section */}
                <div className=" border-b-[1px] border-black flex">
                  <div className="w-[74px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    State
                  </div>
                  <div className="w-[448px] lg:w-[747px] pl-1 border-r-[1px] border-black">
                    {shopkeeperAdressAllDetails[0]?.state}
                  </div>
                  <div className="w-[91px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Supplier code:
                  </div>
                  <div className="w-[113px] lg:w-[166px] pl-1 flex items-center"></div>
                </div>

                {/* Mobile and Delivery date section */}
                <div className=" border-b-[1px] border-black flex">
                  <div className="w-[74px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Mobile
                  </div>
                  <div className="w-[448px] lg:w-[747px] pl-1 border-r-[1px] border-black">
                    {shopkeeperAdressAllDetails[0]?.mobile}
                  </div>
                  <div className="w-[91px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    Date of delivery:
                  </div>
                  <div className="w-[113px] lg:w-[166px] pl-1 flex items-center"></div>
                </div>

                {/* GST number section */}
                <div className=" border-b-[1px] border-black flex">
                  <div className="w-[74px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold">
                    GST no:
                  </div>
                  <div className="w-[448px] lg:w-[747px] pl-1 border-r-[1px] border-black">
                    {shopkeeperAdressAllDetails[0]?.gst}
                  </div>
                  <div className="w-[91px] lg:w-[138px] pl-1 border-r-[1px] border-black flex items-center font-semibold"></div>
                  <div className="w-[113px] lg:w-[166px] pl-1 flex items-center"></div>
                </div>

                {/*========👇 Description of Goods Table Section 👇===========*/}
                <table className="lg:w-full">
                  <thead className="bg-gray-300">
                    <tr className="border-b-[1px] border-black lg:text-[18px]">
                      <th className="border-r-[1px] border-black py-2 w-[91px] lg:w-[104px]">
                        S.No.
                      </th>
                      <th className="border-r-[1px] border-black py-2 w-[381px]">
                        Description of Goods
                      </th>
                      <th className="border-r-[1px] border-black py-2 w-[90.5px]">
                        Rate
                      </th>
                      <th className="border-r-[1px] border-black py-2 w-[67.2px] lg:w-[65px]">
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
                    {aprovalGoodsDescriptions.map((data, index) => (
                      <tr className="border-b-[1px] border-black" key={index}>
                        <td className="border-r-[1px] border-black py-2 w-[91px] lg:w-[104px]">
                          {index + 1}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[381px]">
                          {data.descriptions}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[68.2px] lg:w-[65px]">
                          {data.rate}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[90.5px]">
                          {data.quantity}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[60px]">
                          {data.cgst}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[60px]">
                          {data.sgst}
                        </td>
                        <td className="border-r-[1px] border-black py-2 w-[60px]">
                          {data.igst}
                        </td>
                        <td className="border-black py-2 w-[109.1px]">
                          {data.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Grand Total */}
                <div className=" border-b-[1px] border-black flex">
                  <div className="w-[91px] lg:w-[152px] border-black"></div>
                  <div className="w-[380px] lg:w-[553.5px] border-black"></div>
                  <div className="w-[68px] lg:w-[94.5px] border-black"></div>
                  <div className="w-[151px] lg:w-[218px] border-r-[1px] border-black text-center font-semibold md:text-xl text-[13px]">
                    Total Amounts
                  </div>
                  <div className="w-[107px] lg:w-[158.4px] border-black text-center font-semibold md:text-xl text-[13px]">
                    {aprovalPoList[0]?.total_amount}
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
                <h3 className="mt-6"></h3>
                <h2 className="font-semibold">Purchase Department.</h2>
              </div>
            </div>

            <div className="w-full md:flex justify-center items-center gap-4 mt-4 hidden">
              <button
                onClick={handlePrintOpenPO}
                className=" bg-green-500 hover:bg-green-600 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black"
              >
                Print
              </button>

              <button
                onClick={() => setShowPreview(false)}
                className="bg-gradient-to-r hover:from-green-400 to-blue-500 from-pink-500 hover:to-yellow-500 duration-200 text-xl py-1 px-2 font-semibold text-white uppercase rounded-md shadow-md shadow-black"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default OpenPo;

//===========👇 Date Formatting Functions 👇===========

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

//===========👇 Time Formatting Functions 👇===========
function formatTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid time:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 hour to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`; // Format time to 'HH:MM AM/PM'
}

// ===========👇 Only Date Formatting Functions 👇 =================
const formatOnlyDate = (dateTimeString) => {
  if (!dateTimeString) return "";
  // Split the date and time parts
  const [datePart] = dateTimeString.split(" ");

  // Split the date part into year, month, and day
  const [year, month, day] = datePart.split("-");

  // Format the date as dd.mm.yy
  const formattedDate = `${day}.${month}.${year.slice(2)}`;

  return formattedDate;
};

//=============👇 Term And Conditions 👇==========

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
