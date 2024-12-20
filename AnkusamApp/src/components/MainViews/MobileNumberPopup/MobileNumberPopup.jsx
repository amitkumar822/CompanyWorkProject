import axios from "axios";
import React, { useEffect, useState } from "react";

const MobileNumberPopup = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    if (!firstVisit) {
      setShowPopup(true);
    }
  }, []);

  // const handleClose = () => {
  //   setShowPopup(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone", mobileNumber);

    try {
      const response = await axios.post("/api/phone/phone.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response: " + JSON.stringify(response, null, 2));
    } catch (error) {
      console.log(error);
    }
    if (mobileNumber.length >= 10) {
      setShowPopup(false);
      localStorage.setItem("firstVisit", "true");
    }
  };

  return (
    showPopup && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3 shadow-zinc-700">
          <h2 className="text-2xl font-bold mb-4">Enter Your Mobile Number</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Mobile Number"
              minLength={10}
              maxLength={15}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {/* <button
            onClick={handleClose}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Close
          </button> */}
        </div>
      </div>
    )
  );
};

export default MobileNumberPopup;
