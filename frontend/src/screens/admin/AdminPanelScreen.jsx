import { useState } from 'react';

import ProductListScreen from './ProductListScreen';
import UserListScreen from './UserListScreen';
import OrderListScreen from './OrderListScreen';

import Container from '../../utils/Container';
import Title from '../../components/Title';

const AdminPanelScreen = () => {
    const [activeComponent, setActiveComponent] = useState('ProductList');

    const renderComponent = () => {
        switch (activeComponent) {
          case 'ProductList':
            return <ProductListScreen />;
          case 'OrderList':
            return <OrderListScreen />;
          case 'UserList':
            return <UserListScreen />;
          default:
            return <div>Select an option from the menu</div>;
        }
      };

  return (

    <Container>
        <center><Title text1={'ADMIN'} text2={'PANEL'}  className={'text-2xl my-4'} /></center>
        <div className='grid lg:grid-cols-6 grid-cols-1 lg:w-[90%] w-full mx-auto py-4'>
            <div className='lg:border-r max-lg:border-b col-span-1'>
                <ul className='flex lg:flex-col flex-row gap-3 text-start text-[10px] overflow-x-auto mb-4 justify-center'>
                    {/*  COMPONENT LIST  */}
                    <li className={`admin-list ${activeComponent === 'ProductList' ? 'bg-gray-200' : ''}`} onClick={() => setActiveComponent('ProductList')}>Product List</li>
                    <li className={`admin-list ${activeComponent === 'OrderList' ? 'bg-gray-200' : ''}`} onClick={() => setActiveComponent('OrderList')}>Order List</li>
                    <li className={`admin-list ${activeComponent === 'UserList' ? 'bg-gray-200' : ''}`} onClick={() => setActiveComponent('UserList')}>User List</li>
                    {/* <li className={`border-t border-l border-b  p-2 cursor-pointer ${activeComponent ? '' : ''}`}>Product Edit</li>
                    <li className={`border-t border-l border-b  p-2 cursor-pointer ${activeComponent ? '' : ''}`}>User Edit</li> */}

                </ul>
            </div>
            <div className='lg:col-span-5 px-4'>
                {/* DISPLAY COMPONENT HERE  */}
                {renderComponent()}

            </div>
        </div>
    </Container>
  )
}

export default AdminPanelScreen