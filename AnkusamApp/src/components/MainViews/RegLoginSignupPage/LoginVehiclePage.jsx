import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoCarSportSharp } from "react-icons/io5";
import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import axios from 'axios'

function LoginVehiclePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicalNumber: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error message

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.vehicalNumber === "" || formData.password === "") {
      alert("Please fill all the fields");
      return;
    }

    const newData = {
      vehicalNumber: formData.vehicalNumber,
      password: formData.password,
    };

    try {
      const response = await axios.post('/api/driver/driverlogin.php', newData);
      if (response.data.status) {
        alert("Login Successful");
        console.log('====================================');
        console.log("Login Successful",response);
        console.log('====================================');
        // navigate("/contactus");
      } else if (response.data.validationFailed) {
        setError("Validation Failed. Please check your credentials.");
      } else {
        alert("Login Failed");
        console.log('====================================');
        console.log("Login Failed", response);
        console.log('====================================');
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <Banner />
      <div className="w-full mx-auto m-10">
        <div className="w-[60%] mx-auto mt-5 mb-9">
          <h1 className="text-2xl font-semibold text-[#ab2c89]">
            Vehicle / Driver Login
          </h1>
        </div>
        <div className="md:min-w-[400px] lg:w-[40%] sm:w-[320px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
          <h1 className="text-3xl text-center font-semibold">Login</h1>
          <form onSubmit={handleSubmit} className="w-full mx-auto">
            <div className="w-[90%] mx-auto mt-4 relative">
              <input
                className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                type="text"
                placeholder="Vehicle number"
                required
                maxLength={10}
                name="vehicalNumber"
                onChange={handleChange}
                value={formData.vehicalNumber}
              />
              <IoCarSportSharp className="relative top-3 left-2 text-2xl" />
            </div>
            <br />

            <div className="w-[90%] mx-auto mt-4 relative">
              <input
                className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                type="password"
                placeholder="password.."
                required
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <RiLockPasswordFill className="relative top-3 left-2 text-2xl" />
            </div>
            <br />
            <div className="w-[90%] mx-auto">
              <h1
                onClick={() =>
                  alert("Please contact the admin for password assistance.")
                }
                className="font-semibold py-2 cursor-pointer"
              >
                Forgot Password?
              </h1>
              <button className="w-full mx-auto bg-gradient-to-r from-violet-500 md:to-fuchsia-500 hover:bg-gradient-to-l to-pink-800 py-2 rounded-lg font-bold text-lg text-white">
                Login Now
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if present */}
            </div>
          </form>

          <div className="flex mt-2 gap-2 justify-center items-center">
            <h1>Don't have an account?</h1>{" "}
            <Link to="/businesssignup">
              <h2 className="rounded-lg px-2 py-1 font-bold text-[#f44646]">
                Sign Up
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <BannerButtomUp />
    </div>
  );
}

export default LoginVehiclePage;
