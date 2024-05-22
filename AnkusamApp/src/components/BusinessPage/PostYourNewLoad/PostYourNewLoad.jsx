import React, { useState } from "react";
import { countries } from "../../../data/StateCityData";

function PostYourNewLoad() {
  //👉 from state and city section
  const [state, setState] = useState("--state--");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("--city--");

  const changeState = (e) => {
    setState(e.target.value);
    const selectedState = countries
      .flatMap((country) => country.states)
      .find((state) => state.name === e.target.value);
    setCities(selectedState ? selectedState.cities : []);
    setCity("--city--");
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  // end from state and city section

  //👉 To state and city section
  const [toState, setToState] = useState("--state--");
  const [toCities, setToCities] = useState([]);
  const [toCity, setToCity] = useState("--city--");

  const toChangeState = (e) => {
    setToState(e.target.value);
    const selectedState = countries
     .flatMap((country) => country.states)
     .find((state) => state.name === e.target.value);
    setToCities(selectedState? selectedState.cities : []);
    setToCity("--city--");
  }

  const toChangeCity = (e) => {
    setToCity(e.target.value);
  }
  // end to state and city section

  return (
    <div className="w-full h-screen mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 py-12 px-4">
        {/* Left from part */}
        <div>
          <h1 className="md:text-3xl text-center">Where are you shipping from?</h1>
          <div className="flex justify-around">
            <div>
              <h2>SELECT STATE</h2>
              <select
                value={state}
                onChange={changeState}
                className="text-black"
              >
                <option>--state--</option>
                {countries
                  .flatMap((country) => country.states)
                  .map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <h2>CITY</h2>
              <select value={city} onChange={changeCity} className="text-black">
                <option>--city--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Right To part */}
        <div>
          <h1 className="md:text-3xl">Where are you shipping to?</h1>
          <div className="flex justify-around">
            <div>
              <h2>SELECT STATE</h2>
              <select
                value={toState}
                onChange={toChangeState}
                className="text-black"
              >
                <option>--state--</option>
                {countries
                 .flatMap((country) => country.states)
                 .map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <h2>CITY</h2>
              <select value={toCity} onChange={toChangeCity} className="text-black">
                <option>--city--</option>
                {toCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostYourNewLoad;
