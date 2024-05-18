import React, { useState, useEffect } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";

function GoToUpBtn() {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
  
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    }, []);
  
    return (
      <div>
        <div className="fixed bottom-10 right-10">
          {isVisible && (
            <div 
              onClick={goToBtn} 
              
            >
              {/* GoToTop */}
              <FaCircleArrowUp className="text-[42px] cursor-pointer text-blue-500 hover:text-green-500 dark:bg-white rounded-[25px] bg-[#242222]  "/>
            </div>
          )}
        </div>
      </div>
    );
}

export default GoToUpBtn