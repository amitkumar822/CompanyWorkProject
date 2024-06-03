import React from "react";
import BannerPhotos from '../../../data/Photo/Banner/AnkusamBanner.jpeg'

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
          src={ BannerPhotos }
          alt=""
        />
      </div>
    </>
  );
}

export default Banner;
