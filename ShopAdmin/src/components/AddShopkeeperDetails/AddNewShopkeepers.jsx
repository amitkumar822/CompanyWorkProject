import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopkeeperBgPhoto from "../../data/Photos/AddShopkeeperBgPhoto/halftone-background-with-lines/5172661.jpg";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { useNavigate } from "react-router";

function AddNewShopkeepers() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  // loading animation when form is submitted
  const [isLoading, setIsLoading] = useState(false);

  // ==============👇 Form submission section 👇=================

  // form input fields(data) store in useState()
  const [formField, setFormField] = useState({
    name: "",
    state: "",
    address: "",
    phone: "",
    gstno: "",
    // email: "",
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

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", formField.name);
    formData.append("phone", formField.phone);
    formData.append("state", formField.state);
    formData.append("address", formField.address);
    formData.append("gst", formField.gstno);

    try {
      const response = await axios.post(
        // "/api/insert_new_shopkeeper.php",
        formData
      );

      console.log("Response: " + JSON.stringify(response, null, 2));

      if (response.data.success) {
        setIsLoading(false);

        toast.success("Successful Registration Completed!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setFormField({
          name: "",
          state: "",
          address: "",
          phone: "",
          gstno: "",
        });
      } else {
        setIsLoading(false);
        toast.error("Registration Failed!", {
          position: "top-center",
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
      setIsLoading(false);
      console.error("Error: " + error);
      toast.error("Network or Server error!", {
        position: "top-center",
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

  // ==============👆 End Form submission section 👆=================

  return (
    <>
      <div
        className="w-full h-screen mx-auto pt-16 fixed"
        style={{
          backgroundImage: `url(${ShopkeeperBgPhoto})`,
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
        <h1 className="text-2xl italic font-semibold text-white text-center pt-12 underline">
          Welcome to Our Services
        </h1>
        {/* Shopkeepers Form Details */}
        <div className="w-[90%] mx-auto mt-10">
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
            {/* <label htmlFor="email" className="text-xl font-semibold">
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
            /> */}
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

export default AddNewShopkeepers;
