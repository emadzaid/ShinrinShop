import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import AppContainer from './utils/AppContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Header />
      <AppContainer>
        <Outlet />
      </AppContainer>
      <Footer />

    </>
  )
}

export default App;
