import React, { useContext, useEffect, useRef } from "react";
import { RiMapPinUserFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import VehiLogUserContext from "../../../context/vehicleLoginUser/VehiLogUserContext";
import Typed from "typed.js"; // Importing Typed.js for typing animation
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // status percentage complete animation show
import "react-circular-progressbar/dist/styles.css"; // styles status percentage complete animation show
import { Link } from "react-router-dom";

function VehiProfile() {
  //👇 global variables access vehicle login user details
  const { vehiLogUser } = useContext(VehiLogUserContext);
  const typedRef = useRef(null);
  const typedRefPhone = useRef(null);

  const percentage = 10; // Assuming user has completed 70% of their profile

  // Function to determine color based on percentage
  const getColor = (percentage) => {
    const red = Math.floor((100 - percentage) * 2.55);
    const green = Math.floor(percentage * 2.55);
    return `rgb(${red}, ${green}, 0)`;
  };

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to The Ankusam Logistics.",
        "Our services are the world's best services.",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options); // Initializing typing animation
    const typedPhone = new Typed(typedRefPhone.current, options); // Initializing typing animation

    return () => {
      typed.destroy(); // Cleanup animation on component unmount
      typedPhone.destroy(); // Cleanup animation on component unmount
    };
  }, []);
  return (
    <>
      <div className="mt-16 w-full h-full">
        {/* First Banner Part */}
        <div className="bg-vehicleTruckImgProfile w-full bg-no-repeat bg-cover ">
          {/* Top image background section */}
          <div className="w-full md:h-[560px] h-[400px] mx-auto bg-[rgba(0,0,0,0.5)] text-white">
            <div className="w-[90%] mx-auto md:pt-28 pt-10 flex justify-around">
              <div className="md:w-[30%]">
                <h1 className="text-3xl uppercase font-bold underline text-[#3ef94d] md:block hidden">
                  <span className="text-[#f460f9]">User</span>{" "}
                  <span className="text-[#f95151]">Profile</span>
                </h1>
                <div className="md:mt-20 mt-4">
                  <h1 className="text-3xl font-bold text-[#3ef94d]">
                    Hello{" "}
                    {/* <span className="uppercase text-[yellow]">
                      {vehiLogUser?.name}
                    </span> */}
                  </h1>
                  <h1 className="md:text-3xl font-bold my-3">
                    {vehiLogUser?.userid}
                  </h1>
                  <p className="md:text-xl italic font-semibold text-[yellow]">
                    This is your <span className="text-[white]">profile</span>{" "}
                    page. You can see the{" "}
                    <span className="text-[#3ef94d]">progress</span> you've made
                    with your Profile.
                  </p>
                </div>
              </div>
              {/* Typed js Text or moving text */}
              <div className="md:w-[50%] md:text-4xl text-center font-serif mt-28 bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] -ml-[10%] md:block hidden">
                <span ref={typedRef} className=" font-bold"></span>
              </div>
              {/* User profile */}
              <div className="md:flex md:flex-col items-center">
                <RiMapPinUserFill className="md:text-7xl text-4xl text-[#86f860]" />
                <span className="uppercase text-[yellow] md:text-2xl font-bold">
                  {vehiLogUser?.name}
                </span>
                <h1 className="md:text-xl font-bold">{vehiLogUser?.userid}</h1>
              </div>
            </div>
            <div className="md:hidden mt-8 w-[80%] mx-auto text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3ef94d] via-[yellow] to-[red] text-xl font-semibold italic">
              <span ref={typedRefPhone}></span>
            </div>
          </div>
        </div>

        {/* Account Form Section */}
        <div className="w-[90%] mx-auto lg:mt-6 h-full flex justify-evenly lg:flex-row flex-col gap-4">
          {/* Form section */}
          <div className="lg:w-[70%] w-[100%] mx-auto md:mt-0 mt-4 bg-gray-300 border shadow-md shadow-gray-800 lg:order-1 order-2 rounded-lg">
            <div className="flex justify-between px-2 py-4 bg-white">
              <h1 className="md:text-2xl text-xl font-semibold">My Account</h1>
              <h1 className="md:text-2xl text-xl font-semibold bg-blue-500 hover:bg-blue-600 duration-300 px-2 py-1 rounded-lg text-white cursor-pointer">
                <Link to='/loaddatalist'>
                Home
                </Link>
              </h1>
            </div>
            <form action="" className="px-4 py-2">
              <div className="grid sm:grid-cols-2 md:mt-6">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">Name</h1>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Phone Number
                  </h1>
                  <input
                    type="text"
                    placeholder="Phone number"
                    required
                    maxLength={10}
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Aadhar Numbar
                  </h1>
                  <input
                    type="text"
                    placeholder="Adhar number"
                    maxLength={12}
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">Home Town</h1>
                  <input
                    type="text"
                    placeholder="Home Town"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div>
              <hr className="md:mt-12 mt-6 w-[94%]" />
              {/*👉 Vehicle and license details */}
              <h1 className="text-[17px] pt-2 font-semibold">
                Driving license Number
              </h1>
              <input
                type="text"
                placeholder="Driving license number.."
                required
                className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
              />
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 mt-4">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    License Type
                  </h1>
                  <select className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]">
                    <option value="">Select License Type</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Batch">Batch</option>
                  </select>
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Operator Type
                  </h1>
                  <select className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]">
                    <option value="">Select Operator Type</option>
                    <option value="Owner">Owner</option>
                    <option value="Driver">Driver</option>
                  </select>
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle Type
                  </h1>
                  <select className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]">
                    <option value="">Select Type of Vehicle</option>
                    <option value="Open Body">Open Body</option>
                    <option value="Closed Body">Closed Body</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 mt-10">
                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle register Number
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle register Number"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle Name
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle name"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle Capacity(tons)
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle capacity in ton"
                    required
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>

                <div>
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle make/model
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle make and model"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                  {/* <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle Mode
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle model"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  /> */}
                  <h1 className="text-[17px] pt-2 font-semibold">
                    Vehicle Length
                  </h1>
                  <input
                    type="text"
                    placeholder="Vehicle length"
                    className="py-2 px-4 rounded-lg md:w-[80%] w-[90%]"
                  />
                </div>
              </div>
              
              <hr className="md:mt-12 mt-6 w-[94%]" />

              {/* Photo Upload section */}
              <div className="mt-4 grid sm:grid-cols-2">
                {/* Vehicle photo */}
                <div className="">
                  <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-purple-600">
                    Upload Vehicle Photos
                  </h1>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2">
                        Vehicle Front photo
                      </span>
                      <span className=" text-pink-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2">
                        Vehicle Back photo
                      </span>
                      <span className=" text-pink-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2">
                        Vehicle Left Side photo
                      </span>
                      <span className=" text-pink-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-purple-600 mt-2">
                        Vehicle Right Side photo
                      </span>
                      <span className=" text-pink-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:mt-0 mt-6">
                  {/* Vehicle Registration Document photo */}
                  <div>
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-gray-600">
                      Upload Vehicle Reg. Document
                    </h1>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-gray-600 mt-2">
                        Reg. Front photo
                      </span>
                      <span className=" text-gray-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-gray-600 mt-2">
                        Reg. Back photo
                      </span>
                      <span className=" text-gray-600 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-blue-400">
                      Upload Vehicle Insurance
                    </h1>
                    <div className="grid grid-cols-1">
                      <span className="md:text-lg font-semibold text-blue-400 mt-2">
                        Vehicle Insurance photo
                      </span>
                      <span className=" text-blue-400 font-serif cursor-pointer"></span>
                      <input
                        type="file"
                        required
                        className="w-[200px] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:mt-14 mt-8 grid sm:grid-cols-2">
                {/* Upload Vehicle RC Book Section */}
                <div>
                  <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-fuchsia-500">
                    Upload Vehicle RC Book
                  </h1>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-fuchsia-500 mt-2">
                      Front RC Book photo
                    </span>
                    <span className=" text-fuchsia-600 font-serif cursor-pointer"></span>
                    <input
                      type="file"
                      required
                      className="w-[200px] cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-fuchsia-600 mt-2">
                      Back RC Book photo
                    </span>
                    <span className=" text-fuchsia-600 font-serif cursor-pointer"></span>
                    <input
                      type="file"
                      className="w-[200px] cursor-pointer"
                    />
                  </div>

                  {/* Pollution */}
                  <h1 className="md:text-[25px] mt-4 text-[20px] pt-2 font-semibold text-[#4a8fc3]">
                    Upload Pollution Certification
                  </h1>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-[#4a8fc3] mt-2">
                      Pollution Certification (
                      <span className="text-[green]">Optional</span>)
                    </span>
                    <span className=" text-[#4a8fc3] font-serif cursor-pointer"></span>
                    <input type="file" className="w-[200px] cursor-pointer" />
                  </div>
                </div>

                {/* Adhar card section */}
                <div className="md:mt-0 mt-6">
                  <h1 className="md:text-[25px] text-[20px] pt-2 font-semibold text-yellow-600">
                    Upload Adhar Card Document
                  </h1>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-yellow-600 mt-2">
                      Adhar Front photo
                    </span>
                    <span className=" text-yellow-600 font-serif cursor-pointer"></span>
                    <input
                      type="file"
                      required
                      className="w-[200px] cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-1">
                    <span className="md:text-lg font-semibold text-yellow-600 mt-2">
                      Adhar Back photo
                    </span>
                    <span className=" text-yellow-600 font-serif cursor-pointer"></span>
                    <input
                      type="file"
                      required
                      className="w-[200px] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Button Section */}
              <div className="w-full mx-auto text-center mt-10">
                <button
                  type="submit"
                  className="w-[120px] my-10 text-white py-3 ml-auto rounded-lg text-2xl shadow-md shadow-[yellow] font-bold bg-gradient-to-r from-fuchsia-400 to-red-500 hover:from-pink-500 hover:to-yellow-500"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>

          {/* Profile status */}
          <div className="border lg:w-[30%] w-full min-h-[295px] md:mt-0 mt-4 bg-gray-300 mx-auto shadow-md shadow-gray-800 rounded-lg px-3 pt-4 lg:order-2 order-1">
            <h1 className="text-xl font-semibold flex items-center gap-1">
              <CgProfile className="text-[green] text-2xl" />
              Profiles status
            </h1>
            <div className="md:w-48 md:h-48 w-40 h-40 mx-auto mt-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: getColor(percentage),
                  trailColor: "white",
                })}
              />
              <h1 className="text-lg text-center font-semibold mt-2 text-[#4961e9]">
                Profile completion
              </h1>
            </div>

            {/* Profile Text part */}
            <div className="w-full md:mt-20 mt-14 lg:block hidden">
              <h1 className="text-[20px] font-semibold">
                🍁Welcome to Ankusam Logistics🍁
              </h1>
              <div className="text-lg mt-2">
                <h1 className=" font-semibold pt-3">
                  Your Trusted Partner in Indian Logistics Solutions
                </h1>
                <h1 className="mt-2 text-[19px]">
                  At Ankusam Logistics, we specialize in providing efficient,
                  reliable, and innovative logistics services tailored to meet
                  your unique needs within India. Our comprehensive solutions
                  ensure your goods are transported safely and on time, every
                  time.
                </h1>
                <h1 className="text-xl font-semibold my-4">Why Choose Us?</h1>
                <ul className="list-disc ml-4">
                  <li>
                    <span className="font-semibold">Nationwide Reach:</span>{" "}
                    With an extensive network across India, we deliver seamless
                    domestic shipping solutions.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Customer-Centric Approach:
                    </span>{" "}
                    Our dedicated team works around the clock to provide
                    personalized service and support.
                  </li>
                  <li>
                    <span className="font-semibold">Advanced Technology:</span>{" "}
                    Leveraging state-of-the-art technology to optimize logistics
                    operations and provide real-time tracking.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Sustainability Commitment:
                    </span>{" "}
                    Committed to eco-friendly practices and reducing our carbon
                    footprint in the logistics industry.
                  </li>
                </ul>
                <h1 className="text-xl font-semibold my-4">Our Services</h1>
                <ul className="list-disc ml-4">
                  <li>
                    <span className="font-semibold">Freight Forwarding:</span>{" "}
                    Expert handling of road freight to ensure your cargo reaches
                    its destination efficiently.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Supply Chain Management:
                    </span>{" "}
                    Comprehensive solutions to optimize your entire supply chain
                    process.
                  </li>
                </ul>
                <div className="xl:block hidden">
                  <h1 className="text-xl font-semibold my-4">Get in Touch</h1>
                  <h1>
                    <span className=" font-bold text-[#d455da] text-[22px]">
                      R
                    </span>
                    eady to streamline your logistics operations? Contact us
                    today to learn how Ankusam Logistics can drive your business
                    forward within India.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehiProfile;
