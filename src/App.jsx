import { useState } from 'react'
import Rutas from './rutas/rutas'
import Navbar from './componentes/navbar'
import { ReservasProvider } from './contexto/contexto'

function App() {


  return (
    <>
    <ReservasProvider>
    <Navbar />
      <main>
        <Rutas />
      </main>
    </ReservasProvider>
    </>
  )
}

export default App
