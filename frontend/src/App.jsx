import Header from './components/Header';
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

    </>
  )
}

export default App;
