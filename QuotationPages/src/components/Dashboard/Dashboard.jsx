import React, { useEffect, useState } from "react";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginQuotationToken")) {
      navigate("/");
      return;
    }

    if (
      localStorage.getItem("LoginQuotationToken") &&
      localStorage.getItem("Log_username") !== "mani"
    ) {
      alert(
        "Dashboard Page You can't access, Please contact the administrator."
      );
      navigate("/createquotation");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // ==========👇 Featch Goods Details Using API 👇===============

  const [goodsDetails, setGoodsDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("Dash_Goods_details")) || [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_item_descriptions.php");

        if (Array.isArray(response.data.description)) {
          setGoodsDetails(response.data.description);
          localStorage.setItem(
            "Dash_Goods_details",
            JSON.stringify(response.data.description)
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setGoodsDetails]);

  // ==========👇 Search Functions 👇===============
  const [searchInput, setSearchInput] = useState("");

  const filteredGoods = goodsDetails.filter(
    (items) =>
      items.goods_name
        .toLowerCase()
        .includes(searchInput.toString().trim().toLocaleLowerCase()) ||
      items.part_number
        .toLowerCase()
        .includes(searchInput.toString().trim().toLowerCase())
  );

  // ==========👇 Edit Functions 👇===============
  const [editGoodsId, setEditGoodsId] = useState("");
  const [fileData, setFileData] = useState({
    goods_name: "",
    part_number: "",
    rate: "",
    specifications: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        "/api/get_item_discriptions_th_id.php",
        formData
      );

      if (Array.isArray(response.data.description)) {
        setEditGoodsId(id);
        console.log("Edit: " + response.data.description[0].goods_name);
        // setFetchGoodsDetails(response.data.description);
        setFileData({
          goods_name: response.data.description[0].goods_name,
          part_number: response.data.description[0].part_number,
          rate: response.data.description[0].rate,
          specifications:
            response.data.description[0].specifications.join("\n"),
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: " + error);
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", editGoodsId);
    formData.append("goods_name", fileData.goods_name);
    formData.append("part_number", fileData.part_number);
    formData.append("rate", fileData.rate);
    formData.append("specifications", fileData.specifications);

    try {
      const response = await axios.post(
        "/api/update_items_discriptions_th_id.php",
        formData
      );

      console.log("UpdatedResponse: \n" + JSON.stringify(response, null, 2));

      if (response.data === "Updated successfully.") {
        toast.success("Item updated successfully", {
          position: "top-center",
          autoClose: 1700,
        });
        setIsLoading(false);
        setEditGoodsId("");
        setFileData({
          goods_name: "",
          part_number: "",
          rate: "",
          specifications: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Error: " + error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-[91.3vh] mx-auto bg-[#f2d7d7] relative">
        {/* Loading image section */}
        <div
          className={`w-full md:h-[158%] h-[232%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
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
        <div className="w-[98%] h-[80%] grid lg:grid-cols-[100%] mx-auto bg-gray-300 rounded-lg shadow-md shadow-red-500 overflow-hidden">
          {/*==================👇 Goods Description list 👇===================*/}
          <div className="bg-[#a8ff3e] rounded-md shadow-md shadow-red-500 overflow-hidden">
            {/* Search and Name Section */}
            <div className="w-full bg-[#a8ff3e] pl-3 flex justify-between py-2 px-2">
              <div className="w-full flex justify-end gap-3 relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search your goods..."
                  title="This is a search button, You can search by goods name or Part No"
                  className=" py-1 px-2 rounded-md w-[40%]"
                />
                <IoIosSearch
                  className="text-2xl absolute right-24 top-1"
                  title="This is a search icon"
                />
                <span className="mr-12">
                  <Link to="/addgoodsitems">
                    <FaCirclePlus
                      className="text-3xl text-green-700 hover:text-green-900 duration-200 cursor-pointer"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                    {showTooltip && (
                      <div className="absolute right-0 top-6 px-2 py-1 bg-gray-200 text-sm text-gray-700 rounded-md shadow-lg z-10">
                        You can add goods items.
                      </div>
                    )}
                  </Link>
                </span>
              </div>
            </div>
            <hr className="border border-[#c0d69c]" />
            {/* Goods list or Goods table */}
            <div className="w-full max-h-[530px] bg-pink-200 overflow-x-auto overflow-y-auto no-scrollbar pb-12">
              <table className="w-full text-center">
                <thead className=" whitespace-nowrap text-[18px] sticky top-0 left-0 right-0 bg-[#82f5c7]">
                  <tr>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      SI No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black  border-r-2">
                      Goods Name
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Specifications
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Part No
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Rate
                    </th>
                    <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGoods?.map((items, index) => (
                    <tr key={index} className=" odd:bg-gray-200 text-[17px]">
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {index + 1}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.goods_name}
                      </td>
                      <td className="py-2 px-2 pl-10 border-b-2 border-r-2 border-black text-justify">
                        {items.specifications.map((items, index) => (
                          <div key={index}>
                            {"👉"} {items}
                          </div>
                        ))}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        {items.part_number}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        ₹ {items.rate}
                      </td>
                      <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                        <span
                          onClick={() => handleEdit(items.id)}
                          className="bg-green-500 hover:bg-green-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer mr-2"
                        >
                          Edit
                        </span>
                        <span
                          // onClick={() => handleDelete(items.id)}
                          className="bg-red-500 hover:bg-red-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span
                className={`ml-2 text-red-500 font-semibold ${
                  filteredGoods.length && "hidden"
                }`}
              >
                No record found..
              </span>
            </div>
          </div>
        </div>

        {/*=====================👇 Shopkeepers Form Details 👇=======================*/}
        {editGoodsId && (
          <div className="w-full h-screen absolute top-0 -mt-16 left-0 z-[999] bg-[rgba(0,0,0,0.5)]">
            <div className="w-[500px] mx-auto relative top-40 bg-gray-300 italic px-4 py-4 rounded-md shadow-md shadow-yellow-600 mt-10 tece">
              <span
                onClick={() => setEditGoodsId("")}
                className="w-[95%] flex justify-end items-center right-7"
              >
                <IoCloseSharp className="text-3xl text-red-500 cursor-pointer" />
              </span>
              <form onSubmit={handleEditSubmit}>
                <label htmlFor="goodsname" className="text-xl font-semibold">
                  Goods Name
                </label>
                <br />
                <input
                  type="text"
                  id="goodsname"
                  name="goods_name"
                  value={fileData.goods_name}
                  onChange={handleEditChange}
                  placeholder="Enter your goods name"
                  className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <label
                  htmlFor="specifications"
                  className="text-xl font-semibold"
                >
                  Specifications
                </label>
                <br />
                <textarea
                  id="specifications"
                  name="specifications"
                  value={fileData.specifications}
                  onChange={handleEditChange}
                  placeholder="Enter your goods specifications"
                  className="w-[90%] min-h-20 max-h-20 py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <label htmlFor="rate" className="text-xl font-semibold">
                  Rate
                </label>
                <br />
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  value={fileData.rate}
                  onChange={handleEditChange}
                  placeholder="Enter your goods rate"
                  className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <label htmlFor="partnumber" className="text-xl font-semibold">
                  Part No
                </label>
                <br />
                <input
                  type="text"
                  id="partnumber"
                  name="part_number"
                  value={fileData.part_number}
                  onChange={handleEditChange}
                  placeholder="Enter your goods part number"
                  className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
                <br />
                <span className="w-full mx-auto flex items-center justify-center">
                  <button className="text-xl italic uppercase font-semibold bg-blue-600 hover:bg-blue-700  hover:text-[#e2dcdc] duration-200 text-white px-2 py-1 rounded-lg shadow-md shadow-black mt-6">
                    Update
                  </button>
                </span>
              </form>
            </div>
          </div>
        )}
      </div>

      {/*======================👇 Confirmation Asking when delete 👇=====================*/}
      {/* {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3 z-50">
          <div className="sm:w-[430px] bg-white p-6 rounded shadow-lg">
            <h2 className="sm:text-xl mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end">
              <button
                // onClick={cancelDelete}
                className="bg-green-500 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                No
              </button>
              <button
                // onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )} */}

      <ToastContainer />
    </>
  );
}

export default Dashboard;
