import React, { useContext, useEffect, useState } from "react";
// Importing the React library and useState hook for managing state in the component.

import { Link, useNavigate } from "react-router-dom";
// Importing Link for navigation and useNavigate for programmatic navigation within the React Router.

import { RiLockPasswordFill } from "react-icons/ri";
import { IoCarSportSharp } from "react-icons/io5";
// Importing icons from the react-icons library to use in the input fields.

import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
// Importing custom components, Banner and BannerButtomUp, presumably for consistent layout or additional information.

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React toastify component for notification showing

import VehiLogUserContext from "../../../context/vehicleLoginUser/VehiLogUserContext";
// use context for global access file or data

function LoginVehiclePage() {
  const { setVehiLogUser } = useContext(VehiLogUserContext)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/loaddatalist");
    }
  }, []);

  const navigate = useNavigate();
  // useNavigate hook provides a function to navigate programmatically.

  // State variables for vehicle number and password
  const [vehical_number, setVehicleNumber] = useState("");
  // Initializing vehicalNumber state to an empty string.
  const [driver_password, setPassword] = useState("");
  // Initializing password state to an empty string.

  // Function to generate a token
  const generateToken = (vehical_number, driver_password) => {
    const token = btoa(`${vehical_number}:${driver_password}`); // Base64 encode the credentials
    return token;
  };

  // Handle form submission functions
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload on form submit

    // Generate the token
    const TokeLoginVehiPage = generateToken(vehical_number, driver_password);

    // console.log("vehical_number:", vehical_number);
    // console.log("driver_password:", driver_password);
    // Logging the input values for debugging.

    // Create form data to match what the backend expects
    const formData = new FormData();
    formData.append("vehical_number", vehical_number);
    formData.append("driver_password", driver_password);
    // Constructing a FormData object to send in the POST request.

    try {
      // Send POST request to backend
      const response = await fetch("/api/driver/driverlogin.php", {
        method: "POST",
        body: formData, // Send form data
      });

      // Log the response status and headers
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      // Logging the response status and headers for debugging.

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      // Handling errors if the response is not ok (status code not in 200-299).

      // Parse JSON response
      const data = await response.json();
      // Parsing the JSON response body.

      // Log the entire response for debugging
      
      console.log("====================================");
      console.log("Full Response:", data.userData);
      console.log("====================================");

      // Handle the success or failure based on response
      if (data.status === true || data.status === "true") {
        setVehiLogUser(data.userData)
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem('TokeLoginVehiPage', TokeLoginVehiPage);
        // If login is successful, log the success and navigate to the contact us page.
        setTimeout(() =>{
          // window.location.reload();
          navigate('/dashboard')  
        }, 1500);
        // window.location.reload();
      } else {
        // console.log("Login failed");
        toast.error("Vehicle number or Password is wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      // Catching and logging any errors that occur during the fetch request.
    }
  };

  

  return (
    <div>
      <Banner />
      {/* Rendering the Banner component at the top of the page. */}
      <div className="w-full mx-auto m-10">
        <div className="w-[60%] mx-auto mt-5 mb-9">
          <h1 className="text-2xl font-semibold text-[#ab2c89]">
            Vehicle / Driver Login
          </h1>
          {/* Heading for the login page. */}
        </div>
        <div className="md:min-w-[400px] lg:w-[40%] sm:w-[320px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
          <h1 className="text-3xl text-center font-semibold">Login complete</h1>
          {/* Heading inside the form container. */}
          <form onSubmit={handleSubmit} className="w-full mx-auto">
            <div className="w-[90%] mx-auto mt-4 relative">
              <input
                className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                type="text"
                placeholder="Vehicle number"
                required
                name="vehical_number"
                autoComplete="username" // Suggests autocomplete for vehicle number
                value={vehical_number}
                onChange={(e) => setVehicleNumber(e.target.value)}
                // Handling input change to update vehicalNumber state.
              />
              <IoCarSportSharp className="relative top-3 left-2 text-2xl" />
              {/* Icon for vehicle number input. */}
            </div>
            <br />

            <div className="w-[90%] mx-auto mt-4 relative">
              <input
                className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                type="password"
                placeholder="password.."
                required
                name="driver_password"
                autoComplete="current-password" // Suggests autocomplete for password
                value={driver_password}
                onChange={(e) => setPassword(e.target.value)}
                // Handling input change to update password state.
              />
              <RiLockPasswordFill className="relative top-3 left-2 text-2xl" />
              {/* Icon for password input. */}
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
              {/* Message for forgotten password with a click handler to show an alert. */}
              <button
                type="submit"
                className="w-full mx-auto uppercase bg-gradient-to-r from-violet-500 md:to-fuchsia-500 hover:bg-gradient-to-l to-pink-800 py-2 rounded-lg font-bold text-lg text-white"
              >
                Login Now
              </button>
              {/* Submit button for the login form. */}
            </div>
          </form>

          <div className="flex mt-2 gap-2 justify-center items-center">
            <h1>Don't have an account?</h1>{" "}
            <Link to="/businesssignup">
              <h2 className="rounded-lg px-2 py-1 font-bold text-[#f44646] uppercase">
                Sign Up
              </h2>
            </Link>
            {/* Link to the signup page for new users. */}
          </div>
        </div>
      </div>
      <BannerButtomUp />
      {/* Rendering the BannerButtomUp component at the bottom of the page. */}
      <ToastContainer />
      {/* React toastify component for notification showing */}
    </div>
  );
}

export default LoginVehiclePage;
// Exporting the component as the default export.
