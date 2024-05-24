import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaTruckLoading } from 'react-icons/fa'
import { FaMobileRetro, FaTruckFast } from 'react-icons/fa6'
import { GiMineTruck } from 'react-icons/gi'
import { RiShieldUserFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function SlidebarProfileLeftSection() {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(!show);
  };

  return (
    <>
    <div className='fixed bg-yellow-400 text-[26px] w-[45px] h-[45px] rounded-full text-center font-bold mt-2 ml-4 transition-all duration-300 cursor-pointer z-[99] top-0'
    onClick={handleButtonClick}
    >X</div>

    <div className={` h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ${show ? '' : 'hidden'} fixed`}
    >
      {/* lg:flex hidden z-[2] */}
            <div className="min-w-[290px] h-screen mx-auto pt-4 relative bg-gray-400 ">
              
              <div className="md:w-[70px] mx-auto md:h-[70px] rounded-full flex items-center justify-center">
                <CgProfile className="md:text-[70px] text-[50px] text text-white absolute cursor-pointer" />
                <h1 className="md:text-xl font-bold relative md:pt-24 pt-16 cursor-pointer text-white hover:text-[yellow] hover:underline duration-200">
                  Profile
                </h1>
                <hr />
              </div>

              
              <div className="w-full mx-auto md:mt-12 mt-2 text-center whitespace-nowrap">
                
                <div>
                  <h1 className="md:text-lg flex items-center justify-center gap-1">
                    <RiShieldUserFill className="inline text-[#8dfc42] md:text-[20px]" />
                    <span className=" md:font-bold text-white uppercase">
                      UserId:
                    </span>
                    <span className=" md:font-semibold md:text-[18px] text-[yellow]">
                      C1245DK64
                    </span>
                  </h1>
                </div>
                
                <div>
                <h1 className="md:text-lg flex items-center justify-center gap-1">
                    <FaMobileRetro className="inline text-[#8dfc42] md:text-[20px]" />
                    <span className=" md:font-bold text-white uppercase">
                    Number:
                    </span>
                    <span className=" md:font-semibold md:text-[18px] text-[yellow]">
                    6123456789
                    </span>
                  </h1>
                  <hr className="mt-4" />
                </div>
                
                <div className="ml-[18%]">
                  <div className="mt-4 flex items-center">
                    <GiMineTruck className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="md:text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                      <Link to="postnewload"> Post new load</Link>
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                  
                  <div className="mt-4 flex items-center">
                    <FaTruckLoading className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="md:text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                      Check load
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                 
                  <div className="mt-4 flex items-center">
                    <FaTruckFast className="inline mr-2 text-[#8dfc42] text-[25px]" />
                    <h1 className="md:text-lg font-semibold capitalize cursor-pointer text-white hover:text-[yellow] hover:underline duration-300 hover:scale-105">
                      <Link to="checkavailablevehicles"
                      className="md:flex md:gap-1"
                      >
                        <h1 className=" md:block hidden">Check</h1> Available Vehicles
                      </Link>
                    </h1>
                  </div>
                  <hr className="w-full ml-auto border-dashed" />
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default SlidebarProfileLeftSection