import React, { useEffect } from 'react'
import Signup from './pages/Signup'
import { useAuthStore } from './store/useAuthStore'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Signin from './pages/Signin'
import {Toaster} from "react-hot-toast"
import { useChatStore } from './store/useChatStore';
const App = () => {
  const { authUser, getAuthUser, getAllUsers,onlineUsers } = useAuthStore()
  const {getAllChatPartners} = useChatStore()
  useEffect(() => {
    getAuthUser()
    getAllUsers()
    getAllChatPartners()
  }, [])

  return (
    <div className='h-screen w-full bg-slate-900 text-white'>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/signup"/>}/>
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/"/>}/>
        <Route path='/signin' element={!authUser ? <Signin/> : <Navigate to="/"/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
