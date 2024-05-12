import React from 'react'

function AboutUs() {
  return (
    <>
     <div className='w-[90%] mx-auto grid md:grid-cols-2 grid-cols-1 gap-6 my-12'>
         <div className='w-full min-w-[490px] mx-auto py-4 px-10 bg-[#f0efef] rounded-lg shadow-md shadow-gray-600'

          data-aos-duration="1000"
          data-aos="fade-right"
         >
            <h1 className='text-3xl font-bold text-center mb-4'>AboutUs</h1>
            <p className='text-xl font-serif'>
            Ankusam Logistics Manufacturing Company is a dynamic and innovative industrial enterprise that specializes in the production of a diverse range of products across various sectors. Established with a vision to revolutionize manufacturing through advanced technology and sustainable practices, Ankusam Logistics Manufacturing Company has rapidly emerged as a trusted name in the industry.
            </p>
            <br />
            <p className='text-xl font-serif'>
            The product portfolio of Ankusam Logistics Manufacturing Company spans a wide array of industries, including automotive, electronics, consumer goods, and more. Leveraging its expertise in engineering and production, the company caters to the unique needs of each sector, delivering tailor-made solutions that meet and exceed customer expectations.
            </p>
         </div>

         <div className='w-full min-w-[490px] mx-auto overflow-hidden rounded-xl shadow-md shadow-gray-600'
         data-aos-duration="1000"
         data-aos="fade-left"
         >
            <img className='w-full min-w-[490px] h-full hover:scale-105 duration-300' src="https://media.istockphoto.com/id/1089202810/photo/the-robotic-arm-catch-the-gear-part-for-manufacturing-process.jpg?s=612x612&w=0&k=20&c=oOLCFAMZiAf2blPEMjVsMBDRcXSPcYx50aPSY7HLPCs=" alt="" />
         </div>
     </div>
    </>
  )
}

export default AboutUs