import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateShippingAddress, updatePaymentMethod, emptyCart } from '../slices/cartSlice';
import { useCreateOrderMutation} from '../slices/orderApiSlice';

import Container from '../utils/Container';
import {toast} from 'react-toastify';
import { FaPaypal, FaRegMoneyBillAlt  } from 'react-icons/fa';
import Loader from '../components/Loader';

const CheckoutScreen = () => {
  
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
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
    setPayment(cart.paymentMethod);
    setEmail(cart.shippingAddress.email || '');
    setName(cart.shippingAddress.name || '');
  }, [cart.shippingAddress]);


  const [createOrder, {isLoading:createOrderLoading}] = useCreateOrderMutation();
  
  const paymentHandler = async (e) => {
    e.preventDefault();
    dispatch(updateShippingAddress({ country, city, postalCode, address, phone, email, payment, name }));
    dispatch(updatePaymentMethod(payment));

    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: { country, city, postalCode, address, phone, email, name },
        paymentMethod: payment,
      }).unwrap();

      res.paymentMethod === 'PayPal' ? navigate(`/orders/${res._id}/pay`) : navigate(`/orders/${res._id}`);
      dispatch(emptyCart());

    } catch (err) {
      console.log(err)
      toast.error(`${err?.data?.message || err.error}`);
    }
  }

  return ( 
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4 p-4 mx-auto overflow-y-scroll no-scrollbar max-h-screen order-2 md:order-1'>

        <h3 className='text-xl font-semibold'>Email</h3>
          <div className='mb-4'>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" className="input input-bordered w-full text-gray-600 italic" />
          </div>

          
          <h3 className='text-xl font-semibold'>Delivery</h3>

            <form className="flex flex-col gap-4 mb-4">
                <div>
                    <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" placeholder="Country/Region" className="input input-bordered w-full" />
                </div>

                <div className='flex'>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full text-gray-600 italic capitalize" />
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

            <h3 className='text-xl font-semibold'>How would you like to pay?</h3>

            <form onSubmit={paymentHandler}>
              <div className="form-control bg-gray-100 rounded-full px-2 mb-4">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2"> <FaPaypal /> PayPal</span>
                  <input onChange={(e) => setPayment(e.target.value)} value="PayPal" type="radio" name="radio-10" checked={payment==='PayPal'} className="radio"  />
                </label>
              </div>

              <div className="form-control bg-gray-100 rounded-full px-2">
                <label className="label cursor-pointer">
                <span className="label-text flex items-center gap-2"> <FaRegMoneyBillAlt /> Cash on Delivery</span>
                <input onChange={(e) => setPayment(e.target.value)} value="COD" type="radio" name="radio-10" checked={payment==='COD'} className="radio"  />
                </label>
              </div>

              <button type='submit' className='btn-main w-full rounded mt-6'> {createOrderLoading ? (<Loader />) : ('PLACE ORDER')}</button> 
            </form>


        </div>

        <div className='p-4 md:mx-auto border-l max-md:border-none overflow-y-scroll no-scrollbar max-h-screen order-1 md:order-2'>
          {cart.cartItems.length === 0 ? (<h1 className='text-xl'>Your cart is empty</h1>) : (
              <ul>
              {cart.cartItems.map((item, index) => {
                return <li key={index} className='flex flex-row max-md:flex-col items-center justify-start gap-4 mb-6'> 

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