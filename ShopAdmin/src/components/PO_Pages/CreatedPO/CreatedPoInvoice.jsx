import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function CreatedPoInvoice() {
  // ============👇Start Featch Shopkeeper name using API 👇==================

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

  // ============👆 End Featch Shopkeeper name using API 👆==================

  // ============👇��Start Shopkeeper Select dropdown ��👇==================

  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  //⏩when user selects a shopkeeper after all details save in useState()
  const [
    shopkeeperAllDetailsWhenSelected,
    setShopkeeperAllDetailsWhenSelected,
  ] = useState({
    address: "",
    state: "",
    mobile: "",
    gst: "",
    shopkeeperId: "",
  });
  // here when click user shopkeeper name all details filter and save in shopkeeperAllDetailsWhenSelected State
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
    setShopkeeperAllDetailsWhenSelected({
      address: selectedOption.address,
      state: selectedOption.state,
      mobile: selectedOption.mobile,
      gst: selectedOption.gst,
      shopkeeperId: selectedOption.shopkeeperId,
    });
  };
  // ============👆�� End Shopkeeper Select dropdown ��👆==================
  
  //👉----------- Shopkeeper name drop down customStyles ----------
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
      <div className="w-[80%] mx-auto">
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Created PO Page
        </h1>
        <form
          action=""
          className="w-[80%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
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
            className="min-w-[200px] border-2 border-gray-400 p-2 rounded-md text-black"
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
          />

          <label htmlFor="state" className="text-xl italic mr-2">
            State
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.state || ""}
            placeholder="Your state"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
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
            maxLength={10}
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
          />
          <label htmlFor="gst" className="text-xl italic mr-4">
            GST
          </label>
          <input
            type="text"
            value={shopkeeperAllDetailsWhenSelected.gst || ""}
            placeholder="Your GST number"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
          />
        </form>
      </div>
    </div>
  );
}

export default CreatedPoInvoice;
