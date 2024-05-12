import React from "react";

function MainSection() {
  return (
    <>
      <div className=" overflow-hidden">
        <header id="headerBanner">
          <div className="background-overlay w-full mx-auto h-screen flex items-center justify-center">
            <div>
              <h1 className="text-3xl text-white font-bold mt-50">
                Welcome to The{" "}
                <span className=" text-[yellow]">
                  Ankusam Engineering pvt ltd
                </span>
                ,<br /> Ower <span className=" text-[#4aff59]">services</span>{" "}
                are the world's best services
              </h1>
              <div className="w-full flex justify-center">
                <button className="text-xl font-semibold bg-blue-600 mt-6 text-white py-2 px-4 rounded-xl"
                data-aos-duration="1000"
                 data-aos="zoom-in"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default MainSection;
