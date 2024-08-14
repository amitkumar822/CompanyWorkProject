import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormatIndianCurrency } from "../../utils/FormatIndianCurrency";

function Quotation() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginQuotationToken")) {
      navigate("/");
      return;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // ==========👇 Total Amount And GST Calculate here 👇=================
  const [selectedGoods, setSelectedGoods] = useState(
    () => JSON.parse(localStorage.getItem("Quo_SelectedGoods")) || []
  );

  // const [totalAmount, setTotalAmount] = useState(0);
  const [cgst, setCgst] = useState(
    () => parseInt(localStorage.getItem("Quo_CgstSgst")) || 0
  );
  const [sgst, setSgst] = useState(
    () => parseInt(localStorage.getItem("Quo_CgstSgst")) || 0
  );
  const [igst, setIGst] = useState(
    () => parseInt(localStorage.getItem("Quo_Igst")) || 0
  );

  const [quantityInput, setQuantityInput] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount based on updated goods
    const newTotalAmount = selectedGoods.reduce(
      (acc, curr) => acc + curr.rate * (curr.measurement_number || 1),
      0
    );
    setTotalAmount(newTotalAmount);
  }, [selectedGoods, quantityInput]); // Recalculate whenever selectedGoods or quantityInput changes

  const handleQuantityChange = (index, quantity) => {
    const updatedGoods = [...selectedGoods];
    updatedGoods[index].measurement_number = quantity;
    setQuantityInput(quantity);
  };

  const cgstCalculated = (totalAmount * parseInt(cgst)) / 100;
  const sgstCalculated = (totalAmount * parseInt(sgst)) / 100;
  const igstCalculated = (totalAmount * parseInt(igst)) / 100;

  const finalAmount =
    cgstCalculated + sgstCalculated + igstCalculated + totalAmount;

  // Store the calculated values in local storage
  localStorage.setItem("Quo_CgstSgst", cgst);
  localStorage.setItem("Quo_Igst", igst);
  localStorage.setItem("Quo_TotalAmount", totalAmount);
  localStorage.setItem("Quo_FinalAmount", finalAmount);

  // ==========👇 Featch Shopkeeper Details 👇=================
  const [shopkeeperDetails, setShopkeeperDetails] = useState(
    () => JSON.parse(localStorage.getItem("QuoShopkeeperDetails")) || []
  );
  const [shopkeeperAdress, setShopkeeperAdress] = useState(
    () => JSON.parse(localStorage.getItem("Quo_ShopkeeperDetails")) || {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_customer_detail.php");

        if (Array.isArray(response.data)) {
          setShopkeeperDetails(response.data);
          localStorage.setItem(
            "QuoShopkeeperDetails",
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        console.log("Shopkeeper API Featch Error: \n " + error);
      }
    };
    fetchData();
  }, [setShopkeeperDetails]);

  const handleShopkeeperChange = (selectedOption) => {
    setSelectedGoods([]);
    setTotalAmount(0);
    const selectedShopkeeperDetails = shopkeeperDetails.find(
      (details) => details.id === selectedOption.id
    );

    if (selectedShopkeeperDetails.state === "Tamil Nadu - 33") {
      setCgst(9);
      setSgst(9);
      setIGst(0);
      localStorage.setItem("Quo_CgstSgst", JSON.stringify(9));
    } else {
      setCgst(0);
      setSgst(0);
      setIGst(18);
      localStorage.setItem("Quo_Igst", JSON.stringify(18));
    }

    setShopkeeperAdress(selectedShopkeeperDetails);
    localStorage.setItem(
      "Quo_ShopkeeperDetails",
      JSON.stringify(selectedShopkeeperDetails)
    );
  };

  // ==========👇 Featch Goods Details in Dashboard Section 👇===============

  // const [goodsDetails, setGoodsDetails] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem("Dash_Goods_details")) {
  //     setGoodsDetails(JSON.parse(localStorage.getItem("Dash_Goods_details")));
  //     return;
  //   }
  // }, [setGoodsDetails]);

  const [goodsDetails, setGoodsDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("Dash_Goods_details")) || [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_item_descriptions.php");

        if (Array.isArray(response.data.description)) {
          setGoodsDetails(response.data.description);
          localStorage.setItem(
            "Dash_Goods_details",
            JSON.stringify(response.data.description)
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setGoodsDetails]);

  // ============👇 Handling Goods Changes 👇============

  const [selectedGoodsNameOnly, setSelectedGoodsNameOnly] = useState(
    () => localStorage.getItem("Quo_SelectedGoodsNameOnly") || ""
  );

  const handleGoodsChange = (selectedOption) => {
    const selectedGoodsDetail = goodsDetails.find(
      (goods) => goods.id === selectedOption.id
    );
    setSelectedGoodsNameOnly(selectedOption.value);
    localStorage.setItem("Quo_SelectedGoodsNameOnly", selectedOption.value);
    // Check if the selected goods are already in the array
    setSelectedGoods((prevSelectedGoods) => {
      // If the selected item is already in the array, return the previous array unchanged
      if (
        prevSelectedGoods.some((goods) => goods.id === selectedGoodsDetail.id)
      ) {
        return prevSelectedGoods;
      }
      setTotalAmount(totalAmount + parseInt(selectedOption.rate));

      // Otherwise, add the new item to the array
      return [...prevSelectedGoods, selectedGoodsDetail];
    });
  };
  localStorage.setItem("Quo_SelectedGoods", JSON.stringify(selectedGoods));

  // ============👇 Remove Selected Goods 👇==============
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeDetails, setRemoveDetails] = useState({
    selectedId: "",
    rate: 1,
  });

  const handleRemoveGoods = (selectedId, rate) => {
    setShowRemoveConfirmation(true);
    setRemoveDetails({ selectedId, rate });
  };

  const handleRemoveConfirmation = () => {
    const updatedGoodsDetails = selectedGoods.filter(
      (goodsId) => goodsId.id !== removeDetails.selectedId
    );
    setTotalAmount(totalAmount - parseInt(removeDetails.rate));
    setSelectedGoods(updatedGoodsDetails);
    setShowRemoveConfirmation(false);
  };

  // ============👇 Generate Quotations 👇==============

  const handleGenerateQuatationsId = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const amoutGSTDetails = {
      cgst: cgstCalculated,
      sgst: sgstCalculated,
      igst: igstCalculated,
      total_amount: totalAmount,
      final_Amount: finalAmount,
    };

    const formData = new FormData();
    formData.append("customer_detail", JSON.stringify(shopkeeperAdress));
    formData.append("descriptions", JSON.stringify(selectedGoods));
    formData.append("amout", JSON.stringify(amoutGSTDetails));
    formData.append("username", localStorage.getItem("Log_username"));
    formData.append("count", 1);

    try {
      const username = localStorage.getItem("Log_username");

      const apiEndPoints = {
        mani: "/api/insert_qutation_by_mani.php",
        subathra: "/api/insert_qutations_subhatra.php",
        ilakkiya: "/api/insert_qutations_by_Ilakkiya_discription.php",
        omkumar: "/api/insert_qutation_by_omkumar.php",
      };

      const endpoint = apiEndPoints[username];

      if (endpoint) {
        const response = await axios.post(endpoint, formData);

        // console.log("response: " + JSON.stringify(response.data.last_id, null, 2));

        localStorage.setItem("QuotationNumber", response.data.last_id);

        if (response.data.inserted) {
          toast.success("Successful generate quotation.", {
            position: "top-center",
            autoClose: 1700,
          });

          setIsLoading(false);
          setTimeout(() => {
            navigate("/previewinvoicebill");
          }, 1500);
        } else {
          toast.error("Failed to generate quotation.", {
            position: "top-center",
            autoClose: 1700,
          });
          setIsLoading(false);
        }
      } else {
        toast.error("Invalid username or API endpoint not found.", {
          position: "top-center",
          autoClose: 1700,
        });
        throw new Error("Invalid username or API endpoint not found.");
      }
    } catch (error) {
      console.log("Error Generate Quotation: \n" + error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1700,
      });
      setIsLoading(false);
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
      <div className="w-[100%] mx-auto mb-6">
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Quotation Page
        </h1>
        <form
          // onSubmit={handleSubmit}
          className="w-[90%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
        >
          <label htmlFor="shopkeepername" className="text-xl italic">
            Customer Name
          </label>
          <Select
            id="shopkeepername"
            options={shopkeeperDetails.map((details) => ({
              label: details.username,
              value: details.username,
              id: details.id,
            }))}
            value={{
              label: shopkeeperAdress?.username,
              value: shopkeeperAdress?.username,
            }}
            onChange={handleShopkeeperChange}
          />

          <br />
          <span className="grid grid-cols-2">
            <div className="flex items-center">
              <label htmlFor="address" className="text-xl italic mr-2">
                Address
              </label>
              <textarea
                type="text"
                value={shopkeeperAdress.address || ""}
                placeholder="Your address"
                className="w-[79.5%] min-h-10 max-h-20 border border-black rounded-md px-4 py-1 mr-4"
                readOnly
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="state" className="text-xl italic mr-2">
                State
              </label>
              <input
                type="text"
                value={shopkeeperAdress.state || ""}
                placeholder="Your state"
                className="w-[74%] border border-black rounded-md px-4 py-1"
                readOnly
              />
            </div>
          </span>
          <br />
          <br />
          <label htmlFor="mobile" className="text-xl italic mr-4">
            Mobile
          </label>
          <input
            type="text"
            value={shopkeeperAdress.phone || ""}
            placeholder="Your mobile number"
            className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
            readOnly
          />
          <label htmlFor="gst" className="text-xl italic mr-4">
            GST
          </label>
          <input
            type="text"
            value={shopkeeperAdress.gst || ""}
            placeholder="Your GST number"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
            readOnly
          />
          <br />
          <br />
          <h1 className="text-xl italic">Goods Details</h1>
          <Select
            isDisabled={!shopkeeperAdress.state}
            options={goodsDetails.map((goods) => ({
              label: goods.goods_name,
              value: goods.goods_name,
              id: goods.id,
              rate: goods.rate,
            }))}
            value={{
              label: selectedGoodsNameOnly,
              value: selectedGoodsNameOnly,
            }}
            onChange={handleGoodsChange}
          />
          <br />
          {/* Goods List  */}
          <table className="w-[99%] mx-auto mb-4 border border-black rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  SI No
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  Part No
                </th>
                <th className="py-2 px-2 border-b-2 border-black  border-r-2">
                  Goods Name
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  Specifications
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 w-[50px]">
                  Quantity
                </th>

                <th className="py-2 px-2 border-b-2 border-black border-r-2  w-[170px] text-center">
                  Rate
                </th>
                <th className="py-2 px-2 border-b-2 border-black border-r-2 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {selectedGoods?.map((items, index) => (
                <tr key={index} className=" odd:bg-pink-200 text-[17px]">
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {index + 1}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {items.part_number}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    {items.goods_name}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black text-justify">
                    {items.specifications.map((items, index) => (
                      <div key={index}>
                        {"👉"} {items}
                      </div>
                    ))}
                  </td>

                  <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[50px]">
                    <input
                      type="number"
                      value={items.measurement_number || 1}
                      onChange={(e) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      min="1"
                      className="w-[80%] mx-auto rounded-md pl-1 border border-black"
                    />
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black w-[170px] text-center">
                    {FormatIndianCurrency.format(items.rate)}
                  </td>
                  <td className="py-2 px-2 border-b-2 border-r-2 border-black">
                    <span
                      onClick={() => handleRemoveGoods(items.id, items.rate)}
                      className="bg-red-500 hover:bg-red-600 duration-200 font-semibold italic py-1 px-2 text-white hover:text-[#d3d1d1] rounded-md shadow-md shadow-gray-800 cursor-pointer"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Amount */}
          {selectedGoods.length > 0 && (
            <div className="w-[50%] mx-auto mt-4 border border-black rounded-md py-2 px-2">
              <p className="text-xl italic text-center ">
                Total Amount:{" "}
                {FormatIndianCurrency.format(totalAmount.toFixed(2))}
              </p>
              <p
                className={`text-xl italic text-center ${
                  cgst === 0 ? "hidden" : ""
                }`}
              >
                CGST ({cgst}%):{" "}
                {FormatIndianCurrency.format(cgstCalculated.toFixed(2))}
              </p>
              <p
                className={`text-xl italic text-center ${
                  sgst === 0 ? "hidden" : ""
                }`}
              >
                SGST ({sgst}%): ₹{" "}
                {FormatIndianCurrency.format(sgstCalculated.toFixed(2))}
              </p>
              <p
                className={`text-xl italic text-center ${
                  cgstCalculated || sgstCalculated !== 0 ? "hidden" : ""
                }`}
              >
                IGST ({igst}%): ₹{" "}
                {FormatIndianCurrency.format(igstCalculated.toFixed(2))}
              </p>
              <p className="text-xl italic text-center">
                Final Amount: ₹{" "}
                {FormatIndianCurrency.format(finalAmount.toFixed(2))}
              </p>
            </div>
          )}

          {/*======👇 Preview Created PO 👇====*/}
          <div
            className={`w-[96%] flex justify-center mt-6 ${
              selectedGoods.length === 0 ? "hidden" : ""
            }`}
          >
            <button
              onClick={handleGenerateQuatationsId}
              className="bg-green-500 hover:bg-green-600 text-xl text-white hover:text-[#e7e6e6] duration-200 py-2 px-3 rounded-md font-semibold cursor-pointer"
            >
              Generate Quotation
            </button>
          </div>

          <div className={`w-[96%] flex justify-center mt-6`}>
            <NavLink
            to="/historyquotation"
            className="text-xl duration-200 py-2 px-3 rounded-md font-semibold cursor-pointer bg-gradient-to-r from-yellow-300 to-green-200 hover:from-green-300 hover:to-yellow-300">
              Check Your Quotation
            </NavLink>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Dilog Box */}
      <div
        className={`w-full h-[130%] -mt-20 z-[50] bg-[rgba(0,0,0,0.5)]  top-0 left-0 flex justify-center items-center fixed ${
          !showRemoveConfirmation ? "hidden" : ""
        }`}
      >
        <div className={`w-[500px] bg-gray-600 p-4 rounded-md z-50 `}>
          <h1 className="text-xl text-white font-semibold">
            Delete Confirmation
          </h1>
          <p className="text-sm text-white">
            Are you sure you want to delete the selected goods?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
              onClick={() => setShowRemoveConfirmation(false)}
            >
              No
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
              onClick={handleRemoveConfirmation}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Quotation;
