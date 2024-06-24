import React from "react";

function Login() {
  return (
    <>
      <div className="w-full h-screen mx-auto">
        <div className="w-[80%] h-full mx-auto mt-4 flex justify-center items-center">
          <div className="w-[500px] mx-auto bg-gray-300 rounded-lg shadow-md shadow-orange-700 py-4 px-2">
            <h1 className="text-center text-3xl font-bold italic font-serif underline">
              Login Page
            </h1>
            <form action="" className="w-[450px] mx-auto italic mt-6">
              <label htmlFor="name" className="text-xl font-semibold">
                Mobile Number
              </label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Enter your mobile number"
                className="rounded-md px-4 py-2 w-[90%] shadow-md shadow-stone-500 relative"
              />
              <br />
              <label htmlFor="password" className="text-xl font-semibold">
                Password
              </label>
              <br />
              <input
                type="text"
                id="password"
                placeholder="Enter your password"
                className="rounded-md px-4 py-2 w-[90%] shadow-md shadow-stone-500 relative"
              />
              <br />
              <br />
              <span className="w-full mx-auto flex items-center justify-center text-center">
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-xl italic font-semibold text-white uppercase hover:bg-blue-700 duration-200 hover:text-[#e2dcdc] shadow-md shadow-stone-500">
                  Login
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
