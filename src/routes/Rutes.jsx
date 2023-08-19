import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/home'
import Error404 from '../pages/Error404/Error404'

const Rutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error404 />} />
    </Routes>
    </>
  )
}

export default Rutes