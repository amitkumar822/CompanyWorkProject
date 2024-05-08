import React from 'react'
import Banner from '../Banner'
import Filtersection from '../Filtersection'
import Loadlist from '../Loadlist'
import SaveWorldbyrecycling from '../SaveWorldbyrecycling'
// import Navbar from '../Navbar'
// import AboutQuickLocation from '../AboutQuickLocation'

function Home() {
  return (
    <>
        {/* <Navbar /> */}
        <Banner />
        <Filtersection />
        <Loadlist />
        <SaveWorldbyrecycling />
        {/* <AboutQuickLocation /> */}
    </>
  )
}

export default Home