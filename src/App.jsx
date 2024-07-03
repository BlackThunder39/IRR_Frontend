import { useState } from 'react'
import Login from "./components/Login"
import Form from "./components/Form"
import Reports from "./components/Reports"
import Navbar from "./components/Navbar"

import ViewReport from './components/ViewReport'


import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/createReport" element={<Form/>} />
          <Route path="/Reports" element={<Reports/>}/>
          <Route path='/Reports/:id' element={<ViewReport/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>}/>
      </Routes>
    </>
  )
}

export default App
