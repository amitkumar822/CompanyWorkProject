import React from "react";
import BannerButtomUp from "../BannerButtomUp/BannerButtomUp";
import Banner from "../Banner/Banner";

function ContactUsPage() {
  const AddressDetails = [
    {
      id: 1,
      state: "Tamilnadu",
      address:
        "Ankusam Logistics 3/204 E2, Venkittapuram, Near L&T ByPass Road, Coimbatore Tamilnadu, India - 641062",
    },
    {
      id: 2,
      state: "Kerala",
      address:
        "Ankusam Logistics 39/2475-BI, Suite 748, LR Towers, SJRRA 104, South Janatha Road, Palarivattom, Kochi, Kerala 682025",
    },
    {
      id: 3,
      state: "Delhi",
      address:
        "Ankusam Logistics Vikas Vihar, Rohni sector 22, New Delhi , India",
    },
  ];

  return (
    <div>
      <Banner />
      <div>
        <div className=" mt-12">
          <h1 className="md:w-[350px] mx-auto text-2xl text-red-500 font-semibold text-center">
            Contact us
          </h1>
          <h1 className="md:w-[350px] w-[200px] mx-auto md:text-7xl text-6xl font-bold text-center">
            Have a Cool Project? Get in touch!
          </h1>
        </div>

        <div className="W-full mx-auto grid md:grid-cols-2 grid-cols-1">
          {/* contact us section */}
          <div className="md:w-[40%] w-[90%] mx-auto mt-12">
            <h1 className="text-2xl font-bold text-[#5f5858]">CONTACT US</h1>

            {AddressDetails.map((data) => (
              <div className="w-full text-[#665b5b] mt-10" key={data.id}>
                <h1 className="text-xl font-semibold">{data.state}</h1>
                <h2 className="text-lg font-serif">{data.address}</h2>
              </div>
            ))}

            <div className="mt-12 text-[#5f5858]">
              <h1 className="text-2xl font-bold">WANT TO SAY HELLO?</h1>
              <h1 className="text-md my-2 font-semibold cursor-pointer">
                enquire@ankusamlogistics.com
              </h1>
              <h1 className="text-md font-semibold cursor-pointer">
                <a href={`tel:${94873889705}`}>+91 94873889705</a>
                <br />
                <a href={`tel:${94873889706}`}>+91 94873889706</a>
              </h1>
              <h1 className="text-md mt-4 font-semibold cursor-pointer">
                Client work with us
              </h1>
            </div>

            <div className="mt-12 text-[#5f5858]">
              <h1 className=" text-3xl font-bold">
                Over <span className=" text-red-600">5,000+</span> Client all
                over the world.
              </h1>
              <img
                className="mt-6"
                src="https://www.ankusamlogistics.com/assets/img/contact/current-loc-1.svg"
                alt=""
              />
            </div>
          </div>

          {/* map section */}
          <div>
            <div className=" mt-36 overflow-hidden mx-4 mr-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d978.9595061879909!2d77.076428!3d11.050768!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85799063b9bd3%3A0x2e3aa9b482b0d7f2!2sAnkusam%20Engineering%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1715198191393!5m2!1sen!2sin"
                width="500"
                height="700"
                // Style="border:0;"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <BannerButtomUp />
    </div>
  );
}

export default ContactUsPage;
