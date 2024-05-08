import React, { useState } from "react";
import { countries } from "../data/StateCityData";
import { weightdata } from "../data/WeightData";



function Filtersection() {

  const [country, setCountry] = useState("--Country--");
  const [state, setState] = useState("--State--");
  const [city, setCity] = useState("--City--");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(countries.find(ctr => ctr.name === event.target.value).states)
  }

  const changeState = (event) => {
    setState(event.target.value);
    setCities(states.find(state => state.name === event.target.value).cities)
  }

  const changeCity = (event) => {
    setCity(event.target.value);
  }

  return (
    <>
      <div className=" w-full mt-20">
        <div className="w-[70%] mx-auto">
          <h1 className=" text-3xl font-semibold text-center">Data Filter</h1>

          <div className=" justify-content-center d-flex w-[70%] vh-100 bg-dark">
            <div className="mt-5">
              <h1 className=" text-blue-600">Filter by country</h1>
              <select className=" form-control w-full text-sm bg-[#F1F2F4]" value={country} onChange={changeCountry}>
                <option>--Country--</option>
                {countries.map(country => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-green-500">Filter by state</h1>
              <select className="form-control w-full text-sm bg-[#F1F2F4]" value={state.name} onChange={changeState}>
                <option value="">--State--</option>
                {states.map(state => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <br />
              <h1 className=" text-[#49796a]">Filter by city</h1>
              <select className="form-control w-full text-sm bg-[#F1F2F4]" value={city} onChange={changeCity}>
                <option value="city">--City--</option>
                {cities.map(city => (
                  <option key={city.name} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <br />
              <h1>Weight:</h1>
              <select className="form-control w-full text-sm bg-[#F1F2F4]">
                <option value="">Select one..</option>
                {weightdata.map(weight => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtersection;
