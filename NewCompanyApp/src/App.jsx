import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ContactUs from './components/ContactUs/ContactUs'
import MainSection from './components/MainSection/MainSection'
import IronProduct from './components/Product/IronProduct'
import ViewCompanyMachine from './components/Product/ViewCompanyMachine'
import AboutUs from './components/AboutUs/AboutUs'

function App() {
  return (
    <div className=''>
      <Header />
      <MainSection />
      <IronProduct />
      <ViewCompanyMachine />
      <AboutUs />
      <ContactUs /> 
      <Footer />
    </div>
  )
}

export default App