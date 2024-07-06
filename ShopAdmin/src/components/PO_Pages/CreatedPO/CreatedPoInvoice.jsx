import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function CreatedPoInvoice() {
  //submited succesfully disable buttons
  const [disableButtons, setDisableButtons] = useState(false);

  // Fetch Shopkeeper name using API
  const [shopkeeperName, setShopkeeperName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_shopkeeper_detail.php");
        if (Array.isArray(response.data)) {
          setShopkeeperName(response.data);
        }
      } catch (error) {
        console.error("ShopKeeperName Error: " + error);
      }
    };
    fetchData();
  }, [setShopkeeperName]);

  // Shopkeeper Select dropdown
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(
    JSON.parse(localStorage.getItem("selectedShopkeeper")) || null
  );
  const [
    shopkeeperAllDetailsWhenSelected,
    setShopkeeperAllDetailsWhenSelected,
  ] = useState(
    JSON.parse(localStorage.getItem("shopkeeperDetails")) || {
      address: "",
      state: "",
      mobile: "",
      gst: "",
      shopkeeperId: "",
    }
  );

  const shopkeeperOptions = shopkeeperName.map((shopkeeper) => ({
    value: shopkeeper.shopkeeper_id,
    label: shopkeeper.name,
    address: shopkeeper.address,
    state: shopkeeper.state,
    mobile: shopkeeper.mobile,
    gst: shopkeeper.gst,
    shopkeeperId: shopkeeper.id,
  }));

  const handleShopkeeperChange = (selectedOption) => {
    setSelectedShopkeeper(selectedOption);
    const details = {
      address: selectedOption.address,
      state: selectedOption.state,
      mobile: selectedOption.mobile,
      gst: selectedOption.gst,
      shopkeeperId: selectedOption.shopkeeperId,
      ShopkeeperName: selectedOption.label,
    };
    setShopkeeperAllDetailsWhenSelected(details);
    localStorage.setItem("selectedShopkeeper", JSON.stringify(selectedOption));
    localStorage.setItem("shopkeeperDetails", JSON.stringify(details));
    setListGoods([]); // Clear goods details
    localStorage.removeItem("listGoods"); // Clear goods details when shopkeeper changes
    setDisableButtons(false); // Disable
  };

  // Fetch Goods by ID
  const [goodsData, setGoodsData] = useState([]);
  const [listGoods, setListGoods] = useState(
    JSON.parse(localStorage.getItem("listGoods")) || []
  );
  const [selectedGoods, setSelectedGoods] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append(
        "shopkeeper_id",
        shopkeeperAllDetailsWhenSelected?.shopkeeperId
      );
      try {
        const response = await axios.post(
          "/api/get_goods_details.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (Array.isArray(response.data.data)) {
          setGoodsData(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching: ", error);
      }
    };
    fetchData();
  }, [setGoodsData, shopkeeperAllDetailsWhenSelected]);

  const goodsOptions = goodsData.map((data) => ({
    label: data.descriptions,
    rate: data.rate,
    goodsId: data.id,
  }));

  const handleGoodsChange = (selectedGoods) => {
    setSelectedGoods(selectedGoods);
    setListGoods((prevListGoods) => {
      if (!prevListGoods.find((item) => item.label === selectedGoods.label)) {
        const updatedGoods = [
          ...prevListGoods,
          { ...selectedGoods, quantity: 1 },
        ];
        localStorage.setItem("listGoods", JSON.stringify(updatedGoods));
        return updatedGoods;
      }
      return prevListGoods;
    });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedGoods = [...listGoods];
    updatedGoods[index].quantity = quantity;
    setListGoods(updatedGoods);
    localStorage.setItem("listGoods", JSON.stringify(updatedGoods));
  };

  //==========👇 Total And GST Calculate 👇=================
  const calculateTotal = () => {
    return listGoods.reduce((acc, item) => acc + item.rate * item.quantity, 0);
  };

  const totalAmount = calculateTotal();
  const cgst = totalAmount * 0.09;
  const sgst = totalAmount * 0.09;
  const finalAmount = totalAmount + cgst + sgst;

  // finalAmount save in localStorage for preview purposes
  useEffect(() => {
    localStorage.setItem("FinalAmount", finalAmount);
  }, [finalAmount]);

  //===========👇�� Delete Goods Section ��👇=================
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDelete = (index) => {
    setShowDeleteConfirmation(true);
    setDeleteIndex(index);
  };

  const handleDeleteConfirmation = () => {
    const updatedGoods = [...listGoods];
    updatedGoods.splice(deleteIndex, 1);
    setListGoods(updatedGoods);
    localStorage.setItem("listGoods", JSON.stringify(updatedGoods));
    toast.success("Successful remove goods!");
    setShowDeleteConfirmation(false);
  };

  //===========👇 Form Submitions Section 👇=================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = listGoods.map((item) => ({
      goods_id: item.goodsId,
      descriptions: item.label,
      quantity: item.quantity,
      rate: item.rate,
      cgst: (item.rate * item.quantity * 0.09).toFixed(2),
      sgst: (item.rate * item.quantity * 0.09).toFixed(2),
      total: (item.rate * item.quantity * 1.18).toFixed(2),
    }));

    console.log("AllDAta: "+ JSON.stringify(dataToSend, null, 2));

    const formData = new FormData();
    formData.append(
      "shopkeeper_id",
      shopkeeperAllDetailsWhenSelected.shopkeeperId
    ); // Add shopkeeper ID to form data for POST request
    formData.append("item_all_detail", JSON.stringify(dataToSend)); // Add payload to form data for POST request
    formData.append("final_total_amout", finalAmount.toFixed(2)); // Add final amount to form data for POST

    try {
      const response = await axios.post(
        "/api/created_po/upload_all_created_po_at_one_time.php",
        formData
      );

      // console.log("Response: ", JSON.stringify(response.data, null, 2)); // Add logging here for debugging

      if (response.data.success) {
        toast.success("Submitted successfully");
        setDisableButtons(true);
      } else {
        toast.error("Submission failed: " + response.data.error);
      }
    } catch (error) {
      toast.error("Network or server error: " + error.message);
    }
  };

  //===========👇 Custom Styles for Select Box 👇============
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "200px",
      borderColor: "gray",
      boxShadow: "none",
      "&:hover": {
        borderColor: "gray",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "white" : provided.backgroundColor,
      color: state.isSelected ? "black" : provided.color,
      "&:hover": {
        backgroundColor: "lightgray",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div className="mt-16">
      <div className="w-[80%] mx-auto mb-6">
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Created PO Page
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-[90%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
        >
          <label htmlFor="shopkeepername" className="text-xl italic">
            Shopkeeper Name
          </label>
          <Select
            id="shopkeepername"
            options={shopkeeperOptions}
            value={selectedShopkeeper}
            onChange={handleShopkeeperChange}
            styles={customStyles}
          />

          <br />
          <label htmlFor="address" className="text-xl italic mr-2">
            Address
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.address || ""}
            placeholder="Your address"
            className="w-[40%] border border-black rounded-md px-4 py-1 mr-4"
            readOnly
          />

          <label htmlFor="state" className="text-xl italic mr-2">
            State
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.state || ""}
            placeholder="Your state"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
            readOnly
          />
          <br />
          <br />
          <label htmlFor="mobile" className="text-xl italic mr-4">
            Mobile
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.mobile || ""}
            placeholder="Your mobile number"
            className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
            readOnly
          />
          <label htmlFor="gst" className="text-xl italic mr-4">
            GST
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.gst || ""}
            placeholder="Your GST number"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
            readOnly
          />
          <br />
          <br />
          <h1 className="text-xl italic">Goods Details</h1>
          <Select
            isDisabled={!selectedShopkeeper}
            options={goodsOptions}
            value={selectedGoods}
            onChange={handleGoodsChange}
            styles={customStyles}
          />
          <br />
          {/* Goods List  */}
          <div className={listGoods.length === 0 ? "hidden" : "block"}>
            <table className="w-[99%] mx-auto mb-4 border border-black rounded-md">
              <thead className="bg-black text-white">
                <tr>
                  <th>SI NO</th>
                  <th className="py-2">Goods</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>CGST (9%)</th>
                  <th>SGST (9%)</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-200">
                {listGoods.map((goods, index) => (
                  <tr key={index} className=" odd:bg-gray-100">
                    <td className="py-2 text-center">{index + 1}</td>
                    <td className="py-2 text-center">
                      {goods.label} ({goods.goodsId})
                    </td>
                    <td className="py-2 text-center w-[20%]">
                      <input
                        type="number"
                        value={goods.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                        min="1"
                        className="w-[32%] mx-auto rounded-md pl-1 border border-black"
                      />
                    </td>
                    <td className="py-2 text-center">{goods.rate}</td>
                    <td className="py-2 text-center">
                      {(goods.rate * goods.quantity * 0.09).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      {(goods.rate * goods.quantity * 0.09).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      {(goods.rate * goods.quantity * 1.18).toFixed(2)}
                    </td>

                    <td className="py-2 text-center">
                      <span
                        className="bg-red-500 hover:bg-red-600 text-white hover:text-[#e7e6e6] duration-200 px-2 py-1 rounded-md cursor-pointer mx-1"
                        onClick={() => handleDelete(index)}
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Preview Created PO */}
          <div
            className={`w-[96%] flex justify-end ${
              listGoods.length === 0 ? "hidden" : ""
            }`}
          >
            <Link
              to="/previewinvoicebill"
              className="bg-green-500 hover:bg-green-600 text-xl text-white hover:text-[#e7e6e6] duration-200 py-2 px-3 rounded-md font-semibold cursor-pointer"
            >
              Preview
            </Link>
          </div>
          {/* Total Amount */}
          {listGoods.length > 0 && (
            <div className="w-[50%] mx-auto mt-4 border border-black rounded-md py-2 px-2">
              <p className="text-xl italic text-center">
                Total Amount: ₹ {totalAmount.toFixed(2)}
              </p>
              <p className="text-xl italic text-center">
                CGST (9%): ₹ {cgst.toFixed(2)}
              </p>
              <p className="text-xl italic text-center">
                SGST (9%): ₹ {sgst.toFixed(2)}
              </p>
              <p className="text-xl italic text-center">
                Final Amount: ₹ {finalAmount.toFixed(2)}
              </p>
            </div>
          )}

          <div
            className={`flex justify-center mt-4 ${
              listGoods.length === 0 ? "hidden" : ""
            }`}
          >
            <button
              type="submit"
              disabled={disableButtons}
              className={`${
                disableButtons
                  ? "bg-gray-400 text-gray-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:text-[#e7e6e6]"
              } duration-200 text-xl px-4 py-2 rounded-md font-semibold`}
            >
              Submit For Approval
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Dilog Box */}
      <div
        className={`w-full h-[130%] mt-16 bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 flex justify-center items-center ${
          !showDeleteConfirmation ? "hidden" : ""
        }`}
      >
        <div className={`w-[500px] bg-gray-600 p-4 rounded-md z-50 -mt-60`}>
          <h1 className="text-xl text-white font-semibold">
            Delete Confirmation
          </h1>
          <p className="text-sm text-white">
            Are you sure you want to delete the selected goods?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              No
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
              onClick={handleDeleteConfirmation}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatedPoInvoice;
