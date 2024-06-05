import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Component/Navbar'
import Manager from './Component/Manager'
import Footer from './Component/Footer'
// Main Application

function App() {

  return (
    <>
      <div>
        <Navbar></Navbar>
        <Manager></Manager>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
