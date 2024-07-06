import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import loadingGfg from "../../data/GfgLoding/loading.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("LoginToken")) {
      navigate("/dashboard");
      return;
    }
  }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // generate token
  const generateToken = (phoneNumber, password) => {
    const token = btoa(`${phoneNumber}:${password}:${new Date()}`);
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const LoginTokenGenerate = generateToken(phoneNumber, password);

    const formData = new FormData();
    formData.append("phone", phoneNumber);
    formData.append("password", password.toString().trim());

    try {
      const response = await axios.post("/api/login.php", formData);

      if (response.data.status) {
        setIsLoading(false);
        toast.success("Successful login!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("LoginToken", LoginTokenGenerate);
        localStorage.setItem("UserValidation", response.data.userData.as_a);

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 1500);
      } else {
        setIsLoading(false);
        toast.error("Phone or Password is wrong!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error: " + error);
      setIsLoading(false);
      toast.error("Network or Server error!", {
        position: "top-center",
        autoClose: 1200,
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
    <>
      <div className="w-full h-screen mx-auto no-underline fixed area">
        {/* =======👇 Start Background animation circles and area 👇====== */}
        <div className="circles">
          <div className="circle text-white text-center">A</div>
          <div className="circle text-white text-center">N</div>
          <div className="circle text-white text-center">K</div>
          <div className="circle text-white text-center">S</div>
          <div className="circle text-white text-center">U</div>
          <div className="circle text-white text-center">M</div>
          <div className="circle text-white text-center">A</div>
          <div className="circle text-white text-center">A</div>
          <div className="circle text-white text-center">N</div>
          <div className="circle text-white text-center">K</div>
        </div>
        {/* =======👆 End Background animation circles and area 👆====== */}

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
        <div className="w-[80%] h-full mx-auto flex justify-center items-center">
          <div className="w-[500px] mx-auto bg-gray-300 rounded-lg shadow-md shadow-orange-700 py-4 px-2">
            <h1 className="text-center text-3xl font-bold italic font-serif underline">
              Login Page
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-[450px] mx-auto italic mt-6"
            >
              <label htmlFor="mobile" className="text-xl font-semibold">
                Mobile Number
              </label>
              <br />
              <input
                type="text"
                id="mobile"
                required
                minLength={10}
                maxLength={13}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="rounded-md px-4 py-2 w-[90%] shadow-md shadow-stone-500 relative"
              />
              <br />
              <label htmlFor="password" className="text-xl font-semibold">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded-md px-4 py-2 w-[90%] shadow-md shadow-stone-500 relative"
              />
              <br />
              <br />
              <span className="w-full mx-auto flex items-center justify-center text-center">
                <button className="px-4 py-2 z-10 bg-blue-600 rounded-lg text-xl italic font-semibold text-white uppercase hover:bg-blue-700 duration-200 hover:text-[#e2dcdc] shadow-md shadow-stone-500">
                  Login
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
