import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice"
import Loader from "../components/Loader";
import Message from "../components/Message";
import {FaCheckCircle} from 'react-icons/fa'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const OrderScreen = () => {
  const {id:orderId} = useParams();
  const {data:order, isLoading, error} = useGetOrderByIdQuery(orderId)

  const {userInfo} = useSelector((state) => state.auth);

  return (
    isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error.message || error.error}`} />) : (

      <div>
        {!order.isPaid && order.paymentMethod === 'PayPal' ? (
          <>
            <h1 className="text-xl uppercase tracking-widest text-center my-8">Order is Pending <br/> <br/> <Link to={`/orders/${order._id}/pay`} className="text-sm  border-2 px-4 py-2 rounded">Click to pay</Link> </h1>
          
          </>

        ) : (
          <>
          <h1 className="text-xl uppercase tracking-widest text-center my-8">Thank you for your order!</h1>
            <div className="bg-green-100 text-center px-4 py-2">
              
              <div className="flex items-center justify-center mb-4 gap-3"> 
                <FaCheckCircle className="md:text-2xl" /> 
                <h3 className="md:text-2xl text-lg tracking-wide"> ORDER CONFIRMATION</h3>
              </div>

              {/* <span className="block mb-4">{order._id}</span>  */}
              <span className="mb-4 block md:text-xl text-sm tracking-wide">{userInfo.name}, thank you for your order! </span>
              <p className="md:text-xl text-sm tracking-wide">We've recieved your order and will contact you as soon as your package is shipped. You can find your purchase information below.</p>
            </div>
          </>
        )}

       <div className="mt-8 mx-auto md:w-1/2 py-2">
        <h3 className="text-xl uppercase mb-2 mb-4">Order Summary</h3>
          <ul>
            {order.orderItems.map((x, i) => 
              <li key={i} className="flex items-center gap-4 mb-4 border-b pb-4">
                  <LazyLoadImage effect="blur" src={x.image[0]} className='rounded w-16 sm:w-20' />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold"> {x.name}</span>
                    <span> Price: ${x.price}</span>
                    <span> Quantity: {x.qty}</span>
                    <span className="font-semibold">Total: ${(x.qty * x.price).toFixed(2)}</span>
                  </div>

         
              </li>)}
          </ul>
       </div>

       <div className="mt-8 md:w-1/2 mx-auto py-2">
        <h3 className="text-xl uppercase mb-4">Order Total</h3>

        <div className="flex flex-col gap-4 text-center border-y my-4 px-2 py-4 text-xl">
          <span className="flex justify-between">
            Subtotal Price: 
            <span>${order.itemsPrice.toFixed(2)} </span>
          </span>

          <span className="flex justify-between">
            Shipping Price: 
            <span>${order.shippingPrice.toFixed(2)} </span>
          </span>

          <span className="flex justify-between">
            Total Price: 
            <span>${order.totalPrice.toFixed(2)} </span>
          </span>
         

        </div>
       </div>

       <div className="mt-8 md:w-1/2 mx-auto py-2">
        <h3 className="text-xl uppercase my-6">Shipping Address</h3>
        <ul className="md:text-lg text-sm tracking-widest">
          <li className="border-b  py-2"> <strong className="">Address</strong>: {order.shippingAddress.address}</li>
          <li className="border-b  py-2"> <strong> Country: </strong> {order.shippingAddress.country}</li>
          <li className="border-b  py-2"> <strong> City: </strong> {order.shippingAddress.city}</li>
          <li className="border-b  py-2"> <strong> Postal Code: </strong> {order.shippingAddress.postalCode}</li>
          <li className="border-b  py-2"> <strong> Phone: </strong> {order.shippingAddress.phone}</li>
          <li className="border-b  py-2"> <strong> Paid By: </strong> {order.paymentMethod }</li>
        </ul>
       </div>

        {/* <Timeline currentStage={'Order Placed'} /> */}
        
      </div>

    )
  )
}

export default OrderScreen