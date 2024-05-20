import React, { useState } from "react";

function VehicalLogin() {
  const [vehicalNumber, setVehicleNumber] = useState("");
  const [password, setPassword] = useState("");

  const hadleSubmitForm = async (event) => {
    event.preventDefault(); // Prevents page reload on form submit

    console.log("VehicalNumber:", vehicalNumber);
    console.log("Password:", password);

    // Create form data to match what the backend expects
    const formData = new FormData();
    formData.append("vehicalNumber", vehicalNumber);
    formData.append("password", password);

    try {
      const response = await fetch("/api/driver/driverlogin.php", {
        method: "POST",
        body: formData, // Send form data
      });

      // Log the response status and headers
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      // Log the entire response for debugging
      console.log("Full Response:", data);

      console.log('====================================');
      console.log("Result:", data);
      console.log('====================================');
      
      // Handle the success or failure based on response
      if (data.status === true || data.status === 'true') {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <h1 className="bg-[yellow] text-center">Vehical Login page</h1>
      <div className="text-center w-[400px] border">
        <form onSubmit={hadleSubmitForm}>
          <input
            className="border my-2 px-4 py-2 rounded-md"
            type="text"
            name="vehicalNumber"
            placeholder="vehicalNumber"
            value={vehicalNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
          <br />
          <input
            className="border my-2 px-4 py-2 rounded-md"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="bg-blue-600 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicalLogin;
