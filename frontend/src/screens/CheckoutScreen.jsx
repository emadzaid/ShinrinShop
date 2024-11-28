import { useState } from 'react';
import {useSelector} from 'react-redux';

import Container from '../utils/Container';


const CheckoutScreen = () => {
  
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');

  const {userInfo} = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4 p-4 mx-auto overflow-y-scroll no-scrollbar max-h-screen'>

        <h3 className='text-xl font-semibold'>Contact</h3>
          <div className='mb-4'>
              <input readOnly type="text" value={userInfo.email} placeholder="Contact" className="input input-bordered w-full text-gray-600 italic" />
          </div>

          
          <h3 className='text-xl font-semibold'>Delivery</h3>

            <form className="flex flex-col gap-4 mb-4">
                <div>
                    <input type="text" placeholder="Country/Region" className="input input-bordered w-full" />
                </div>

                <div className='flex'>
                    <input readOnly type="text" value={userInfo.name} placeholder="First Name" className="input input-bordered w-full text-gray-600 italic capitalize" />
                </div>

                <div>
                    <input type="text" placeholder="Address" className="input input-bordered w-full" />
                </div>

                <div className='flex gap-4'>
                    <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Postal Code (optional)" className="input input-bordered w-full" />

                </div>

                <div>
                    <input type="text" placeholder="Phone" className="input input-bordered w-full" />
                </div>
                
            </form>

            <form className="flex flex-col gap-4 mb-4">
                <div>
                    <input type="text" placeholder="Country/Region" className="input input-bordered w-full" />
                </div>

                <div className='flex'>
                    <input readOnly type="text" value={userInfo.name} placeholder="First Name" className="input input-bordered w-full text-gray-600 italic capitalize" />
                </div>

                <div>
                    <input type="text" placeholder="Address" className="input input-bordered w-full" />
                </div>

                <div className='flex gap-4'>
                    <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Postal Code (optional)" className="input input-bordered w-full" />

                </div>

                <div>
                    <input type="text" placeholder="Phone" className="input input-bordered w-full" />
                </div>
                
            </form>

            <h3>Shipping Method</h3>
            <span className="italic text-sm bg-gray-100 px-3 py-1 rounded-full flex justify-between mb-4">
              Standard Shipping <span> ${`${cart.shippingPrice}`} </span>
            </span>

            <h3 className='text-xl font-semibold'>Payment Method</h3>
       
        </div>

        <div className='p-4 mx-auto border-l max-md:border-none overflow-y-scroll no-scrollbar max-h-screen'>
          <ul>
            {cart.cartItems.map((item, index) => {
              return <li key={index} className='flex flex-row max-md:flex-col items-center gap-4 mb-6'> 

                <div className='relative'>
                  <img width="80" height="150" src={item.image[0]} className='rounded' />
                  <span className='absolute -top-2 -right-3 border rounded-full px-2 py-[1px] text-[12px] bg-gray-500 text-white'>{item.qty}</span>
                </div>
                <span className='text-sm italic font-semibold'>{item.name} - {item.selectedSize}</span>
                <span className='text-sm'>${item.price.toFixed(2)}</span>

              </li>
            })}

            <li className="flex italic flex-col items-end tracking-widest gap-2 border-t py-4 mt-4">
                <span className="text-sm">Total Items: {cart.cartItems.reduce((a, x) => a + x.qty, 0)}</span>
                <span className='text-sm'>Subtotal Price ${`${cart.itemsPrice}`}</span>
                <span className="text-sm">Shipping Price ${`${cart.shippingPrice}`}</span>
                <span className="mt-2 font-bold">Total Price ${`${cart.totalPrice}`}</span>
            </li>

          </ul>
        </div>
        
      </div>

    </Container>
  )
}

export default CheckoutScreen;