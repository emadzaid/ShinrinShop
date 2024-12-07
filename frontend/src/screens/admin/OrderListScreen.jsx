import { useState } from 'react';
import {useGetAllOrdersQuery, useUpdateStatusMutation} from '../../slices/orderApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const OrderListScreen = () => {
    const [updatingOrderId, setUpdatingOrderId] = useState(null); // Track the currently updating order ID

    const {data:orders, isLoading, refetch, error} = useGetAllOrdersQuery();
    const [updateStatus, {isLoading:loadingStatusUpdate}] = useUpdateStatusMutation();
    
    const handleStatusChange = async (id, status) => {
        setUpdatingOrderId(id); // Set the updating order ID
        try {
            await updateStatus({ id, status }).unwrap();
            refetch();
            toast.success('Order status updated');
        } catch (err) {
           toast.error(err?.data?.message || err.error);
        } finally {
            setUpdatingOrderId(null); // Reset after the update
        }
    };

  return (
    isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error.error || 'An error occured'}`} />) : (

        <ul className='lg:w-[90%] w-full mx-auto overflow-auto flex flex-col'>
            {orders.map((x, i) => 

                <li key={i} className='border mb-6'>
                    <div className='flex max-md:flex-col justify-between md:items-center p-4 text-sm'>   
                        <div className='flex flex-col gap-1 md:w-[250px]'>
                            <p className='text-gray-400'> {x._id} </p>
                            {/* <p>{item.name} x {item.qty} {item.selectedSize} </p> */}

                            <select className="w-full max-w-[300px] -ml-1 bg-gray-100 py-1 rounded-full">
                                {x.orderItems.map((item, index) => (
                                    <option key={index} className="text-sm">
                                        {item.name} x {item.qty} {item.selectedSize || ""}
                                    </option>
                                ))}
                            </select>
                                                        
                            <p>Name: <span className='uppercase'>{x?.user?.name} </span> </p>
                            <p>{x?.shippingAddress.address}</p>
                            <p>{x?.shippingAddress.country}, {x?.shippingAddress.city}, {x?.shippingAddress.postalCode} </p>
                        </div>

                        <div className='flex flex-col gap-1 items-start'>
                            <p>Items: {x.orderItems.length}</p>
                            <p>Price: <span className='text-gray-400'>${x.totalPrice.toFixed(2)}</span></p>
                            <p>Method: <span className='text-gray-400'>{x.paymentMethod} </span> </p>
                            <p>Payment: <span className='text-gray-400'> {x.isPaid ? "Paid" : "Pending"} </span></p>
                            <p> Date: <span className="text-gray-400"> {new Date(x.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} </span></p>
                        </div>

                        <div className=''>
                            <select 
                                className="select select-bordered max-md:mt-4 mb-2" 
                                value={x.status} 
                                onChange={(e) => handleStatusChange(x._id, e.target.value)}
                            >
                                <option value="Pending Payment">Order Pending</option>
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="Order Processed">Order Processed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            {updatingOrderId === x._id && <Loader />} {/* Show loader only for the updating order */}
                        </div>
                        </div>

                </li>
               
            )}
        </ul>
    )
  )
}

export default OrderListScreen



{/* <ul className='w-[90%] mx-auto overflow-auto'>
{orders.map((x) => 
    x.orderItems.map((item, i) => (
    <li key={i} className='border'>
        <div className='flex justify-between items-center p-4 text-sm'>
            
            <div className='flex flex-col gap-1 '>
                <p className='text-gray-400'> {x._id} </p>
                <p>{item.name} x {item.qty} {item.selectedSize} </p>
                <p>Name: <span className='uppercase'>{x?.user?.name} </span> </p>
                <p>{x?.shippingAddress.address}</p>
                <p>{x?.shippingAddress.country}, {x?.shippingAddress.city}, {x?.shippingAddress.postalCode} </p>
            </div>

            <div className='flex flex-col gap-1 items-start'>
                <p>Items: {x.orderItems.length}</p>
                <p>Method: <span className='text-gray-400'>{x.paymentMethod} </span> </p>
                <p>Payment: <span className='text-gray-400'> {x.isPaid ? "Paid" : "Pending"} </span></p>
                <p> Date: <span className="text-gray-400"> {new Date(x.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} </span></p>
            </div>

            <p>${x.totalPrice.toFixed(2)}</p>

            <select className="select  select-bordered">
                <option>Order Confirmed</option>
                <option>Order Processed</option>
                <option>Shipped</option>
                <option>Delivered</option>
            </select>  

        </div>
    </li>
    ))
)}
</ul> */}