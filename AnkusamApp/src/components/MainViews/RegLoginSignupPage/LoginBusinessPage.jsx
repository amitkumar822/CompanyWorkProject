import React, { useContext, useEffect, useState } from "react";
import { MdContactPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../Banner/Banner";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React toastify component for notification showing

import BusiLoginContext from "../../../context/BusinessLoginUser/BusiLoginContext";
// use context for global access file or data
import loadingGfg from "../../../data/GfgLoding/loading.gif";

function LoginBusinessPage() {
  const { setBusiLogUser } = useContext(BusiLoginContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  //after login page redirect dashboard
  useEffect(() => {
    if (localStorage.getItem("TokenLoginBusinpage")) {
      navigate("/postyourloadbusi");
      return;
    }
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Function to generate a token
  const generateToken = (phoneNumber, password) => {
    const token = btoa(`${phoneNumber}:${password}`); // Base64 encode the credentials
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate the token
    const TokenLoginBusinpage = generateToken(phoneNumber, password);

    // Create form data to match what the backend expects
    const formData = new FormData();
    formData.append("clientsPhone", phoneNumber);
    formData.append("clientsPassword", password.toString().trim());
    // Constructing a FormData object to send in the POST request.

    try {
      // Send POST request to backend
      const response = await fetch("/api/clients/auth/login.php", {
        method: "POST",
        body: formData, // Send form data
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      // Handling errors if the response is not ok (status code not in 200-299).

      // Parse JSON response
      const data = await response.json();
      // Parsing the JSON response body.

      // Log the entire response for debugging

      // Handle the success or failure based on response
      if (data.success) {
        setBusiLogUser(data.userData);
        setIsLoading(false);
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

        localStorage.setItem("TokenLoginBusinpage", TokenLoginBusinpage);
        // If login is successful, log the success and navigate to the contact us page.
        setTimeout(() => {
          // window.location.reload();
          navigate("/postyourloadbusi");
        }, 1500);
        // navigate("/contactus");
      } else {
        setIsLoading(false);
        // console.log("Login failed");
        toast.error("Phone number or Password wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // If login is unsuccessful, log the failure and display an error message.
      }
    } catch (error) {
      console.error("There was an error!", error);
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
      // Catching and logging any errors that occur during the fetch request.
    }
  };

  return (
    <div className=" relative">
      {/* Loading image section */}
      <div
        className={`w-full md:h-[159%] h-[237%] z-50 bg-[rgba(0,0,0,0.5)] absolute ${
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
              Load Provider Login
            </h1>
          </div>
          <div className="md:min-w-[400px] lg:w-[40%] sm:w-[320px] w-[370px] mx-auto border p-4 bg-gradient-to-r from-cyan-500 to-blue-500 md:to-[#bbe0bb] rounded-lg shadow-lg shadow-[#c78c5c]">
            <h1 className="text-3xl text-center font-semibold">Login</h1>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="text"
                  placeholder="mobile number"
                  required
                  maxLength={10}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <MdContactPhone className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />

              <div className="w-[90%] mx-auto mt-4 relative">
                <input
                  className=" w-full border border-[#888686] outline-none px-11 py-2 absolute rounded-lg"
                  type="password"
                  placeholder="password.."
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLockPasswordFill className=" relative top-3 left-2 text-2xl" />
              </div>
              <br />
              <div className="w-[90%] mx-auto">
                <h1
                  onClick={() =>
                    toast.info(
                      "Please contact the admin for password assistance!",
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
                    )
                  }
                  className="font-semibold py-2 cursor-pointer"
                >
                  Forgot Password?
                </h1>
                <button className="w-full mx-auto uppercase bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l to-pink-8  00 py-2 rounded-lg font-bold text-lg text-white cursor-pointer">
                  Login Now
                </button>
              </div>
            </form>
            <div className="flex mt-2 gap-2 justify-center items-center">
              <h1>Don't have an account?</h1>{" "}
              <Link to="/businesssignup">
                <span className="rounded-lg uppercase px-2 py-1 font-bold text-[#f44646]">
                  Sign Up
                </span>
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

export default LoginBusinessPage;
