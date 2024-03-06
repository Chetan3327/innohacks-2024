import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogs from './pages/Catalogs'
import UserContextProvider from './context/userContext'
import Upload from './pages/Upload'
import NavBar from './components/commons/NavBar'
import CatalogInfo from './pages/CatalogInfo'
import Footer from './components/commons/Footer'

const App = () => {
  return (
    <Router>
        <UserContextProvider>
        <div className='min-h-screen text-maintext bg-secondary font-mono'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalogs' element={<Catalogs />} />
            <Route path='/catalogs/:catalogId' element={<CatalogInfo />} />
            <Route path='/upload' element={<Upload />} />
          </Routes>
          <Footer/>
        </div>
      </UserContextProvider>
    </Router>
  )
}

export default App