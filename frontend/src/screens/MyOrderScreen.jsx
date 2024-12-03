import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";

import Container from "../utils/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Title from "../components/Title";


const MyOrderScreen = () => {

    const {data:orders, isLoading:loadingOrders, refetch, error: ordersError} = useGetMyOrdersQuery();

    useEffect(() => {
        if(orders) {
            refetch();
        }
    }, [orders])
    
  return (

    
    <Container>
        <Title text1={'MY'} text2={'ORDERS'} className={'text-2xl my-2'} />
        {loadingOrders ? (<Loader />) : ordersError ? (<Message error={ordersError?.message || ordersError?.data?.message || "An error occurred"} />) : (
            <div className="lg:w-[75%] mx-auto py-6">
                <ul>
                    {orders.map((order) => 
                        order.orderItems.map((item, i) => 
                        <li key={i} className="border-y py-2 mb-4 flex lg:flex-row flex-col items-center justify-between">
                            <div className="flex flex-row gap-4 lg:w-[500px] truncate">
        
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className="w-16 sm:w-20"
                                />
                                <div className="">
                                    <p className="font-semibold">{item.name}  </p>
                                    <div className="flex flex-row gap-3">
                                        <p>${item.price}</p>
                                        <p>Quantity: {item.qty}</p>
                                        <p>Size: {item.selectedSize === " " ? "N/A" : item.selectedSize }</p>
                                    </div>
                                    <p>
                                        Date: <span className="text-gray-400 text-sm"> {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} </span>

                                    </p>
                                    <p>
                                        Payment: <span className="text-gray-400 text-sm"> {order.paymentMethod} </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex max-[500px]:flex-col justify-between lg:w-1/2 w-full max-lg:mt-4 gap-1">
                                <div className="flex items-center gap-2">
                                    <p className={`min-w-2 h-2 rounded-full ${ !order.isPaid && order.paymentMethod === 'PayPal' ? ('bg-yellow-400') : ('bg-green-400')}`}></p>
                                    <p className="text-sm md:text-base">{!order.isPaid && order.paymentMethod === 'PayPal'  ? ("Pending") : ("Order Placed")}</p>
                                </div>

                                <div className="flex lg:flex-col flex-row gap-4 max-[500px]:justify-center">
                                    <Link to={`/orders/${order._id}`} className="border px-4 py-2 text-sm font-medium rounded-sm text-gray-700">
                                        Order Details
                                    </Link>

                                    <button className="border px-4 py-2 text-sm font-medium rounded-sm text-gray-700">
                                        Track Order
                                    </button>
                                </div>

                            </div>

                            {/* <div>
                                <Link to='/'> Track Order</Link>
                            </div> */}
                        </li>)
                )}
                </ul>
            </div>
        )}
    </Container>
  )
}

export default MyOrderScreen