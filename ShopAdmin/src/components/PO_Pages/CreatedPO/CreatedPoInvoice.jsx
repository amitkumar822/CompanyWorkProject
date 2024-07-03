// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";

// function CreatedPoInvoice() {
//   // ============👇Start Featch Shopkeeper name using API 👇==================
//   const [shopkeeperName, setShopkeeperName] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/get_shopkeeper_detail.php");

//         if (Array.isArray(response.data)) {
//           setShopkeeperName(response.data);
//         }
//       } catch (error) {
//         console.error("ShopKeeperName Error: " + error);
//       }
//     };
//     fetchData();
//   }, [setShopkeeperName]);

//   // ============👆 End Featch Shopkeeper name using API 👆==================

//   // ============👇 Start Shopkeeper Select dropdown 👇==================
//   const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
//   //⏩when user selects a shopkeeper after all details save in useState()
//   const [
//     shopkeeperAllDetailsWhenSelected,
//     setShopkeeperAllDetailsWhenSelected,
//   ] = useState({
//     address: "",
//     state: "",
//     mobile: "",
//     gst: "",
//     shopkeeperId: "",
//   });

//   // here when click user shopkeeper name all details filter and save in shopkeeperAllDetailsWhenSelected State
//   const shopkeeperOptions = shopkeeperName.map((shopkeeper) => ({
//     value: shopkeeper.shopkeeper_id,
//     label: shopkeeper.name,
//     address: shopkeeper.address,
//     state: shopkeeper.state,
//     mobile: shopkeeper.mobile,
//     gst: shopkeeper.gst,
//     shopkeeperId: shopkeeper.id,
//   }));

//   const handleShopkeeperChange = (selectedOption) => {
//     setSelectedShopkeeper(selectedOption);
//     setShopkeeperAllDetailsWhenSelected({
//       address: selectedOption.address,
//       state: selectedOption.state,
//       mobile: selectedOption.mobile,
//       gst: selectedOption.gst,
//       shopkeeperId: selectedOption.shopkeeperId,
//     });
//   };
//   // ============👆 End Shopkeeper Select dropdown 👆==================

//   // ============👇 Start Featch Goods by ID 👇======================
//   const [goodsData, setGoodsData] = useState([]);
//   const [listGoods, setListGoods] = useState([]);
//   const [selectedGoods, setSelectedGoods] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const formData = new FormData();
//       formData.append(
//         "shopkeeper_id",
//         shopkeeperAllDetailsWhenSelected?.shopkeeperId
//       );
//       try {
//         const response = await axios.post(
//           "/api/get_goods_details.php",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (Array.isArray(response.data.data)) {
//           setGoodsData(response.data.data);
//         }
//       } catch (error) {
//         console.log("Error fetching: ", error);
//       }
//     };
//     fetchData();
//   }, [setGoodsData, shopkeeperAllDetailsWhenSelected]);

//   //....... Start Goods Search in Select box .........
//   const goodsOptions = goodsData.map((data) => ({
//     label: data.descriptions,
//     rate: data.rate,
//   }));

//   const handleGoodsChange = (selectedGoods) => {
//     setSelectedGoods(selectedGoods);
//     // Update the listGoods state to include the new selection without replacing the old data
//     // Check if the selected item already exists in the listGoods array
//     setListGoods((prevListGoods) => {
//       if (!prevListGoods.find((item) => item.label === selectedGoods.label)) {
//         return [...prevListGoods, { ...selectedGoods, quantity: 1 }];
//       }
//       return prevListGoods;
//     });
//   };

//   // ============👆 End Featch Goods by ID 👆=======================

//   // ============👇 Handle quantity changes and total calculation 👇======================
//   const handleQuantityChange = (index, quantity) => {
//     const updatedGoods = [...listGoods]; // Create a copy of the listGoods array
//     updatedGoods[index].quantity = quantity; // Update the quantity for the specified item
//     setListGoods(updatedGoods); // Update the state with the new list of goods
//   };

//   const calculateTotal = () => {
//     return listGoods.reduce((acc, item) => acc + item.rate * item.quantity, 0);
//   };

//   const totalAmount = calculateTotal(); // Total price of all items
//   const cgst = totalAmount * 0.09; // CGST which is 9% of the total amount
//   const sgst = totalAmount * 0.09; // SGST which is 9% of the total amount
//   const finalAmount = totalAmount + cgst + sgst; // Final amount including CGST and SGST

//   // ============👆 End quantity changes and total calculation 👆======================

//   // ============👇 Handle delete functionality 👇======================
//   const handleDelete = (index) => {
//     setListGoods((prevListGoods) =>
//       prevListGoods.filter((_, i) => i !== index)
//     );
//   };

//   // ============👆 End delete functionality 👆======================

//   // 👉----------- Shopkeeper name drop down customStyles ----------
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       minWidth: "200px",
//       borderColor: "gray",
//       boxShadow: "none",
//       "&:hover": {
//         borderColor: "gray",
//       },
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? "white" : provided.backgroundColor,
//       color: state.isSelected ? "black" : provided.color,
//       "&:hover": {
//         backgroundColor: "lightgray",
//       },
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: "black",
//     }),
//   };

//   return (
//     <div className="mt-16">
//       <div className="w-[80%] mx-auto">
//         <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
//           Welcome to Created PO Page
//         </h1>
//         <form
//           action=""
//           className="w-[80%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
//         >
//           <label htmlFor="shopkeepername" className="text-xl italic">
//             Shopkeeper Name
//           </label>
//           <Select
//             id="shopkeepername"
//             options={shopkeeperOptions}
//             value={selectedShopkeeper}
//             onChange={handleShopkeeperChange}
//             styles={customStyles}
//           />

//           <br />
//           <label htmlFor="address" className="text-xl italic mr-2">
//             Address
//           </label>
//           <input
//             type="text"
//             value={shopkeeperAllDetailsWhenSelected.address || ""}
//             placeholder="Your address"
//             className="w-[40%] border border-black rounded-md px-4 py-1 mr-4"
//           />

//           <label htmlFor="state" className="text-xl italic mr-2">
//             State
//           </label>
//           <input
//             type="text"
//             value={shopkeeperAllDetailsWhenSelected.state || ""}
//             placeholder="Your state"
//             className="border border-black rounded-md px-4 py-1 w-[40%]"
//           />
//           <br />
//           <br />
//           <label htmlFor="mobile" className="text-xl italic mr-4">
//             Mobile
//           </label>
//           <input
//             type="text"
//             value={shopkeeperAllDetailsWhenSelected.mobile || ""}
//             placeholder="Your mobile number"
//             className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
//             maxLength={10}
//             pattern="[0-9]{10}"
//             title="Please enter a valid 10-digit mobile number"
//           />
//           <label htmlFor="gst" className="text-xl italic mr-4">
//             GST
//           </label>
//           <input
//             type="text"
//             value={shopkeeperAllDetailsWhenSelected.gst || ""}
//             placeholder="Your GST number"
//             className="border border-black rounded-md px-4 py-1 w-[40%]"
//           />
//           <br />
//           <br />
//           <h1 className="text-xl italic">Goods Details</h1>
//           <Select
//             isDisabled={!selectedShopkeeper}
//             options={goodsOptions}
//             value={selectedGoods}
//             onChange={handleGoodsChange}
//             styles={customStyles}
//           />
//           <br />
//           {/* Goods List  */}
//           <div className={`${listGoods.length ===0  ? 'hidden' : ''}`}>
//             <label htmlFor="tablegoodslist">Goods List</label>
//             <table
//               className="w-full mx-auto text-center border overflow-x-auto overflow-y-auto"
//               id="tablegoodslist"
//             >
//               <thead className=" whitespace-nowrap bg-pink-400">
//                 <tr>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     SI NO
//                   </th>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     Goods List
//                   </th>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     Quantity
//                   </th>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     Rate
//                   </th>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     Total
//                   </th>
//                   <th className="py-2 border-b-2 border-r-2 border-black">
//                     Delete
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listGoods.map((goods, index) => (
//                   <tr key={index} className=" even:bg-gray-200">
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       {index + 1}
//                     </td>
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       {goods.label}
//                     </td>
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       <input
//                         type="number"
//                         value={goods.quantity}
//                         min={1}
//                         onChange={(e) =>
//                           handleQuantityChange(index, parseInt(e.target.value))
//                         }
//                         className="border border-black rounded-md px-4 py-1 w-[40%]"
//                       />
//                     </td>
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       {goods.rate}
//                     </td>
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       {goods.rate * goods.quantity}
//                     </td>
//                     <td className="py-2 border-b-2 border-r-2 border-black">
//                       <button
//                         onClick={() => handleDelete(index)}
//                         className="border border-black px-4 py-1 rounded-md text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="mt-4">
//               <p className="text-xl italic">
//                 Total Price (All Items Included): {totalAmount.toFixed(2)}
//               </p>
//               <p className="text-xl italic">CGST (9%): {cgst.toFixed(2)}</p>
//               <p className="text-xl italic">SGST (9%): {sgst.toFixed(2)}</p>
//               <p className="text-xl italic">
//                 Final Amount: {finalAmount.toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreatedPoInvoice;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function CreatedPoInvoice() {
  // ============👇 Start Fetch Shopkeeper name using API 👇==================
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

  // ============👆 End Fetch Shopkeeper name using API 👆==================

  // ============👇 Start Shopkeeper Select dropdown 👇==================
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
    const details = {
      address: selectedOption.address,
      state: selectedOption.state,
      mobile: selectedOption.mobile,
      gst: selectedOption.gst,
      shopkeeperId: selectedOption.shopkeeperId,
    };
    setShopkeeperAllDetailsWhenSelected(details);
    localStorage.setItem("selectedShopkeeper", JSON.stringify(selectedOption));
    localStorage.setItem("shopkeeperDetails", JSON.stringify(details));
  };
  // ============👆 End Shopkeeper Select dropdown 👆==================

  // ============👇 Start Fetch Goods by ID 👇======================
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

  //....... Start Goods Search in Select box .........
  const goodsOptions = goodsData.map((data) => ({
    label: data.descriptions,
    rate: data.rate,
  }));

  const handleGoodsChange = (selectedGoods) => {
    setSelectedGoods(selectedGoods);
    // Update the listGoods state to include the new selection without replacing the old data
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

  // ============👆 End Fetch Goods by ID 👆=======================

  // ============👇 Handle quantity changes and total calculation 👇======================
  const handleQuantityChange = (index, quantity) => {
    const updatedGoods = [...listGoods]; // Create a copy of the listGoods array
    updatedGoods[index].quantity = quantity; // Update the quantity for the specified item
    setListGoods(updatedGoods); // Update the state with the new list of goods
    localStorage.setItem("listGoods", JSON.stringify(updatedGoods));
  };

  const calculateTotal = () => {
    return listGoods.reduce((acc, item) => acc + item.rate * item.quantity, 0);
  };

  const totalAmount = calculateTotal(); // Total price of all items
  const cgst = totalAmount * 0.09; // CGST which is 9% of the total amount
  const sgst = totalAmount * 0.09; // SGST which is 9% of the total amount
  const finalAmount = totalAmount + cgst + sgst; // Final amount including CGST and SGST

  // ============👆 End quantity changes and total calculation 👆======================

  // ============👇 Handle delete functionality 👇======================
  const handleDelete = (index) => {
    const updatedGoods = listGoods.filter((_, i) => i !== index);
    setListGoods(updatedGoods);
    localStorage.setItem("listGoods", JSON.stringify(updatedGoods));
  };

  // ============👆 End delete functionality 👆======================

  // 👉----------- Shopkeeper name drop down customStyles ----------
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
          <div className={`${listGoods.length === 0 ? "hidden" : ""}`}>
            <label htmlFor="tablegoodslist">Goods List</label>
            <table
              className="w-full mx-auto text-center border overflow-x-auto overflow-y-auto"
              id="tablegoodslist"
            >
              <thead className=" whitespace-nowrap bg-pink-400">
                <tr>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    SI NO
                  </th>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    Goods List
                  </th>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    Quantity
                  </th>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    Rate
                  </th>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    Total
                  </th>
                  <th className="py-2 border-b-2 border-r-2 border-black">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {listGoods.map((goods, index) => (
                  <tr key={index} className=" even:bg-gray-200">
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      {index + 1}
                    </td>
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      {goods.label}
                    </td>
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      <input
                        type="number"
                        value={goods.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(index, parseInt(e.target.value))
                        }
                        className="border border-black rounded-md px-4 py-1 w-[40%]"
                      />
                    </td>
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      {goods.rate}
                    </td>
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      {goods.rate * goods.quantity}
                    </td>
                    <td className="py-2 border-b-2 border-r-2 border-black">
                      <button
                        onClick={() => handleDelete(index)}
                        className="border border-black px-4 py-1 rounded-md text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <p className="text-xl italic">
                Total Price (All Items Included): {totalAmount.toFixed(2)}
              </p>
              <p className="text-xl italic">CGST (9%): {cgst.toFixed(2)}</p>
              <p className="text-xl italic">SGST (9%): {sgst.toFixed(2)}</p>
              <p className="text-xl italic">
                Final Amount: {finalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatedPoInvoice;
