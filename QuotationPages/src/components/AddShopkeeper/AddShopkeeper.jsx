import React, { useState } from "react";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddShopkeeper() {
  // loading animation when form is submitted
  const [isLoading, setIsLoading] = useState(false);

  // ==============👇 Form submission section 👇=================

  const [formField, setFormField] = useState({
    name: "",
    phone: "",
    state: "",
    address: "",
    gstno: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-full h-screen mx-auto fixed bg-gradient-to-r from-pink-500 to-violet-600">
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
        <h1 className="text-2xl italic font-semibold text-white text-center pt-12 underline">
          Welcome to Our Services
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[90%] mx-auto mt-10">
          <form
            // onSubmit={handleSubmit}
            className="w-[500px] mx-auto bg-gray-300 italic px-4 py-4 rounded-md shadow-md shadow-yellow-600"
          >
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formField.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="phone" className="text-xl font-semibold">
              Phone
            </label>
            <br />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formField.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="state" className="text-xl font-semibold">
              State
            </label>
            <br />
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formField.state}
              onChange={handleChange}
              placeholder="Enter your State"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <label htmlFor="address" className="text-xl font-semibold">
              Address
            </label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formField.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />

            <br />
            <label htmlFor="gstno" className="text-xl font-semibold">
              GST No
            </label>
            <br />
            <input
              type="text"
              id="gstno"
              name="gstno"
              required
              value={formField.gstno}
              onChange={handleChange}
              placeholder="Enter your GST number"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formField.email}
              onChange={handleChange}
              placeholder="Enter your GST number"
              className="w-[90%] py-1 px-2 rounded-md shadow-md shadow-stone-500"
            />
            <br />
            <span className="w-full mx-auto flex items-center justify-center">
              <button className="text-xl italic uppercase font-semibold bg-blue-600 hover:bg-blue-700  hover:text-[#e2dcdc] duration-200 text-white px-2 py-1 rounded-lg shadow-md shadow-black mt-6">
                Registration
              </button>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddShopkeeper;
