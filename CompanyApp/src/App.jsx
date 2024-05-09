import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import AboutQuickLocation from './components/AboutQuickLocation'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Layout() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
        <div>
            <Navbar />
            <Outlet />
            <AboutQuickLocation />
        </div>
    </>
  )
}

export default Layout