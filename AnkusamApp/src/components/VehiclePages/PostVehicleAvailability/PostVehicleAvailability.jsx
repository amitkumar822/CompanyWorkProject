import React from "react";

function PostVehicleAvailability() {
  return (
    <>
      <div className="mt-16">
        <div className="w-full mx-auto mt-24 flex justify-around">
        <h1 className="w-full text-[7vw] text-center font-bold pt-4 md:hidden block text-yellow-500">Your <span className=" text-red-500">Vehicle</span> <span className="text-[#51CFED]"> Availabity</span></h1>
          {/* Vehicle part1 */}
          <div className=" hidden md:block">
            <div className=" mb-[200px]">
              {/* imgage rotate */}
              <img
                src="https://www.ankusamlogistics.com/assets/img/shape/orange-1.svg"
                alt="Rotating"
                className="w-[59px] animate-spin-slow mt-12"
              />
            </div>
            {/* vehicle part */}
            <div>
              <img src="https://www.ankusamlogistics.com/assets/img/slider/truck.svg" alt="" 
              className="-ml-[20%] w-[15vw]"
              />
            </div>
          </div>
          {/* Text part2 */}
          <div className="mt-20 uppercase hidden md:block">
            <h1 className="text-[7vw] font-bold text-center text-yellow-500">Your <br /> <span className=" text-red-500">Vehicle</span> <br /> <span className="text-[#51CFED]"> Availabity</span></h1>
          </div>
          {/* Box right part3 */}
          <div>
            {/* 1st img */}
            <div className="mt-12 hidden md:block">
              <img src="https://www.ankusamlogistics.com/assets/img/shape/berry-1.svg" alt=""
              className=" animate-spin-slow2 ml-20" 
              />
            </div>
            {/* 2st img */}
            <div className="mt-[200px] hidden md:block">
              <img src="https://www.ankusamlogistics.com/assets/img/slider/nav-box.svg" alt="" 
              className="animate-up-down mr-14 w-[12vw]"
              />
              <img src="https://www.ankusamlogistics.com/assets/img/shape/dot-a.svg" alt="" 
              className=" ml-[15vw] animate-up-down lg:block hidden"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default PostVehicleAvailability;
