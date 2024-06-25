import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgImage from "../../data/Photos/Login/halftone-background-with-circles/5172658.jpg";

function AddGoodsLiist() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  const [goodsName, setGoodsName] = useState("");
  const [goodsRate, setGoodsRate] = useState(0);
  
  return (
    <>
      <div
        className="w-full h-screen mx-auto pt-16"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl italic font-semibold text-white text-center pt-16 underline">
          Welcome to goods page
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[500px] mx-auto bg-gray-300 italic px-4 py-4 rounded-md shadow-md shadow-yellow-600 mt-10 tece">
          <form action="">
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
    </>
  );
}

export default AddGoodsLiist;
