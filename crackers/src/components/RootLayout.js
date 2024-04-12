import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function RootLayout() {
  return (
    <div>
<Header/>
   <div style={{minHeight:'70vh'}}>
    <Outlet/>
   </div>
<Footer/>
    </div>
  )
}

export default RootLayout