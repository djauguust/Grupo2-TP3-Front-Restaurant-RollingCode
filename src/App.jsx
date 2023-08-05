import Footer from './components/footer/Footer';
import Header from './components/navbar/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesNavbar from './routes/RoutesNavbar';
import PaginaPrincipal from './pages/PaginaPrincipal';

function App() {
  return (
    <>
      <Header/>
      <RoutesNavbar/>
      <Footer />
    </>
  );
}

export default App;
