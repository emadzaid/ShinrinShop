import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import AppContainer from './utils/AppContainer';


function App() {

  return (
    <>
      <Header />
      <AppContainer>
        <Outlet />
      </AppContainer>

    </>
  )
}

export default App;
