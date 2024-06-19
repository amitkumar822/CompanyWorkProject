import React, { useState } from "react"; // Import React and useState hook
import { Link, useNavigate } from "react-router-dom"; // Import Link component for navigation
import { RiLockPasswordFill } from "react-icons/ri"; // Import lock icon
import { MdContactPhone } from "react-icons/md"; // Import contact phone icon
import { IoCarSportSharp } from "react-icons/io5"; // Import car sport icon
import Banner from "../Banner/Banner"; // Import Banner component
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp"; // Import BannerButtomUp component
import TermsAndConditionsDialog from "./TermsAndConditionsDialog "; // Import Terms and Conditions dialog component

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React toastify component for notification showing
import loadingGfg from "../../../data/GfgLoding/loading.gif";

function SignupVehiclePage() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number input
  const [vehicalNumber, setVehicalNumber] = useState(""); // State for vehicle number input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input

  // State for terms and conditions dialog box visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true); // Function to open dialog
  const closeDialog = () => setIsDialogOpen(false); // Function to close dialog

  // State for terms and conditions checkbox
  const [isCheckedTermsConditions, setIsCheckedTermsConditions] =
    useState(false);
  const handleCheckboxChange = () =>
    setIsCheckedTermsConditions(!isCheckedTermsConditions); // Toggle checkbox state

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!isCheckedTermsConditions) {
      // Check if terms and conditions are agreed
      toast.info(
        "You must agree to the terms and conditions before signing up!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      // Check if passwords match
      toast.warn("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (isNaN(phoneNumber)) {
      toast.warn("Invalid Phone Number!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData(); // Create FormData object
    formData.append("phoneNumber", phoneNumber); // Append phone number to form data
    formData.append("vehicalNumber", vehicalNumber.toUpperCase()); // Append vehicle number to form data
    formData.append("password", password); // Append password to form data

    try {
      // Send POST request to backend
      const response = await fetch("/api/drivers/auth/signup.php", {
        method: "POST",
        body: formData, // Send form data
      });

      const data = await response.json();

      if (data.success) {
        setIsLoading(false);
        toast.success("Signup successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Redirect to a different page on successful login (uncomment below line when navigation is setup)
        setTimeout(() => {
          navigate("/vehiclelogin");
        }, 1300);
      } else {
        setIsLoading(false);
        toast.error("Vehicle number already exists!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      // Handle errors (currently empty, but can add error logging)
      console.error("Network or Server Error!", error);
      setIsLoading(false);
      toast.error("Internal Server or Network Error!", {
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
  };

  return (
    <div className="relative">
      {/* Loading image section */}
      <div
        className={`w-full h-full z-10 bg-[rgba(0,0,0,0.5)] absolute ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>
      <div>
        <Banner /> {/* Render Banner component */}
        <div className="w-full mx-auto m-10">
          <div className="w-[60%] mx-auto mt-5 mb-9">
            <h1 className=" text-2xl font-semibold text-[#ab2c89]">
              Driver / Owner Details
            </h1>
          </div>
          <div className="md:min-w-[400px] lg:w-[40%] sm:w-[350px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
            <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
            <form
              onSubmit={handleSubmit} // Form submit handler
              className="w-full mx-auto"
            >
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="mobile number"
                  required
                  minLength={10}
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)} // Update phone number state on change
                />
                <MdContactPhone className=" relative top-3 left-2 text-2xl" />{" "}
                {/* Phone icon */}
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="vehicle number"
                  required
                  value={vehicalNumber}
                  onChange={(event) => setVehicalNumber(event.target.value)} // Update vehicle number state on change
                />
                <IoCarSportSharp className=" relative top-3 left-2 text-2xl" />{" "}
                {/* Car icon */}
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="password.."
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} // Update password state on change
                />
                <RiLockPasswordFill className=" relative top-3 left-2 text-2xl" />{" "}
                {/* Password icon */}
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="confirm password.."
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)} // Update confirm password state on change
                />
                <RiLockPasswordFill className=" relative top-3 left-2 text-2xl" />{" "}
                {/* Confirm password icon */}
              </div>
              <br />

              <div className="w-[90%] mx-auto">
                <div className="flex gap-2 items-center my-2">
                  <input
                    checked={isCheckedTermsConditions}
                    onChange={handleCheckboxChange} // Toggle terms and conditions checkbox state
                    type="checkbox"
                    className="cursor-pointer"
                  />
                  <h1>
                    {" "}
                    I agree to the{" "}
                    <span className="text-[red] cursor-pointer">
                      <button type="button" onClick={openDialog}>
                        {" "}
                        {/* Open terms and conditions dialog */}
                        Terms and Conditions
                      </button>
                      <TermsAndConditionsDialog
                        isOpen={isDialogOpen} // Pass dialog open state
                        onClose={closeDialog} // Pass close dialog handler
                      />
                    </span>
                  </h1>
                </div>
                <button
                  type="submit" // Submit button
                  className="w-full mx-auto uppercase bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l to-pink-8  00 py-2 rounded-lg font-bold text-lg text-white"
                >
                  Sign Up
                </button>
                <div className="flex mt-2 gap-2 justify-center items-center">
                  <h1 className="md:text-[16px] text-[14px]">
                    You already have an account?
                  </h1>{" "}
                  <Link to="/vehiclelogin">
                    {" "}
                    {/* Link to login page */}
                    <h1 className="rounded-lg px-2 uppercase py-1 font-bold md:text-[#f44646] md:text-[16px] text-[14px]">
                      Login Now
                    </h1>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <BannerButtomUp /> {/* Render BannerButtomUp component */}
        <ToastContainer />
        {/* React toastify component for notification showing */}
      </div>
    </div>
  );
}

export default SignupVehiclePage; // Export SignupVehiclePage component
