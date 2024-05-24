import React from "react";

function AvailableVehicleCheck() {
  return (
    <>
      <div className="w-full h-screen mx-auto pt-4 text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <h1 className="text-[1.6vw] text-center font-semibold underline text-black">AVAILABLE VEHICLE LIST</h1>
        <div className="mt-2 overflow-y-auto">
          <table className="w-[95%] mx-auto border border-black">
            <thead className=" border-b border-black text-[1.2vw] whitespace-nowrap">
              <tr>
                <th>SI NO</th>
                <th>User Id</th>
                <th>Phone</th>
                <th>From State</th>
                <th>From City</th>
                <th>To State</th>
                <th>To City</th>
                <th>Vehicle capacity in tons</th>
                <th>Vehicle length</th>
                <th>Vship</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>V240044</td>
                    <td>24152412</td>
                    <td>kerala</td>
                    <td>alappuzha</td>
                    <td>kerala</td>
                    <td>alappuzha</td>
                    <td>12</td>
                    <td>21</td>
                    <td>Open Body</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>V250044</td>
                    <td>23252412</td>
                    <td>andhra_pradesh</td>
                    <td>alappuzha</td>
                    <td>kerala</td>
                    <td>alappuzha</td>
                    <td>12</td>
                    <td>21</td>
                    <td>Open Body</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AvailableVehicleCheck;
