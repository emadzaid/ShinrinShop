import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { updateShippingAddress } from '../slices/cartSlice';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Populate state fields with values from cart.shippingAddress
    setCountry(cart.shippingAddress.country || '');
    setCity(cart.shippingAddress.city || '');
    setPostalCode(cart.shippingAddress.postalCode || '');
    setAddress(cart.shippingAddress.address || '');
    setPhone(cart.shippingAddress.phone || '');
  }, [cart.shippingAddress]);

  
  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const paymentHandler = async () => {
    dispatch(updateShippingAddress({ country, city, postalCode, address, phone, payment }));
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: { country, city, postalCode, address, phone },
        paymentMethod: payment || 'COD',
      }).unwrap();
      navigate(`/orders/${res._id}`);
      console.log('PAID');
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
  }

  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4 p-4 mx-auto overflow-y-scroll no-scrollbar max-h-screen order-2 md:order-1'>

        <h3 className='text-xl font-semibold'>Contact</h3>
          <div className='mb-4'>
              <input readOnly type="text" value={userInfo.email} placeholder="Contact" className="input input-bordered w-full text-gray-600 italic" />
          </div>

          
          <h3 className='text-xl font-semibold'>Delivery</h3>

            <form className="flex flex-col gap-4 mb-4">
                <div>
                    <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" placeholder="Country/Region" className="input input-bordered w-full" />
                </div>

                <div className='flex'>
                    <input readOnly type="text" value={userInfo.name} placeholder="First Name" className="input input-bordered w-full text-gray-600 italic capitalize" />
                </div>

                <div>
                    <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Address" className="input input-bordered w-full" />
                </div>

                <div className='flex gap-4'>
                    <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder="City" className="input input-bordered w-full max-w-xs" />
                    <input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} type="text" placeholder="Postal Code" className="input input-bordered w-full" />

                </div>

                <div>
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Phone" className="input input-bordered w-full" />
                </div>
                
            </form>

            <h3>Shipping Method</h3>
            <span className="italic text-sm bg-gray-100 px-3 py-1 rounded-full flex justify-between mb-4">
              Standard Shipping <span> ${`${cart.shippingPrice}`} </span>
            </span>

            <h3 className='text-xl font-semibold'>Payment Method</h3>
            {/* PAY NOW BUTTON FOR TESTING ONLY  */}
            {/* MUST BE REMOVED IN PRODUCTION */}

            <button onClick={paymentHandler} className='btn-main'>PAY NOW</button>
        </div>

        <div className='p-4 mx-auto border-l max-md:border-none overflow-y-scroll no-scrollbar max-h-screen order-1 md:order-2'>
          {cart.cartItems.length === 0 ? (<h1 className='text-xl'>Your cart is empty</h1>) : (
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
          )}
          
        </div>
        
      </div>

    </Container>
  )
}

export default CheckoutScreen;