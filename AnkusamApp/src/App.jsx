import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Banner from './components/MainViews/Banner/Banner'
import LoadDataList from './components/MainViews/FilterAndLoadData/LoadDataList'

function App() {
  return (
    <>
     <Header />
     <Banner />
     <LoadDataList />
     <Footer />
    </>
  )
}

export default App