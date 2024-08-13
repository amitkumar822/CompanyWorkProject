import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("LoginQuotationToken")) {
      navigate("/createquotation");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //👉 Generate token
  const generateToken = (username, password) => {
    const token = btoa(`${username}:${password}:${new Date()}`); // Base64 encode the credentials
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    setIsLoading(true);

    const LoginQuotationToken = generateToken(username, password);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password.toString().trim());

    try {
      const response = await axios.post("/api/admin/login.php", formData);

      if (response.data.status) {
        setIsLoading(false);
        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
        });

        localStorage.setItem("Log_username", response.data.userData.username);

        // Set the token in local storage
        localStorage.setItem("LoginQuotationToken", LoginQuotationToken);

        // Redirect to the dashboard page
        setTimeout(() => {
          navigate("/");
          window.location.reload(); // Refresh the page to ensure the new token is applied
        }, 1000);
      } else {
        setIsLoading(false);
        toast.error("Invalid credentials!", {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
      });
      console.log("Error: ", error);
    }
  };

  return (
    <>
      {/* Loading image section */}
      <div
        className={`w-full h-[110%] -mt-16 z-[52] bg-[rgba(0,0,0,0.5)] fixed ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>
      <div className="w-full h-screen mx-auto no-underline fixed bg-gradient-to-r from-teal-400 to-gray-800">
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

        {/* <div
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
        </div> */}

        <div className="w-[80%] h-full mx-auto flex justify-center items-center">
          <div className="w-[500px] mx-auto bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-lg shadow-md shadow-[yellow] py-4 px-2">
            <h1 className="text-center text-3xl font-bold italic font-serif underline ">
              Login
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-[450px] mx-auto italic mt-6"
            >
              <label htmlFor="username" className="text-xl font-semibold">
                User Name
              </label>
              <br />
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="tel" // This suggests a phone number
                placeholder="Enter your username"
                className="rounded-md px-4 py-2 w-[90%] text-black shadow-md shadow-stone-500 relative"
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
                autoComplete="current-password" // This suggests the current password
                placeholder="Enter your password"
                className="rounded-md px-4 py-2 text-black w-[90%] shadow-md shadow-stone-500 relative"
              />
              <br />
              <br />
              <span className="w-full mx-auto flex items-center justify-center text-center">
                <button className="px-4 py-2 z-10 bg-blue-500 rounded-lg text-xl italic font-semibold text-white uppercase hover:bg-blue-700 duration-200 hover:text-[#e2dcdc] shadow-md shadow-[yellow]">
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

export default LogIn;
