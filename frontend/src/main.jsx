import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {createBrowserRouter,  createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx';

import HomeScreen from './Screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import CheckoutScreen from './screens/CheckoutScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path="/collections/:category/:type/:id" element={<ProductScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterScreen />} />
    <Route path="/cart" element={<CartScreen />} />

    <Route path='/' element={<PrivateRoute />}>
      <Route path='/checkout' element={<CheckoutScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/orders/:id' element={<OrderScreen />} />

    </Route>
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
