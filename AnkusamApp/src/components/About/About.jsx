import React from "react";
import { truckGoods } from "./photo/ExportImage";
import { GiMineTruck } from "react-icons/gi";
import { FaPersonBooth } from "react-icons/fa";
import { FaTruckFast, FaTruckPlane } from "react-icons/fa6";

function About() {
  return (
    <>
      <div className="mt-16  bg-gradient-network text-white overflow-hidden">
        <div className="bg-[rgba(0,0,0,0.7)] py-4">
          <VehicleAndBoxAnimationFirstPart />
          <VehicleAndTextSecondPart />
          <div className="md:flex justify-between hidden">
            <img
              className=" animate-left-right"
              src="https://www.ankusamlogistics.com/assets/img/chose/big-truck.svg"
              alt=""
            />
            <img
              className="transformtransform scale-x-[-1]"
              src="https://www.ankusamlogistics.com/assets/img/chose/big-truck.svg"
              alt=""
            />
          </div>
          <OurVisionAndMission />
          <OnePlaceToManage />
          <OurWorkProcess />
          <div className="w-[80%] mx-auto lg:mt-20 mt-10">
            <img className="mt-4 rounded-2xl" src="https://www.ankusamlogistics.com/assets/img/services/1.jpg" alt=""
            data-aos="flip-left"
            data-aos-duration="1000"
            />
            <img className="mt-4 rounded-2xl" src="https://www.ankusamlogistics.com/assets/img/services/2.jpg" alt=""
            data-aos="flip-right"
            data-aos-duration="1000"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const VehicleAndBoxAnimationFirstPart = () => {
  return (
    <>
      {/*👉 Top Upper screen part */}
      <div className="w-full mx-auto flex justify-around">
        <div className="w-full md:text-[7vw] text-[21px] text-center font-bold pt-4 md:hidden block text-yellow-500">
          <h1 className="text-center text-2xl font-bold italic text-orange-500">
            👇About Us👇
          </h1>
          <h1>
            <span className="text-[#51CFED]">"</span>We carry your
            <span className=" text-green-500"> Trust,</span>
            <span className="text-[#51CFED]">
              {" "}
              Not just load<span className="text-yellow-500">"</span>
            </span>
          </h1>
          <div className="w-[220px] border mx-auto shadow-md"></div>
        </div>
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
            <img
              src="https://www.ankusamlogistics.com/assets/img/slider/truck.svg"
              alt=""
              className="-ml-[20%] w-[15vw] animate-left-right"
            />
          </div>
        </div>
        {/* Text part2 */}
        <div className="mt-20 uppercase hidden md:block">
          <h1 className="text-center text-2xl font-bold italic text-orange-500">
            👇About Us👇
          </h1>
          <h1 className="text-[6vw] font-bold text-center text-yellow-500">
            <span className="text-[#51CFED]">"</span>We carry your <br />
            <span className=" text-green-500">Trust,</span>
            <br />{" "}
            <span className="text-[#51CFED]">
              {" "}
              Not just load<span className="text-yellow-500">"</span>
            </span>
          </h1>
        </div>
        {/* Box right part3 */}
        <div>
          {/* 1st img */}
          <div className="mt-12 hidden md:block">
            <img
              src="https://www.ankusamlogistics.com/assets/img/shape/berry-1.svg"
              alt=""
              className=" animate-spin-slow2 ml-20"
            />
          </div>
          {/* 2st img */}
          <div className="mt-[200px] hidden md:block">
            <img
              src="https://www.ankusamlogistics.com/assets/img/slider/nav-box.svg"
              alt=""
              className="animate-up-down mr-14 w-[12vw]"
            />
            <img
              src="https://www.ankusamlogistics.com/assets/img/shape/dot-a.svg"
              alt=""
              className=" ml-[15vw] animate-up-down lg:block hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const VehicleAndTextSecondPart = () => {
  return (
    <>
      <div className="w-full mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 lg:mt-24 gap-6">
          <div className="flex justify-center lg:justify-start "
         data-aos="fade-right"
         data-aos-duration="2000"
         >
            {/* Vehicle image */}
            <div>
              <img
                className="w-[60vw] lg:w-[25vw] animate-left-right"
                src={truckGoods}
                alt="Vehicle"
              />
            </div>
            <img
              className="w-[30vw] lg:w-[15vw] mt-8 lg:mt-32 lg:block hidden animate-up-down-dot"
              src="https://www.ankusamlogistics.com/assets/img/shape/dot-b.svg"
              alt="Decoration"
            />
          </div>
          {/* Text Left Part */}
          <div
         data-aos="fade-left"
         data-aos-duration="2000"
         >
            <h1 className="text-2xl lg:text-4xl font-bold italic text-green-500">
              Why should you choose us
            </h1>
            <div className="text-lg lg:text-2xl mt-5 lg:mt-8 italic leading-snug space-y-5">
              <p>
                Transportation and logistics is like the heart of a nation,
                pumping raw materials and finished goods to and from different
                parts of the country and world. Effective planning and
                connectivity reduce the cost of material transport, save time,
                and ensure availability at the right time.
              </p>
              <p>
                Ankusam Logistics (ALL) is a new division of Ankusam Group of
                Companies, started in 2020. Ankusam Logistics Limited is a
                subsidiary of Ankusam Engineering Pvt Ltd, located in the
                Manchester of South India, Coimbatore, with a vision and
                mission.
              </p>
              <p>
                At Ankusam Logistics Limited, we ensure vehicles are available
                at competitive prices for safe and quick movement. We provide a
                digital platform connecting clients and drivers (service
                providers) to avoid brokerage.
              </p>
              <p>
                Conventional logistics operate with warehouses for part load and
                full load systems. At Ankusam Logistics Limited (ALL), by
                eliminating intermediate brokerage and providing return loads,
                we make transport cheaper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OurVisionAndMission = () => {
  return (
    <>
      {/* Vision section */}
      <div className="w-[80%] mx-auto grid lg:grid-cols-2">
        <div className="flex justify-center items-center lg:order-1 order-2"
         data-aos="fade-right"
         data-aos-duration="1000"
        >
          <div>
            <h1 className="md:text-7xl text-3xl md:mt-0 mt-10 font-bold italic uppercase text-fuchsia-500">
              Our Vision
            </h1>
            <p className="text-3xl italic md:mt-10 mt-4">
              To be first choice of customer for material movement in land,
              water and air.
            </p>
          </div>
        </div>

        <div className="md:mt-0 mt-10 lg:order-2 order-1">
          <img
            src="https://img.freepik.com/free-vector/vision-statement-concept-illustration_114360-7576.jpg?t=st=1716894657~exp=1716898257~hmac=d0f3400bd2bfef1b22e9329b335752a8618ff4b7b7324cfa3c502ed3be421d97&w=740"
            alt="vision"
            className="md:w-[400px] w-[300px] mx-auto rounded-full"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
        </div>
      </div>

      {/* Mission section */}
      <div className="w-[80%] mx-auto mt-14 grid lg:grid-cols-2">
        <div className=""
         data-aos="fade-right"
         data-aos-duration="1000"
        >
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-international-trade_23-2149166406.jpg?t=st=1716896073~exp=1716899673~hmac=113a71fa40112ecae7a92a9563cd7198199874dac87a434b4b06c77cae71fcce&w=740"
            alt=""
            className="md:w-[400px] w-[300px] mx-auto rounded-full"
          />
        </div>

        <div className="flex items-center justify-center md:mt-0 mt-10"
        data-aos="fade-left"
        data-aos-duration="1000"
        >
          <div>
            <h1 className="md:text-7xl text-3xl font-bold italic uppercase text-[yellow]">
              Mission
            </h1>
            <p className="text-3xl mt-4 italic">
              Using cutting edge technology for seamless collection and delivery
              of material
            </p>
            <p className="text-3xl mt-4 italic">
              Adding value in technology to reduce the transportation cost.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const OnePlaceToManage = () => {
  return (
    <>
      <div className="w-[80%] mx-auto grid lg:grid-cols-2 md:mt-16 mt-10">
        <div>
          <h1 className="md:text-6xl text-3xl font-bold italic text-[#7cef59]"
          data-aos="fade-down"
          data-aos-duration="1000"
          >
            One Place to Manage all your shipments and tasks
          </h1>
          <h2 className="text-2xl italic mt-4"
          data-aos="fade-up"
          data-aos-duration="1000"
          >
            We have the capability to tailor solutions for individual businesses
            by moulding our comprehensive range of services.
          </h2>
        </div>
        <div className="lg:mt-0 mt-6 lg:text-3xl flex lg:flex-col items-center gap-4">
          <p
         data-aos="fade-right"
         data-aos-duration="1000"
         >
            <h1 className=" text-pink-500 font-bold">100k+</h1>
            <h1>Brands Trust</h1>
            <h1>Brands that trust opic</h1>
          </p>
          <p
         data-aos="fade-left"
         data-aos-duration="1000"
         >
            <h1 className=" text-pink-500 font-bold">500+</h1>
            <h1>Vechile</h1>
            <h1>Registered</h1>
          </p>
          <p
         data-aos="fade-right"
         data-aos-duration="1000"
         >
            <h1 className=" text-pink-500 font-bold">1100+</h1>
            <h1>Loads per day</h1>
            <h1>More worldwide user</h1>
          </p>
        </div>
      </div>
    </>
  );
};

const OurWorkProcess = () => {
  return (
    <div className="w-[80%] mx-auto lg:mt-20 mt-10">
      <div className="text-center">
        <h1 className="lg:text-4xl text-3xl text-orange-400 italic"
         data-aos="fade-left"
         data-aos-duration="1000"
         >
          Our Work Process
        </h1>
        <p className="lg:text-3xl text-2xl italic"
         data-aos="fade-right"
         data-aos-duration="1000"
         >
          The way our company manages Transport and Logistics
        </p>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 text-center lg:mt-16 mt-8">
        <div className="flex flex-col items-center">
          <div
         data-aos="fade-right"
         data-aos-duration="1000"
         >
         <GiMineTruck className="md:text-8xl text-5xl text-[yellow]" />
         </div>
          <p className="md:text-2xl italic">Customer post load</p>
        </div>
        <div className="flex flex-col items-center">
        <div
         data-aos="fade-left"
         data-aos-duration="1000"
         >
          <FaPersonBooth className="md:text-8xl text-5xl text-[yellow]" />
          </div>
          <p className="md:text-2xl italic">We review and verify load</p>
        </div>
        <div className="flex flex-col items-center">
        <div
         data-aos="fade-right"
         data-aos-duration="1000"
         >
          <FaTruckFast className="md:text-8xl text-5xl text-[yellow]" />
          </div>
          <p className="md:text-2xl italic">Drivers give quote for load</p>
        </div>
        <div className="flex flex-col items-center">
        <div
         data-aos="fade-left"
         data-aos-duration="1000"
         >
          <FaTruckPlane className="md:text-8xl text-5xl text-[yellow]" />
          </div>
          <p className="md:text-2xl italic">Chose the affodable vehicle</p>
        </div>
      </div>
    </div>
  );
};

export default About;
