import React from 'react'
import {Outlet} from 'react-router'
import Header from './components/Header/Header'

function App() {
  return (
    <div className=' bg-gray-400'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App