import React, { useState } from "react";
import axios from "axios";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { States } from "../../data/State/State";

function AddShopkeeper() {
  // loading animation when form is submitted
  const [isLoading, setIsLoading] = useState(false);

  // ==============👇 State Filter 👇=================

  const [state, setState] = useState("");
  const [stateName, setStateName] = useState("");

  const handleStateChange = (state) => {
    setState(state);
    setStateName(state.label);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("state", stateName);
    formData.append("username", formField.name);
    formData.append("phone", formField.phone);
    formData.append("address", formField.address);
    formData.append("gst", formField.gstno);
    formData.append("email", formField.email);

    try {
      const response = await axios.post(
        "/api/insert_customer_name.php",
        formData
      );

      // console.log("Response: " + JSON.stringify(response, null, 2));

      if (response.data.success) {
        toast.success("Shopkeeper added successfully", {
          position: "top-center",
          autoClose: 1700,
        });
      } else {
        toast.error("Failed to add shopkeeper", {
          position: "top-center",
          autoClose: 1700,
        });
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error("Network or Server Error", {
        position: "top-center",
        autoClose: 1700,
      });
    }

    setState("");
    setStateName("");
    setFormField({
      name: "",
      phone: "",
      state: "",
      address: "",
      gstno: "",
      email: "",
    });
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
            <img className="w-[100px] h-[100px] fixed" src={loadingGfg} />
          </div>
        </div>
        <h1 className="text-2xl italic font-semibold text-white text-center mt-4 underline">
          Welcome to Our Services
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[90%] mx-auto mt-5">
          <form
            onSubmit={handleSubmit}
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
            <label htmlFor="state" className="text-xl font-semibold">
              State
            </label>
            <Select
              value={state}
              options={States.map((state) => ({
                label: state,
                value: state,
              }))}
              placeholder="Select State"
              onChange={handleStateChange}
              required
              className="w-[90%] rounded-md shadow-md shadow-stone-500"
            />

            <label htmlFor="address" className="text-xl font-semibold">
              Address
            </label>
            <br />
            <textarea
              type="text"
              id="address"
              name="address"
              required
              value={formField.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-[90%] min-h-8 max-h-28 py-1 px-2 rounded-md shadow-md shadow-stone-500"
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
