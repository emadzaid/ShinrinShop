import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {createBrowserRouter,  createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import AdminRoute from './components/AdminRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import HomeScreen from './Screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import CheckoutScreen from './screens/CheckoutScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import MyOrderScreen from './screens/MyOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import CollectionsScreen from './screens/CollectionsScreen.jsx';

import AdminPanelScreen from './screens/admin/AdminPanelScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    
    <Route path="/collections/:category/:type/:id" element={<ProductScreen />} />
    <Route path="/collections/:category/:type" element={<CollectionsScreen />} />
    <Route path="/collections/:category" element={<CollectionsScreen />} />
    
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterScreen />} />
    <Route path="/cart" element={<CartScreen />} />

    <Route path='/' element={<PrivateRoute />}>
      <Route path='/checkout' element={<CheckoutScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/orders/:id' element={<OrderScreen />} />
      <Route path='/orders/:id/pay' element={<PaymentScreen />} />
      <Route path='/myorders' element={<MyOrderScreen />} />
    </Route>

    <Route path='/' element={<AdminRoute />}>
      <Route path='/admin/panel' element={<AdminPanelScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/products/:id/edit' element={<ProductEditScreen />} />


    </Route>
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)
