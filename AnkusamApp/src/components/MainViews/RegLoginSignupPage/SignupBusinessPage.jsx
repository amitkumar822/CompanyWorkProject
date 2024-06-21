import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import Banner from "../Banner/Banner";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog ";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React toastify component for notification showing
import loadingGfg from "../../../data/GfgLoding/loading.gif";

function SignupBusinessPage() {
  const navigate = useNavigate();
  // Terms and Conditions dialog box
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // check term and conditions is checked?
  const [isCheckedTermsConditions, setIsCheckedTermsConditions] =
    useState(false);

  const handleCheckboxChange = () =>
    setIsCheckedTermsConditions(!isCheckedTermsConditions);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if terms and conditions are agreed
    if (!isCheckedTermsConditions) {
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

    // Check if passwords match
    if (password !== confirmPassword) {
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

    if (isNaN(phone)) {
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

    const formData = new FormData();
    formData.append("clientsName", username);
    formData.append("clientsPhone", phone);
    formData.append("clientsPassword", password.toString().trim());

    try {
      // Send POST request to backend
      const response = await fetch("/api/clients/auth/signup.php", {
        method: "POST",
        body: formData, // Send form data
      });

      // Log the response status and headers
      // console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText); // Throw error if response is not ok
      }

      //Parse JSON response
      const data = await response.json();

      // Handle the success or failure based on response
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
        setTimeout(() => {
          navigate("/businesslogin");
        }, 1300);
      } else {
        setIsLoading(false);
        toast.error("Number already exists!", {
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
      // Handle errors (currently empty, but can add error logging)
      console.error("There was an error!", error);
      setIsLoading(false);
      toast.error("Network or Server Error!", {
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
        className={`w-full md:h-[151%] h-[213%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>
      <div>
        <Banner />
        <div className="w-full mx-auto m-10">
          <div className="w-[60%] mx-auto mt-5 mb-9">
            <h1 className=" text-2xl font-semibold text-[#ab2c89]">
              Business Registration
            </h1>
          </div>
          <div className="md:min-w-[400px] lg:w-[40%] sm:w-[350px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
            <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="Enter your name"
                  required
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaUser className="relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="tel" // Change type to "tel" for phone number
                  placeholder="mobile number"
                  required
                  minLength={10}
                  maxLength={10}
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MdContactPhone className="relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="password.."
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLockPasswordFill className="relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="confirm password.."
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <RiLockPasswordFill className="relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto">
                <div className="flex gap-2 items-center my-2">
                  <input
                    type="checkbox"
                    checked={isCheckedTermsConditions}
                    onChange={handleCheckboxChange}
                    className="cursor-pointer"
                  />
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

                <button className="w-full mx-auto uppercase bg-gradient-to-r from-violet-500 md:to-fuchsia-500 hover:bg-gradient-to-l to-pink-800 py-2 rounded-lg font-bold text-lg text-white">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex mt-2 gap-2 justify-center items-center">
              <h1 className="md:text-[16px] text-[14px]">
                You already have an account?
              </h1>{" "}
              <Link to="/businesslogin">
                <h2 className="rounded-lg uppercase px-2 py-1 font-bold md:text-[#f44646] md:text-[16px] text-[14px]">
                  Login Now
                </h2>
              </Link>
            </div>
          </div>
        </div>
        <BannerButtomUp />
        <ToastContainer />
        {/* React toastify component for notification showing */}
      </div>
    </div>
  );
}

export default SignupBusinessPage;
