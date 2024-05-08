import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import LoginBusiness from './components/RegLogLogOut/LoginBusiness.jsx'
import SignupPageBusiness from './components/RegLogLogOut/SignupPageBusiness.jsx'
import LoginVehicle from './components/RegLogLogOut/LoginVehicle.jsx'
import SignupVehicle from './components/RegLogLogOut/SignupVehicle.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element = {<Home />}/>
      <Route path='/businesslogin' element={<LoginBusiness />} />
      <Route path='/businesssignup' element={<SignupPageBusiness/>} />
      <Route path='/vehiclelogin' element={<LoginVehicle />} />
      <Route path='/vehiclesignup' element={<SignupVehicle />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
