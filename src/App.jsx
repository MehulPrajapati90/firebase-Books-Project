import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Listing from './pages/listing.jsx'
import ContentDetails from './pages/ContentDetails.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/details/view/:id" element={<ContentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App