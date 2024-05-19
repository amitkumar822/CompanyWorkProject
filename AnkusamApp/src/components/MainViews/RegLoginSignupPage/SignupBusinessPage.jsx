import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import Banner from "../Banner/Banner";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog ";
import axios from "axios";

function SignupBusinessPage() {
  const navigate = useNavigate();
  // Terms and Conditions dialog box
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // check term and conditions is checked?
  const [isCheckedTermsConditions, setIsCheckedTermsConditions] = useState(false);

  const handleCheckboxChange = () => setIsCheckedTermsConditions(!isCheckedTermsConditions)

  // Form data
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isCheckedTermsConditions) {
      alert('You must agree to the terms and conditions before signing up.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password is not match");
      return;
    }

    const newFormData = {
      username: formData.username,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    console.log("====================================");
    console.log("FormData: ", newFormData);
    console.log("====================================");

    // axios.post("url", newFormData).then((result) => {
    //   if (result.formData.Status === "Invalid") {
    //     alert("Invalid User");
    //   } else {
    //     alert("User Created Successfully");
    //     navigate("");
    //   }
    // });
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
            <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className="w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="username"
                  required
                  maxLength={10}
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
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
                  onChange={handleChange}
                  value={formData.phone}
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
                  onChange={handleChange}
                  value={formData.password}
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
                  onChange={handleChange}
                  value={formData.confirmPassword}
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
      </div>
    </div>
  );
}

export default SignupBusinessPage;
