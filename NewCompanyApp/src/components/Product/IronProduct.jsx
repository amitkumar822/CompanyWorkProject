import React from "react";
import { IronProductData } from "../../data/IronProductData";

function IronProduct() {
  return (
    <>
      <div className="w-[90%] mx-auto px-2 my-6 bg-white">
        <h1
          className="text-2xl font-bold py-4 mb-6 text-center underline uppercase text-red-600 shadow-md"
          data-aos-duration="1000"
          data-aos="flip-up"
        >
          Products
        </h1>
        <div className="grid grid-cols-4 pb-4">
          {IronProductData.map((data) => {
            return (
              <div key={data.id}>
                <div
                  className="bg-[#dde3e3] w-[304px] h-[290px] rounded-xl shadow-md shadow-gray-600"
                  data-aos="flip-left"
                  data-aos-duration="1000"
                >
                  <div className="w-[304px] rounded-xl h-[250px] overflow-hidden">
                    <img
                      className="w-[304px] rounded-xl h-[250px] hover:scale-105 cursor-pointer duration-200"
                      src={data.ImageUrl}
                      alt=""
                    />
                  </div>
                  <h1 className="text-lg text-center font-semibold cursor-pointer mt-1 hover:text-red-500 duration-200 hover:scale-105 uppercase">
                    {data.title}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default IronProduct;
