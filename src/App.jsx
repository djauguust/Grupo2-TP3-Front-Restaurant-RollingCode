import Footer from './components/footer/Footer';
import Header from './components/navbar/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesNavbar from './routes/RoutesNavbar';
import UserContext from './context/UserContext';

function App() {
  return (
    <>
    <UserContext>
      <Header/>
      <RoutesNavbar/>
      <Footer />
      </UserContext>
    </>
  );
}

export default App;
