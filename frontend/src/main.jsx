import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User_reg from './user authentications/user_reg'
import Login from './user authentications/user_login';
import Home from './Home';
import Otp from './otp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/reg' element={<User_reg />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/otp' element={<Otp/>}/>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
