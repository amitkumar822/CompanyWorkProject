import React from "react";
import {
  IndiaImage,
  SouthEastAsia,
  Eroup,
} from "../../data/photos/ExportImage";

function ServiceExplore() {
  return (
    <>
      <div className="w-[90%] h-[670px] rounded-lg mx-auto pt-10">
        <div className="w-full relative">
          <img
            className="w-full rounded-lg relative"
            src="https://img.freepik.com/premium-photo/mapping-global-connections-animated-world-map-with-glowing-links-concept-global-network-visualization-interactive-data-mapping-digital-world-connections-illuminated-globe-animation_918839-59212.jpg?w=1380"
            alt=""
          />

          <h1
            className=" relative bottom-0 top-[-450px] text-2xl text-white text-center flex justify-center items-center gap-4"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <hr className="w-[30px]" />
            PRODUCTS & SOLUTIONS
            <hr className="w-[30px]" />
          </h1>
          <div
            className="w-[80%] mx-auto flex justify-around items-center relative top-[-300px]"
            data-aos-duration="1000"
            data-aos="fade-up"
          >
            <div>
              <img
                className=" cursor-pointer hover:scale-105 ease-in-out duration-500"
                src={IndiaImage}
                alt="India"
              />
              <h1
                className="text-xl text-white text-center"
                data-aos-duration="1000"
                data-aos="fade-up"
              >
                India
              </h1>
            </div>
            <div>
              <img
                className=" cursor-pointer hover:scale-105 ease-in-out duration-500"
                src={SouthEastAsia}
                alt="South East Asia"
              />
              <h1
                className="text-xl text-white text-center"
                data-aos-duration="1000"
                data-aos="fade-up"
              >
                South East Asia
              </h1>
            </div>
            <div>
              <img
                className=" cursor-pointer hover:scale-105 ease-in-out duration-500"
                src={Eroup}
                alt="Eroup"
              />
              <h1
                className="text-xl text-white text-center"
                data-aos-duration="1000"
                data-aos="fade-up"
              >
                Eroup
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceExplore;
