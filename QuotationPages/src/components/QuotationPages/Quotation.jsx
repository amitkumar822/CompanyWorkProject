import React, { useState } from "react";
import Select from "react-select";
import loadingGfg from "../../data/GfgLoding/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Quotation() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* Loading image section */}
      <div
        className={`w-full h-[110%] -mt-16 z-[52] bg-[rgba(0,0,0,0.5)] absolute ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className=" absolute w-full h-screen flex justify-center items-center">
          <img className="w-[100px] h-[100px] fixed" src={loadingGfg} alt="" />
        </div>
      </div>
      <div className="w-[80%] mx-auto mb-6">
        <h1 className="text-center text-3xl italic pt-4 font-semibold font-serif underline text-green-600">
          Welcome to Quotation Page
        </h1>
        <form
          // onSubmit={handleSubmit}
          className="w-[90%] mx-auto border border-black px-4 py-4 mt-6 rounded-md"
        >
          <label htmlFor="shopkeepername" className="text-xl italic">
            Shopkeeper Name
          </label>
          <Select
            id="shopkeepername"
            // options={shopkeeperOptions}
            // value={selectedShopkeeper}
            // onChange={handleShopkeeperChange}
          />

          <br />
          <label htmlFor="address" className="text-xl italic mr-2">
            Address
          </label>
          <input
            type="text"
            // value={shopkeeperAllDetailsWhenSelected.address || ""}
            placeholder="Your address"
            className="w-[40%] border border-black rounded-md px-4 py-1 mr-4"
            readOnly
          />

          <label htmlFor="state" className="text-xl italic mr-2">
            State
          </label>
          <input
            type="text"
            // value={shopkeeperAllDetailsWhenSelected.state || ""}
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
            // value={shopkeeperAllDetailsWhenSelected.mobile || ""}
            placeholder="Your mobile number"
            className="border border-black rounded-md px-4 py-1 w-[40%] mr-4"
            readOnly
          />
          <label htmlFor="gst" className="text-xl italic mr-4">
            GST
          </label>
          <input
            type="text"
            // value={shopkeeperAllDetailsWhenSelected.gst || ""}
            placeholder="Your GST number"
            className="border border-black rounded-md px-4 py-1 w-[40%]"
            readOnly
          />
          <br />
          <br />
          <h1 className="text-xl italic">Goods Details</h1>
          <Select
          // isDisabled={!selectedShopkeeper}
          // options={goodsOptions}
          // value={selectedGoods}
          // onChange={handleGoodsChange}
          />
          <br />
          {/* Goods List  */}
          {/* <div className={listGoods.length === 0 ? "hidden" : "block"}> */}
          <table className="w-[99%] mx-auto mb-4 border border-black rounded-md">
            <thead className="bg-black text-white">
              <tr>
                <th>SI NO</th>
                <th className="py-2">Goods</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>IGST</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {/* {listGoods.map((goods, index) => ( */}
              <tr className=" odd:bg-gray-100">
                <td className="py-2 text-center">
                  {/* {index + 1} */}
                  12
                </td>
                <td className="py-2 text-center">
                  {/* {goods.label} */}
                  item1
                </td>
                <td className="py-2 text-center w-[20%]">
                  <input
                    type="number"
                    // value={goods.quantity}
                    // onChange={(e) =>
                    //   handleQuantityChange(index, Number(e.target.value))
                    // }
                    min="1"
                    className="w-[32%] mx-auto rounded-md pl-1 border border-black"
                  />
                </td>
                <td className="py-2 text-center">
                  {/* {goods.rate} */}
                  100
                </td>
                <td className="py-2 text-center">
                  {/* {(
                        goods.rate *
                        goods.quantity *
                        (goods.cgst / 100)
                      ).toFixed(0)} */}
                  30
                </td>
                <td className="py-2 text-center">
                  {/* {(
                        goods.rate *
                        goods.quantity *
                        (goods.sgst / 100)
                      ).toFixed(0)} */}
                  63
                </td>
                <td className="py-2 text-center">
                  {/* {(
                        goods.rate *
                        goods.quantity *
                        (goods.igst / 100)
                      ).toFixed(0)} */}
                  25
                </td>
                <td className="py-2 text-center">
                  {/* {(
                        goods.rate * goods.quantity +
                        goods.rate *
                          goods.quantity *
                          (cgstInput + sgstInput + igstInput)
                      ).toFixed(0)} */}
                  226
                </td>

                <td className="py-2 text-center">
                  <span
                    className="bg-red-500 hover:bg-red-600 text-white hover:text-[#e7e6e6] duration-200 px-2 py-1 rounded-md cursor-pointer mx-1"
                    // onClick={() => handleDelete(index)}
                  >
                    Remove
                  </span>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
          {/* </div> */}

          {/* Total Amount */}
          {/* {listGoods.length > 0 && (
            <div className="w-[50%] mx-auto mt-4 border border-black rounded-md py-2 px-2">
              <p className="text-xl italic text-center">
                Total Amount: ₹ {totalAmount.toFixed(0)}
              </p>
              <p className="text-xl italic text-center">
                CGST ({cgstInput * 100}): ₹ {cgst.toFixed(0)}
              </p>
              <p className="text-xl italic text-center">
                SGST ({sgstInput * 100}): ₹ {sgst.toFixed(0)}
              </p>
              <p className="text-xl italic text-center">
                IGST ({igstInput * 100}): ₹ {igst.toFixed(0)}
              </p>
              <p className="text-xl italic text-center">
                Final Amount: ₹ {finalAmount.toFixed(0)}
              </p>
            </div>
          )} */}

          {/*======👇 Preview Created PO 👇====*/}
          {/* <div
            className={`w-[96%] flex justify-center mt-6 ${
              listGoods.length === 0 ? "hidden" : ""
            }`}
          >
            <button
              onClick={handleGenerateQuatationsId}
              to="/previewinvoicebill"
              className="bg-green-500 hover:bg-green-600 text-xl text-white hover:text-[#e7e6e6] duration-200 py-2 px-3 rounded-md font-semibold cursor-pointer"
            >
              Generate Quotation
            </button>
          </div> */}
        </form>
      </div>

      {/* Delete Confirmation Dilog Box */}
      {/* <div
        className={`w-full h-[130%] mt-16 fixed bg-[rgba(0,0,0,0.5)]  top-0 left-0 flex justify-center items-center ${
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
      </div> */}
      <ToastContainer />
    </>
  );
}

export default Quotation;
