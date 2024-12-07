import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import Homepage from "./pages/Homepage"
import Loginpage  from './pages/Loginpage'
import Studentdashboard from './pages/Studentdashboard'
import Teacherdashboard from './pages/Teacherdashboard'
import Contactpage from './pages/Contactpage'

function App() {

  return (
    <>
    {/* <Homepage /> */}
      <Router>
        {/* <Navbar switchNav={switchNav} isSmall={isSmall} /> */}
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/login' element={<Loginpage />} />
          <Route exact path='/student-dashboard' element={<Studentdashboard />} />
          <Route exact path='/teacher-dashboard' element={<Teacherdashboard />} />
          <Route exact path='/contact' element={<Contactpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
