import React from 'react'
import Banner from '../Banner/Banner'
import LoadDataList from '../FilterAndLoadData/LoadDataList'
import BannerButtomUp from '../BannerButtomUp/BannerButtomUp'
import AvailableLoad from '../../AvailableLoad/AvailableLoad'

function Home() {
  return (
    <>
        <Banner />
        {/* <LoadDataList /> */}
        <AvailableLoad />
        <BannerButtomUp />
    </>
  )
}

export default Home