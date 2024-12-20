import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BgImage from "../../data/Photos/Login/halftone-background-with-circles/5172658.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { weightData } from "../../data/weight/weight";

function AddGoodsLiist() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [goodsName, setGoodsName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [goodsRate, setGoodsRate] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [igst, setIGst] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");

  const [shopkeeperId, setShopkeeperIt] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("ShopkeeperNameAndIdDetails");
    if (savedData) {
      setShopkeeperIt(JSON.parse(savedData));
    }
  }, [setShopkeeperIt]);

  // console.log("ID: " + shopkeeperId.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!weight) {
      toast.warn("Weight is required");
      return;
    }

    if (!weightUnit) {
      toast.warn("Weight Unit is required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("shopkeeper_id", shopkeeperId.id);
    formData.append("descriptions", goodsName);
    formData.append("goods_measure_units", weight + " " + weightUnit);
    formData.append("part_no", partNumber);
    formData.append("rate", goodsRate);
    formData.append("isgst", igst);
    formData.append("cgst", cgst);
    formData.append("sgst", sgst);

    try {
      const response = await axios.post(
        "/api/insert_new_goods_th_shopker_id.php",
        formData
      );

      if (response.data.success) {
        toast.success("Successful add your items!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
        setGoodsName("");
        setGoodsRate("");
        setPartNumber("");
        setWeight("");
        setWeightUnit("");
        setIGst("");
        setCgst("");
        setSgst("");

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        setIsLoading(false);
        toast.error("Part number already exist!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      setIsLoading(false);
      toast.error("Network or Server error!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div
        className="w-full h-screen mx-auto pt-16 fixed"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Loading image section */}
        <div
          className={`w-full md:h-screen -mt-16 z-50 bg-[rgba(0,0,0,0.5)] absolute ${
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
        <h1 className="text-2xl italic font-semibold text-white text-center pt-16 underline">
          Welcome to goods page
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[500px] mx-auto bg-gray-300 italic px-4 py-4 rounded-md shadow-md shadow-yellow-600 mt-10 tece">
          <form onSubmit={handleSubmit}>
            <label htmlFor="goodsname" className="text-xl font-semibold">
              Goods Name
            </label>
            <br />
            <input
              type="text"
              id="goodsname"
              value={goodsName}
              onChange={(e) => setGoodsName(e.target.value)}
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
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
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
                onChange={(e) => setWeight(e.target.value)}
                required
              >
                <option value="">Select Measurement</option>
                <option value="KG">KG</option>
                <option value="NOS">NOS</option>
                <option value="ITEMS">ITEMS</option>
              </select>

              <input
                disabled={!weight}
                onChange={(e) => setWeightUnit(e.target.value)}
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
              value={goodsRate}
              onChange={(e) => setGoodsRate(e.target.value)}
              placeholder="Enter your goods rate"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />

            <div className="pt-1 flex  gap-1">
              <span className="flex gap-1">
                <span>
                  <label htmlFor="cgst" className="text-xl font-semibold">
                    CGST
                  </label>
                  <br />
                  <input
                    type="text"
                    id="cgst"
                    value={cgst}
                    onChange={(e) => setCgst(e.target.value)}
                    placeholder="Enter your CGST"
                    className="w-[140px] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                  />
                </span>
                <span>
                  <label htmlFor="sgst" className="text-xl font-semibold">
                    SGST
                  </label>
                  <br />
                  <input
                    type="text"
                    id="sgst"
                    value={sgst}
                    onChange={(e) => setSgst(e.target.value)}
                    placeholder="Enter your SGST"
                    className="w-[140px] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                  />
                </span>
              </span>
              <span>
                <label htmlFor="igst" className="text-xl font-semibold">
                  IGST
                </label>
                <br />
                <input
                  type="text"
                  id="igst"
                  value={igst}
                  onChange={(e) => setIGst(e.target.value)}
                  placeholder="Enter your IGST"
                  className="w-[140px] py-1 px-2 rounded-md shadow-md shadow-stone-500"
                />
              </span>
            </div>
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

export default AddGoodsLiist;
