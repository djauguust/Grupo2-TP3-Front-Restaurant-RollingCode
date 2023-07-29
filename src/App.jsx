
import CarruselPrincipal from './components/CarruselPrincipal';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reviews from './components/Reviews';


function App() {
  return (
    <>
      <Header />
      <CarruselPrincipal />
      <Reviews/>
      <Footer />
    </>
  );
}

export default App;
