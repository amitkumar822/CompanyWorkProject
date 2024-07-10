import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClosePo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LoginToken")) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <>
      <div className="mt-16 w-full mx-auto">
        <div className="w-[80%] mx-auto">
          <h1 className="text-4xl text-center mt-20 font-semibold underline">
            Closed Positions Page
          </h1>
          <p className="w-[70%] mx-auto text-xl text-center">
            Here you can find the latest closed positions in our company. Please
            check the company's website or contact our HR department for more
            information.
          </p>
        </div>
      </div>
    </>
  );
}

export default ClosePo;
