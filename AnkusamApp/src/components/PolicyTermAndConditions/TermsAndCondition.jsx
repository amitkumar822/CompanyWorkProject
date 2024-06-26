import React from "react";

function TermsAndCondition() {
  return (
    <div className="w-full mt-16">
      <div className="w-[80%] mx-auto bg-gray-200 px-4 pb-10 rounded-md shadow-sm shadow-pink-500">
        <h1 className="text-4xl text-center mt-20 italic font-semibold underline">
          Welcome to Terms And Conditions Page
        </h1>
        <h1 className="w-[70%] mx-auto text-xl text-center font-semibold mt-10 italic">
          The following Terms & Conditions shall apply to customers utilising
          the Services offered by the Company for the hiring of vehicles.
        </h1>
        <ol className="list-decimal leading-10 pl-10 text-[20px] italic mt-4">
          <li>
            It is preferable to select the driver or Vehicle based on ratings.
          </li>
          <li>
            The customer agrees and accepts that the use of the Services
            provided by the Company is at the sole risk of the Customer, and
            further acknowledges that the Company disclaims all representations
            and warranties of any kind, whether express or implied. The customer
            shall ensure that he/she will not indulge in any of the following
            activities while availing the service:
            <ul className=" list-disc leading-10 pl-10 text-[20px] italic mt-4">
              <li>
                Soiling or damaging the body and/or any other interiors of the
                vehicles.
              </li>
              <li>
                Misusing, soiling or damaging any of the devices
                (technical/non-technical) in the vehicle.
              </li>
              <li>
                Asking the driver to break any Traffic/RTO/City Police and/or
                government rules for any purpose. The driver has the right to
                refuse such a request by the customer. The driver also has the
                right to refuse such a pick-up.
              </li>
              <li>
                Pressurizing the driver to overload truck with the consignment
                than the allowed limit.
              </li>
            </ul>
          </li>
          <li>
            The customer is responsible for the licence of goods sent through
            us.
          </li>
          <li>
            The customer is responsible for safe packing, loading, and unloading
            the goods.
          </li>
          <li>
            The customer must arrange for a load man to load and unload goods
            into the vehicle.
          </li>
          <li>
            Ankusam Logistics/ Our Vehicle partners are not responsible for any
            damage to goods during transportation. It is totally the load
            provider's responsibility.
          </li>
          <li>
            The customer has follow the Proper Guidelines while transporting
            Animals, Explosives and Chemicals as per government norms.
          </li>
          <li>
            Prohibited Items: We do not accept consignments that contain
            prohibited items.
          </li>
          <li>
            Ankusam Logistics is not responsible for any delay in the load
            transportation or we are not responsible for any loss due to delay
            in transportation.
          </li>
          <li>
            The Company shall not be liable for any conduct of the drivers of
            the vehicles. However, the Company encourages you to notify it, of
            any complaints that you may have against the driver that you may
            have hired using the Company's Services.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default TermsAndCondition;
