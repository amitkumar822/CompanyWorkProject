import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './App.jsx'
import Home from './components/Home/Home.jsx'
import LoginBusiness from './components/RegLogLogOut/LoginBusiness.jsx'
import SignupPageBusiness from './components/RegLogLogOut/SignupPageBusiness.jsx'
import LoginVehicle from './components/RegLogLogOut/LoginVehicle.jsx'
import SignupVehicle from './components/RegLogLogOut/SignupVehicle.jsx'
import Contact from './components/Contact.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element = {<Home />}/>
      <Route path='/businesslogin' element={<LoginBusiness />} />
      <Route path='/businesssignup' element={<SignupPageBusiness/>} />
      <Route path='/vehiclelogin' element={<LoginVehicle />} />
      <Route path='/vehiclesignup' element={<SignupVehicle />} />
      <Route path='/contactus' element={<Contact />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
