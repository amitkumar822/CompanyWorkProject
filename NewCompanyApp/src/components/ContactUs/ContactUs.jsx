import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { GiRotaryPhone, GiClockwork } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";
import { GrContact } from "react-icons/gr";

function ContactUs() {
  return (
    <>
      <div className="md:w-full min-w-[580px] mx-auto bg-[#dde4e4] pb-12">
        <div className="w-[80%] mx-auto pt-11 pb-11">
          <div className="flex items-center gap-4 justify-center mb-10">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <GrContact className="text-3xl" />
          </div>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="w-[50%] min-w-[490px]"
            
          data-aos-duration="1000"
          data-aos="fade-right"
            >
              <div className="w-full md:min-w-[550px] pt-5 px-4 py-4 bg-[#eeeeee] rounded-xl shadow-md shadow-gray-800">
                <div className="flex gap-2 cursor-pointer">
                  <IoLocation className="text-6xl text-[#3466f9]" />
                  <div className="font-semibold">
                    <h1>Our Offices Address</h1>
                    <h2 className="text-[16px]">
                      3/204 E2, Venkittapuram, Near L&T Bye Pass Road,
                      Coimbatore Tamilnadu, India - 641062.
                    </h2>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer mt-5">
                  <FaTelegramPlane className="text-3xl text-[#3466f9]" />
                  <div className="text-lg font-semibold">
                    <h1>General Enquiries</h1>
                    <h2>designby@ankusamenggservices</h2>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer mt-5">
                  <GiRotaryPhone className="text-3xl text-[#3466f9]" />
                  <div className="text-lg font-semibold">
                    <h1>Quick Contact</h1>
                    <h2>+91 94873889706</h2>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer mt-5">
                  <GiClockwork className="text-3xl text-[#3466f9]" />
                  <div className="text-lg font-semibold">
                    <h1>Our Working Timing</h1>
                    <h2>Mon - Sun: 9:00 AM - 06:00PM</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#eeeeee] border shadow-md shadow-gray-800 rounded-lg py-4"
            data-aos-duration="1000"
            data-aos="fade-left"
            >
              <form className="w-[80%] mx-auto mt-5">
                <input
                  className="w-full my-2 px-4 py-2 rounded-lg shadow-md shadow-gray-600 outline-none"
                  type="text"
                  placeholder="YOUR NAME"
                  required
                />
                <input
                  className="w-full my-2 px-4 py-2 rounded-lg shadow-md shadow-gray-600 outline-none"
                  type="text"
                  placeholder="YOUR EMAIL"
                  required
                />
                <input
                  className="w-full my-2 px-4 py-2 rounded-lg shadow-md shadow-gray-600 outline-none"
                  type="text"
                  placeholder="YOUR CONTACT NO."
                  required
                />
                <input
                  className="w-full my-2 px-4 py-2 rounded-lg shadow-md shadow-gray-600 outline-none"
                  type="text"
                  placeholder="YOUR MESSAGE"
                  required
                />

                <button className="w-full my-2 bg-orange-400 px-4 py-1 font-bold rounded-lg text-2xl shadow-md shadow-gray-600">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Location or Map Section */}

        <div className="w-[80%] mx-auto m-2 shadow-md shadow-yellow-400 p-4 bg-white rounded-xl"
         data-aos="fade-up"
         data-aos-duration="1000"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-700 mb-2">Location</h1>
          </div>
          <iframe
          className="rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1957.9184477688316!2d77.07639189999999!3d11.050852599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85799063b9bd3%3A0x2e3aa9b482b0d7f2!2sAnkusam%20Engineering%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1715502062897!5m2!1sen!2sin"
            width="100%"
            height="450"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
