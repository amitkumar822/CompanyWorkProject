import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import GoToUpBtn from "../GoToUpButton/GoToUpBtn";
import { Link, NavLink } from "react-router-dom";
// import GoToUpBtn from "./GoToUpBtn";

function Footer() {
  return (
    <div className=" w-full mt-20">
      <div className="w-[80%] mx-auto grid md:grid-cols-2 grid-cols-1 mb-10">
        <div className=" grid xl:grid-cols-2 grid-cols-1">
          <div className="w-[255px]" data-aos="zoom-in">
            <div className="flex gap-2">
              <FaFacebook className="text-3xl text-red-500 hover:text-green-500" />
              <IoLogoInstagram className="text-3xl text-red-500 hover:text-green-500" />
            </div>
            <div className="mt-2">
              <h1 className="text-[20px] font-bold text-[#41b45c] cursor-pointer hover:text-[#4c6752]">
                Ankusam logistics
              </h1>
              <h2 className="text-[17px] font-semibold text-[#5c5050] cursor-pointer">
                <FaLocationDot className="inline mr-1 text-orange-600 text-xl" />
                3/204 E2, Venkittapuram, Near L&T Bypass Road, Coimbatore
                Tamilnadu, India - 641062.
              </h2>
              <h3 className="mt-4 text-[#634f63] cursor-pointer">
                <a href={`tel:${94873889706}`}>+91 94873889706</a>
              </h3>
            </div>
          </div>

          <div className="w-[240px" data-aos="zoom-in">
            <h1 className=" text-3xl font-bold text-orange-500 cursor-pointer hover:text-orange-600">
              Quick Links
            </h1>
            <ul>
              <li className="text-lg pt-2 cursor-pointer hover:text-orange-700 font-semibold text-orange-900">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-[#3c61ab]" : undefined
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="text-lg pt-2 cursor-pointer hover:text-orange-700 font-semibold text-orange-900">
                <NavLink
                  to="/businesssignup"
                  className={({ isActive }) =>
                    isActive ? "text-[#3c61ab]" : undefined
                  }
                >
                  Business People
                </NavLink>
              </li>
              <li className="text-lg pt-2 cursor-pointer hover:text-orange-700 font-semibold text-orange-900">
                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    isActive ? "text-[#3c61ab]" : undefined
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* Location Part */}
        <div data-aos="zoom-in">
          <h1 className=" text-2xl font-semibold text-pink-500 flex items-center">
            <FaLocationDot />
            Location
          </h1>
          <div className=" overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1957.9190123759818!2d77.076428!3d11.050768!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85799063b9bd3%3A0x2e3aa9b482b0d7f2!2sAnkusam%20Engineering%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1715161803057!5m2!1sen!2sin"
              width="350"
              height="270"
              // Style="border:0;"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <GoToUpBtn />
      <div className="w-[70%] mx-auto mt-6 pb-10 mb-10">
        <hr />
        <h1
          className="font-semibold md:text-xl"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
        >
          © Designed and maintained by Ankusam Engineering Services
        </h1>
        
        {/* <a
          href="https://www.freevisitorcounters.com/en/home/stats/id/1162081"
          target="_blank"
          className="w-full mx-auto flex flex-col items-center mt-6"
        >
          <span className="text-blue-600 font-semibold">Free Counters</span>
          <img
            src="https://www.freevisitorcounters.com/en/counter/render/1162081/t/5"
            alt=""
          />
        </a> */}
      </div>
    </div>
  );
}

export default Footer;