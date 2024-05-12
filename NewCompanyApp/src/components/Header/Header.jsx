import React, { useEffect, useState } from 'react'
import { IoMdMenu , IoIosArrowDown, IoMdContact } from "react-icons/io";
import './header.css'


function Header() {

    const [isHoveringCategories, setIsHoveringCategories] = useState(false)
    const handleMouseOverCategories = () => setIsHoveringCategories(true)
    const handleMouseLeaveCategories = () => setIsHoveringCategories(false);

    const [isHoveringServices, setIsHoveringServices] = useState(false)
    const handleMouseOverServices = () => setIsHoveringServices(true)
    const handleMouseLeaveServices = () => setIsHoveringServices(false);

    // Page scroll after header background color changes

    const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
    <div className='w-full mx-auto fixed z-[1]'>
        <header className=''>
            <nav className={`w-full mx-auto flex justify-around text-white py-6 gap-6 ${
           sticky
             ? "w-full customBackground mx-auto sticky-navbar shadow-md duration-300 transition-all ease-in-out "
             : ""
         }`}>
                <div>
                    <img className='w-[50px] cursor-pointer' src="https://www.ankusamlogistics.com/include/assest/images/header_logo_one.svg" alt="logo" />
                </div>
                {/* <div> */}
                    <ul className='flex gap-4 uppercase font-bold text-[18px] items-center'>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300'>
                            <IoMdMenu className='text-[25px]' />
                        </li>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300'>
                            Home
                        </li>
                        <li className={`cursor-pointer hover:text-gray-300 duration-300 flex items-center relative`}
                            onMouseOver={handleMouseOverCategories}
                            onMouseLeave={handleMouseLeaveCategories}
                        >
                            Categories
                            <IoIosArrowDown className={`text-[20px] ${isHoveringCategories ? 'rotate-180 duration-500' : ''}`} />
                            {isHoveringCategories && <CategoryiesHover />}
                        </li>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300'>
                            Products
                        </li>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300'>
                            AboutUs</li>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300'>
                            Gallery
                        </li>
                        <li className={`cursor-pointer hover:text-gray-300 duration-300 flex items-center relative`}
                        onMouseOver={handleMouseOverServices}
                        onMouseLeave={handleMouseLeaveServices}
                        >
                            Services
                            <IoIosArrowDown className={`text-[20px] ${isHoveringServices ? 'rotate-180 duration-500' : ''}`} />
                            {isHoveringServices && <ServicesHover/>}
                            
                        </li>
                        <li className=' cursor-pointer hover:text-gray-300 duration-300 flex items-center gap-1'>
                            Contact
                            <IoMdContact className='text-[20px]' />
                        </li>
                    </ul>
                {/* </div> */}
            </nav>
        </header>
    </div>
    </>
  )
}

const CategoryiesHover = () => {
    return (
        <>
        <div className=' absolute top-7 text-[16px] bg-white text-black rounded-lg shadow-md shadow-yellow-500 '>
            <section>
                <div className='flex justify-center items-center capitalize'>
                    <ul>
                        <li className=' font-semibold hover:shadow-md rounded-md cursor-pointer mb-1 px-8 duration-200 py-1 mt-4'>Iron</li>
                        <li className=' font-semibold hover:shadow-md  cursor-pointer mb-1 px-8 duration-200 py-1'>Moter</li>
                        <li className=' font-semibold hover:shadow-md rounded-md cursor-pointer mb-2 px-8 duration-200 py-1 '>welding</li>
                    </ul>
                </div>
            </section>
        </div>
        </>
    )
}


const ServicesHover = () => {
    return (
        <>
        <div className='w-[200px] absolute top-7 text-[16px] bg-white text-black rounded-lg shadow-md shadow-yellow-500 '>
            <section>
                <div className='flex justify-center items-center capitalize'>
                    <ul>
                        <li className=' font-semibold hover:shadow-md rounded-md cursor-pointer mb-1 px-8 duration-200 py-1 mt-4'>Automobiles</li>
                        <li className=' font-semibold hover:shadow-md rounded-md cursor-pointer mb-1 px-8 duration-200 py-1'>Recyling Machines</li>
                        <li className=' font-semibold hover:shadow-md rounded-md cursor-pointer mb-2 px-8 duration-200 py-1'>Cutting Machines</li>
                    </ul>
                </div>
            </section>
        </div>
        </>
    )
}

export default Header