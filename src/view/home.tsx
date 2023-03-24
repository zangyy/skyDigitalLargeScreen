
import { useState, useEffect } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter, useNavigate, Outlet, Route, Routes, useRoutes, useLocation } from 'react-router-dom';

import './home.less'
import Building from './building'
import Clock from './clock'
import Test from './test'
import logo from "../assets/logo.png";
import routes from "@/routes/index";
export default function Home() {
  const elementRoute = useRoutes(routes)
  const Location = useLocation()
  useEffect(() => {
    console.log(Location.pathname)
  })
  return (
    <div style={{width:'100%',height:'100%'}}>
      {
        Location.pathname == '/login' ? <div style={{width:'100%',height:'100%'}}>{elementRoute}</div> :
          <div className='home'>
            <header>
              <img style={{ width: '464px' }} src={logo} alt="" />
              <Clock />
            </header>
            <main>
              {elementRoute}
              {/* <BrowserRouter>
          <Routes>
            <Route index element={
              <Building />
            }></Route>
            <Route path='/test' element={
              <Test />
            }></Route>
          </Routes>
        </BrowserRouter> */}
            </main>
          </div>
      }
    </div>
  )
}