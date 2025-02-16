import React from 'react'
import Home from './pages/Home'
import View from './pages/View'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ChannelDetails from './pages/ChannelDetails'
import { BrowserRouter, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { CreateChannel } from './pages/CreateChannel'
import Layout from './Layout/Layout'



const Dashboard = () => {
  const Router = createBrowserRouter([{
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/sign-up",
        element:<Signup/>
      },
      {
        path:"/login",
        element:<Login/>
      }
      ,{
        path:"/channel",
        element:<ChannelDetails/>
      }
    ]
  },
  {
    path:"/yotube/video",
    element:<View/>
  },
  {
    path:"/youtube/channel/new",
    element:<CreateChannel/>
  }
  ])


  return (
   <>
   <RouterProvider router={Router} />
   </>
  )
}

export default Dashboard