import { useState } from 'react'
import Rutes from './routes/Rutes'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { UsuariosProvider } from './context/context'


function App() {


  return (
    <> 
    <UsuariosProvider >
    <Navbar />
      <main>
        <Rutes />
      </main>
    <Footer />
    </UsuariosProvider>

    </>
  )
}

export default App
