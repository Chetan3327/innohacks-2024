import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogs from './pages/Catalogs'
import UserContextProvider from './context/userContext'

const App = () => {
  return (
    <Router>
        <UserContextProvider>
        <div className='min-h-screen text-maintext bg-secondary font-mono'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalogs' element={<Catalogs />} />
          </Routes>
        </div>
      </UserContextProvider>
    </Router>
  )
}

export default App