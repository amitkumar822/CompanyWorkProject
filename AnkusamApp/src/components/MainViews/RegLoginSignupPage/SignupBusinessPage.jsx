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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCheckedTermsConditions) {
      // Check if terms and conditions are agreed
      // alert("You must agree to the terms and conditions before signing up.");
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

    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone)
    formData.append("password", password)

    console.log('====================================');
    console.log("username: ", username);
    console.log("phone: ", phone);
    console.log("password: ", password);
    console.log("confirmPassword: ", confirmPassword);
    console.log('====================================');

    try {
      // Send POST request to backend
      const response = await fetch('url', {
        method: "POST",
        body: formData, // Send form data
      });

      // Log the response status and headers
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if(!response.ok) {
        throw new Error("Network response was not ok " + response.statusText); // Throw error if response is not ok
      }

      //Parse JSON response
      const data = await response.json();

      // Log the entire response for debugging
      console.log("Full Response:", data);
      console.log("====================================");
      console.log("Result:", data);
      console.log("====================================");

      // Handle the success or failure based on response
      if(data.status === true || data.status === "true"){
        toast.success('Signup successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        // Redirect to a different page on successful login (uncomment below line when navigation is setup)
        // navigate('/dashboard')
      }else{
        toast.error('Signup failed!', {
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
    }
  };

  return (
    <div>
      <div>
        <Banner />
        <div className="w-full mx-auto m-10">
          <div className="w-[60%] mx-auto mt-5 mb-9">
            <h1 className=" text-2xl font-semibold text-[#ab2c89]">
              Business Registration
            </h1>
          </div>
          <div className="md:min-w-[400px] lg:w-[40%] sm:w-[350px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
            <h1 className="text-3xl text-center font-semibold">
              Sign Up working right know
            </h1>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="username"
                  required
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // Add autocomplete attribute with value "username"
                  // autoComplete="username"
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
                  maxLength={10}
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  // Add autocomplete attribute with value "tel"
                  // autoComplete="tel"
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
                  // Add autocomplete attribute with value "new-password"
                  // autoComplete="new-password"
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
                  // Add autocomplete attribute with value "new-password"
                  // autoComplete="new-password"
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

                <button className="w-full mx-auto bg-gradient-to-r from-violet-500 md:to-fuchsia-500 hover:bg-gradient-to-l to-pink-800 py-2 rounded-lg font-bold text-lg text-white">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex mt-2 gap-2 justify-center items-center">
              <h1 className="md:text-[16px] text-[14px]">
                You already have an account?
              </h1>{" "}
              <Link to="/businesslogin">
                <h2 className="rounded-lg px-2 py-1 font-bold md:text-[#f44646] md:text-[16px] text-[14px]">
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
