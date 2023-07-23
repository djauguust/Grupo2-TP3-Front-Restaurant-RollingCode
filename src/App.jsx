import { useState } from 'react'
import Rutes from './routes/Rutes'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {


  return (
    <>
    <Navbar />
      <main>
        <Rutes />
      </main>
    <Footer />
    </>
  )
}

export default App
