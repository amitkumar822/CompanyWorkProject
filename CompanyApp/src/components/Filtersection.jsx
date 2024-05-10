import React, { useEffect, useRef, useState } from "react";
import { countries } from "../data/StateCityData";
import { weightdata } from "../data/WeightData";
import Typed from "typed.js";


function Filtersection() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to The Ankusam Engineering pvt ltd",
        "Ower services are the world's best services",
        "Over 5,000+ Clients all over the world",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  const [country, setCountry] = useState("--Country--");
  const [state, setState] = useState("");
  const [city, setCity] = useState("--City--");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  console.log("State: ", state);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(countries.find((ctr) => ctr.name === event.target.value).states);
  };

  const changeState = (event) => {
    setState(event.target.value);
    setCities(states.find((state) => state.name === event.target.value).cities);
  };

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div className=" w-full mt-20">
        <div className="w-[80%] mx-auto">
          <h1 className=" text-3xl font-semibold text-center">Data Filter</h1>

          <div className="w-[100%] mx-auto gap-14 order-1 justify-content-center d-flex vh-100 bg-dark grid lg:grid-cols-2 grid-cols-1">
            <div className="min-w-[310px] mt-5 ">
              <h1 className=" text-blue-600">Filter by country</h1>
              <select
                className=" form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={country}
                onChange={changeCountry}
              >
                <option>--Country--</option>
                {countries.map((country,index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-green-500">Filter by state</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={state.name}
                onChange={changeState}
              >
                <option value="">--State--</option>
                {states.map((state,index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-[#49796a]">Filter by city</h1>
              <select
                className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer"
                value={city}
                onChange={changeCity}
              >
                <option value="city">--City--</option>
                {cities.map((city,index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <br />
              <h1>Weight:</h1>
              <select className="form-control w-full text-sm bg-[#F1F2F4] cursor-pointer">
                <option value="">Select one..</option>
                {weightdata.map((weight,index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>

            {/* Animation Text */}
            <div className="mt-5 w-[350px] mx-auto text-3xl font-bold text-white border md:block hidden rounded-lg p-5 bg-gradient-to-r from-purple-500 to-yellow-500 shadow-md shadow-yellow-400">
              <span ref={typedRef}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtersection;
