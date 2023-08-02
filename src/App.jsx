
import CarruselPrincipal from './components/carrusel/CarruselPrincipal';
import Footer from './components/footer/Footer';
import Header from './components/navbar/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reviews from './components/reseñas/Reviews';
import Menu from './components/menu/Menu';
import Info from './components/info/Info';

function App() {
  return (
    <>
      <Header/>
      <CarruselPrincipal />
      <Info/>
      <Menu/>
      <Reviews/>
      <Footer />
    </>
  );
}

export default App;
