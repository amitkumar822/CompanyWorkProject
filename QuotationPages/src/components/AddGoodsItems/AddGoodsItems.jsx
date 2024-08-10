import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { Link } from "react-router-dom";
import axios from "axios";

function AddGoodsItems() {
  const [isLoading, setIsLoading] = useState(false);

  //   ===========👇 Form Data Collection 👇=================
  const [fileData, setFileData] = useState({
    goodsname: "",
    partnumber: "",
    measurement: "",
    measurementNumber: "",
    rate: "",
    specifications: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("specifications", fileData.specifications);
    formData.append("goods_name", fileData.goodsname);
    formData.append("parts_number", fileData.partnumber);
    formData.append("measurement", fileData.measurement);
    formData.append("measurement_number", fileData.measurementNumber);
    formData.append("rate", fileData.rate);

    try {
      const response = await axios.post(
        "/api/insert_items_descriptions.php",
        formData
      );

      if (response.data.inserted) {
        toast.success("Item added successfully", {
          position: "top-center",
          autoClose: 1700,
        });
        setFileData({
          goodsname: "",
          partnumber: "",
          measurement: "",
          measurementNumber: "",
          rate: "",
          specifications: "",
        });
        setIsLoading(false);
      } else {
        toast.error("Failed to add item", {
          position: "top-center",
          autoClose: 1700,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error("Network or Server Error", {
        position: "top-center",
        autoClose: 1700,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-[91.4vh] fixed mx-auto bg-gradient-to-r from-fuchsia-500 to-cyan-500 md:relative">
        {/* Loading image section */}
        <div
          className={`w-full md:h-screen -mt-16 z-[99999999] bg-[rgba(0,0,0,0.5)] absolute ${
            isLoading ? "" : "hidden"
          }`}
        >
          <div className=" absolute w-full h-screen flex justify-center items-center">
            <img className="w-[100px] h-[100px] fixed" src={loadingGfg} />
          </div>
        </div>
        <h1 className="text-2xl italic font-semibold text-white text-center pt-4 underline">
          Welcome to goods page
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[500px] mx-auto italic px-4 py-4 rounded-md shadow-md shadow-yellow-600 mt-4 tece bg-gradient-to-r from-teal-200 to-lime-200">
          <form onSubmit={handleSubmit}>
            <label htmlFor="goodsname" className="text-xl font-semibold">
              Goods Name
            </label>
            <br />
            <input
              type="text"
              id="goodsname"
              name="goodsname"
              value={fileData.goodsname}
              onChange={handleChange}
              required
              placeholder="Enter your goods name"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="partnumber" className="text-xl font-semibold">
              Part Number
            </label>
            <br />
            <input
              type="text"
              id="partnumber"
              name="partnumber"
              value={fileData.partnumber}
              onChange={handleChange}
              required
              placeholder="Enter your unique part number"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="" className="text-xl font-semibold">
              Measurement
            </label>
            <br />
            <div className="max-w-[90%]">
              <select
                className="w-[48%] mr-3 py-1 px-2 rounded-md shadow-md shadow-stone-500 cursor-pointer"
                name="measurement"
                value={fileData.measurement}
                onChange={handleChange}
                required
              >
                <option value="">Select Measurement</option>
                <option value="KG">KG</option>
                <option value="NOS">NOS</option>
                <option value="ITEMS">ITEMS</option>
              </select>

              <input
                disabled={!fileData.measurement}
                name="measurementNumber"
                value={fileData.measurementNumber}
                onChange={handleChange}
                placeholder="Enter your measurement details"
                required
                className="w-[48%] py-1 px-2 rounded-md shadow-md shadow-stone-500 cursor-pointer"
              ></input>
            </div>
            <label htmlFor="rate" className="text-xl font-semibold">
              Rate
            </label>
            <br />
            <input
              type="text"
              id="rate"
              name="rate"
              value={fileData.rate}
              onChange={handleChange}
              placeholder="Enter your goods rate"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="specifications" className="text-xl font-semibold">
              Specifications
            </label>
            <br />
            <textarea
              id="specifications"
              name="specifications"
              value={fileData.specifications}
              onChange={handleChange}
              placeholder="Please Enter Goods Specifications..."
              className="w-[90%] min-h-32 max-h-40 py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <span className="w-full mx-auto flex items-center justify-center">
              <button className="text-xl italic uppercase font-semibold bg-blue-600 hover:bg-blue-700  hover:text-[#e2dcdc] duration-200 text-white px-2 py-1 rounded-lg shadow-md shadow-black mt-6">
                Add
              </button>
            </span>
          </form>
          <div className="w-full flex justify-center mt-2 pt-2 border-t-[1.6px] border-dashed ">
            <span className="text-xl italic font-semibold bg-green-600 hover:bg-green-700 duration-200 cursor-pointer px-2 py-1 rounded-md text-white shadow-md shadow-yellow-400">
              <Link to="/dashboard">Check Items</Link>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddGoodsItems;
