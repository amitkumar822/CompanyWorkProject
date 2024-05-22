import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function BusinessLoginPage() {
  const typedRef = useRef(null); // Reference for the typing animation

  useEffect(() => {
    const options = {
      string: [
        "Welcome to Ankusam Logistics",
        "We Prefer to choose Top Rated Drivers",
      ],
      typeSpeed: 40,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options); // Initializing typing animation

    return () => {
      typed.destroy(); // Cleanup animation on component unmount
    };
  }, []);
  return (
    <>
      <div className=" mt-16 w-[80%] mx-auto">
        {/* <h1 className="text-3xl bg-orange-500 text-center">
          Business Login Page
        </h1> */}
        <div className=" mt-20 text-center mx-auto text-3xl font-bold text-white border md:block hidden rounded-lg p-5 bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
            <span ref={typedRef}></span>
        </div>
        {/* Business all detail */}
        <div>
            
        </div>
      </div>
    </>
  );
}

export default BusinessLoginPage;
