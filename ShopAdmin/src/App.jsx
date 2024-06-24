import React from 'react'
import {Outlet} from 'react-router'
import Login from './components/LoginPage/Login'
import Header from './components/Header/Header'
import Dashboard from './components/DashboardPage/Dashboard'

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Login /> */}
    </div>
  )
}

export default App