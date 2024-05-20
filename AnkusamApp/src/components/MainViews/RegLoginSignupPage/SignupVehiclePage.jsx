import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog ";

function SignupVehiclePage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [vehicalNumber, setVehicalNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // Terms and Conditions dialog box
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // check term and conditions is checked?
  const [isCheckedTermsConditions, setIsCheckedTermsConditions] = useState(false);
  const handleCheckboxChange = () => setIsCheckedTermsConditions(!isCheckedTermsConditions)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCheckedTermsConditions) {
      alert('You must agree to the terms and conditions before signing up.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append("phoneNumber", phoneNumber);
    formData.append("vehicalNumber", vehicalNumber);
    formData.append("password", password);

    try {
      // Send POST request to backend
      const response = await fetch("/api/driver/signup.php", {
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
      console.log("====================================");
      console.log("Result:", data);
      console.log("====================================");

      
      // Handle the success or failure based on response
      if (data.status === true || data.status === "true") {
        console.log("Signup successful");
        // Redirect to a different page on successful login
        // navigate('/dashboard')
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      
    }
  };


  return (
    <div>
      <div>
        <Banner />
        <div className="w-full mx-auto m-10">
          <div className="w-[60%] mx-auto mt-5 mb-9">
            <h1 className=" text-2xl font-semibold text-[#ab2c89]">
              Driver / Owner Details
            </h1>
          </div>
          <div className="md:min-w-[400px] lg:w-[40%] sm:w-[350px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
            <h1 className="text-3xl text-center font-semibold">Sign Up Don this page</h1>
            <form 
            onSubmit={handleSubmit}
            className="w-full mx-auto">
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="mobile number"
                  required
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <MdContactPhone className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="vehicle number"
                  required
                  value={vehicalNumber}
                  onChange={(event) => setVehicalNumber(event.target.value)}
                />
                <IoCarSportSharp className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="password.."
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <RiLockPasswordFill className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="confirm password.."
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <RiLockPasswordFill className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto">
                <div className="flex gap-2 items-center my-2">
                  <input 
                  checked={isCheckedTermsConditions} 
                  onChange={handleCheckboxChange}
                  type="checkbox" className="cursor-pointer" />
                 <h1>
                    {" "}
                    I agree to the{" "}
                    <span className="text-[red] cursor-pointer">
                      <button type="button" onClick={openDialog}>
                        Terms and Conditions
                      </button>
                      <TermsAndConditionsDialog
                        isOpen={isDialogOpen}
                        onClose={closeDialog}
                      />
                    </span>
                  </h1>
                </div>
                <button
                type="submit"
                className="w-full mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l to-pink-8  00 py-2 rounded-lg font-bold text-lg text-white">
                  Sign Up
                </button>
                <div className="flex mt-2 gap-2 justify-center items-center">
                  <h1 className="md:text-[16px] text-[14px]">
                    You already have an account?
                  </h1>{" "}
                  <Link to="/vehiclelogin">
                    <h1 className="rounded-lg px-2 py-1 font-bold md:text-[#f44646] md:text-[16px] text-[14px]">
                      Login Now
                    </h1>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <BannerButtomUp />
      </div>
    </div>
  );
}

export default SignupVehiclePage;
