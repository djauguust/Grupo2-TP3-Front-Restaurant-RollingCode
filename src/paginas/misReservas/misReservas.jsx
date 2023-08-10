import { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ReservasContexto } from '../../contexto/contexto'
    

const misReservas = () => {

  const Url =  import.meta.env.VITE_API_RESERVAS

  const{TraerReservas, Reservas} = useContext(ReservasContexto)

  useEffect(() => {
    if (Reservas === undefined) {
      TraerReservas();
    }
  }, [TraerReservas, Reservas]);
  console.log(Reservas);

  return (
    <>
        <div className='text-center mt-3'>
            <h1>Mis Reservas</h1>
        </div>
        <Container>

        </Container>

    </>
  )
}

export default misReservas