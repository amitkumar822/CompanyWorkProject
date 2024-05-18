import React from 'react'
import { BannerButtomUpPhoto } from '../../../../public/Photo/PhotosExport'

function BannerButtomUp() {
  return (
    <div className='md:w-[80%] w-full overflow-hidden mx-auto mb-6 mt-12'>
        <img className='md:w-[70%] w-[90%] mx-auto' src={ BannerButtomUpPhoto } alt="" />
    </div>
  )
}

export default BannerButtomUp