import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import AboutQuickLocation from './components/AboutQuickLocation'

function Layout() {
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