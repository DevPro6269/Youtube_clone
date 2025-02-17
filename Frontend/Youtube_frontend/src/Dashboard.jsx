import React from 'react'
import Home from './pages/Home'
import View from './pages/View'
import ChannelDetails from './pages/ChannelDetails'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { CreateChannel } from './pages/CreateChannel'
import Layout from './Layout/Layout'
import { useSelector } from 'react-redux'
import ProtectedRoute from "./Hooks/protectedRoute.jsx"
import OtpVerification from './components/VerifyOtp.jsx'

const Dashboard = () => {

const userLoggedIn = useSelector((state)=>state.user.isLoggedIn)
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
      ,{
        path:"/verify",
        element:<OtpVerification/>
      }
    ]
  },
  {
    path:"/yotube/video",
    element:<View/>
  },
  {
    path:"/youtube/channel/new",
    element:<ProtectedRoute>
      <CreateChannel/>
    </ProtectedRoute>
  }
  ])


  return (
   <>
   <RouterProvider router={Router} />
   </>
  )
}

export default Dashboard