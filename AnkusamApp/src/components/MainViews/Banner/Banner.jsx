import React from "react";
import { BannerPhoto } from "../../../../public/Photo/PhotosExport";

function Banner() {
  return (
    <>
      <div
        className=" md:w-[65%] w-full px-2 mx-auto pt-20"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <img
          className=" border rounded-lg shadow-md"
          src={ BannerPhoto }
          alt=""
        />
      </div>
    </>
  );
}

export default Banner;
