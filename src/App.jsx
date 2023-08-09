import { useState } from 'react'
import Rutas from './rutas/rutas'
import Navbar from './componentes/navbar'

function App() {


  return (
    <>
    <Navbar />
      <main>
        <Rutas />
      </main>
    </>
  )
}

export default App
