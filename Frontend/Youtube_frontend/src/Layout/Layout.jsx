import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
   <Sidebar/>
   <Outlet/>
    </div>
    </>
  )
}

export default Layout