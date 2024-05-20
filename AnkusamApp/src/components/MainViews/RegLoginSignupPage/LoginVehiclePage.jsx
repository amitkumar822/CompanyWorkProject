import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoCarSportSharp } from "react-icons/io5";
import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";

function LoginVehiclePage() {
  const navigate = useNavigate();

  // State variables for vehicle number and password
  const [vehicalNumber, setVehicleNumber] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload on form submit

    console.log("VehicalNumber:", vehicalNumber);
    console.log("Password:", password);

    // Create form data to match what the backend expects
    const formData = new FormData();
    formData.append("vehicalNumber", vehicalNumber);
    formData.append("password", password);

    try {
      // Send POST request to backend
      const response = await fetch("/api/driver/driverlogin.php", {
        method: "POST",
        body: formData, // Send form data
      });

      // Log the response status and headers
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse JSON response
      const data = await response.json();

      // Log the entire response for debugging
      console.log("Full Response:", data);
      console.log('====================================');
      console.log("Result:", data);
      console.log('====================================');
      
      // Handle the success or failure based on response
      if (data.status === true || data.status === 'true') {
        console.log("Login successful");
        // Redirect to a different page on successful login
        navigate("/contactus");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
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
                name="vehicalNumber"
                autoComplete="username" // Suggests autocomplete for vehicle number
                value={vehicalNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
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
                autoComplete="current-password" // Suggests autocomplete for password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="w-full mx-auto bg-gradient-to-r from-violet-500 md:to-fuchsia-500 hover:bg-gradient-to-l to-pink-800 py-2 rounded-lg font-bold text-lg text-white">
                Login Now
              </button>
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
