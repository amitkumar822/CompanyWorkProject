import React from 'react';

const TermsAndConditionsDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[80%] h-[80%] mx-auto fixed inset-0 flex items-center justify-center z-[15] md:top-24 top-20">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-lg px-6 z-10 w-full h-full overflow-x-auto">
      <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 fixed"
          onClick={onClose}
        >
          X
        </button>
        <div className='mt-16 pb-8 pt-2'>
        <h2 className="md:text-3xl text-xl font-bold mb-4 text-red-600">Ankusam Logistics Terms and Conditions</h2>
        <div className=' text-[#212121]'>
          <h1 className="md:text-lg font-semibold mb-2 text-[#ae3939]">
            The following Terms & Conditions shall apply to customers utilising the Services offered by the Company for the hiring of vehicles.
          </h1>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              It is preferable to select the driver or Vehicle based on ratings.
            </li>
            <li>
              The customer agrees and accepts that the use of the Services provided by the Company is at the sole risk of the Customer, and further acknowledges that the Company disclaims all representations and warranties of any kind, whether express or implied. The customer shall ensure that he/she will not indulge in any of the following activities while availing the service:
              <ul className=" list-disc pl-6 space-y-2">
                <li>Soiling or damaging the body and/or any other interiors of the vehicles.</li>
                <li>Asking the driver to break any Traffic/RTO/City Police and/or government rules for any purpose. The driver has the right to refuse such a request by the customer. The driver also has the right to refuse such a pick-up.</li>
                <li>Pressurizing the driver to overload the truck with the consignment than the allowed limit.</li>
              </ul>
            </li>
            <li>The customer is responsible for the license of goods sent through us.</li>
            <li> The customer is responsible for safe packing, loading, and unloading the goods.</li>
            <li>The customer must arrange for a load man to load and unload goods into the vehicle.</li>
            <li>Ankusam Logistics/Our Vehicle partners are not responsible for any damage to goods during transportation. It is totally the load provider's responsibility.</li>
            <li>The customer has to follow the Proper Guidelines while transporting Animals, Explosives, and Chemicals as per government norms.</li>
            <li>Prohibited Items: We do not accept consignments that contain prohibited items.</li>
            <li> Ankusam Logistics is not responsible for any delay in the load transportation or we are not responsible for any loss due to delay in transportation.</li>
            <li> The Company shall not be liable for any conduct of the drivers of the vehicles. However, the Company encourages you to notify it of any complaints that you may have against the driver that you may have hired using the Company's Services.</li>
          </ol>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default TermsAndConditionsDialog;
