import React from 'react'
import Banner from '../Banner/Banner'
import LoadDataList from '../FilterAndLoadData/LoadDataList'
import BannerButtomUp from '../BannerButtomUp/BannerButtomUp'

function Home() {
  return (
    <>
        <Banner />
        <LoadDataList />
        <BannerButtomUp />
    </>
  )
}

export default Home