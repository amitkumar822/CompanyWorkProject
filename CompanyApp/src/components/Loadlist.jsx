import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { IoSearch } from "react-icons/io5";
import { data } from "../data/LoadListData";



function Loadlist() {
  const columns = [
    {
      name: "SI No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "From State",
      selector: (row) => row.fromstate,
      sortable: true,
    },
    {
      name: "From City",
      selector: (row) => row.fromcity,
      sortable: true,
    },
    {
      name: "To State",
      selector: (row) => row.tostate,
      sortable: true,
    },
    {
      name: "TO City",
      selector: (row) => row.tocity,
      sortable: true,
    },
    {
      name: "Pickup Time",
      selector: (row) => row.pickuptime,
      sortable: true,
    },
    {
      name: "Type of vehicle Needed",
      selector: (row) => row.typeofvehicleneeded,
      sortable: true,
    },
    {
      name: "Package Weight(Kg)",
      selector: (row) => row.packageweight,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contactnumber,
      sortable: true,
    }
    
  ];

  const [loadRecord, setLoadRecord] = useState(data);

  const handleFilter = (event) => {
    const newData = data.filter((row) => {
      return row.fromstate.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setLoadRecord(newData);
  };

  return (
    <>
      <div className="w-full mx-auto mt-16">
        <div className="w-[95%] mx-auto border border-[red] p-5">
          <h1 className=" text-red-500 underline font-bold text-2xl text-center">
            Load List
          </h1>

          <div className="flex text-end items-center justify-end gap-1 relative">
            <span>Search</span>{" "}
            <input
              className="py-1 px-2 border border-[black] rounded-lg"
              type="text"
              placeholder="Search products..."
              onChange={handleFilter}
            />
            <IoSearch className=" absolute" />
          </div>

         <div className=" border border-[yellow] mt-2 cursor-pointer">
         <DataTable
            columns={columns}
            data={loadRecord}
            // data={data}
            fixedHeader
            pagination
          ></DataTable>
         </div>
        </div>
      </div>

      <div>

      </div>
    </>
  );
}

export default Loadlist;
