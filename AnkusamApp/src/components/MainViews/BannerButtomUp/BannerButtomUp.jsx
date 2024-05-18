import React from "react";
import { BannerButtomUpPhoto } from "../../../../public/Photo/PhotosExport";

function BannerButtomUp() {
  return (
    <div className="w-full md:mt-32 mt-14">
      <div
        className="md:w-[70%] px-2 mx-auto"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <img
          className="md:w-[70%] w-[90%] mx-auto"
          src={BannerButtomUpPhoto}
          alt=""
        />
      </div>
    </div>
  );
}

export default BannerButtomUp;
