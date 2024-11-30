import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useProfileMutation } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

import { FaCheck, FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email])

    const [updateProfile, {isLoading: udpatingProfileLoader}] = useProfileMutation();
    const {data:orders, isLoading:loadingOrders, error: ordersError} = useGetMyOrdersQuery();

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error('Password does not match');
        } else {
            try {
                const res = await updateProfile({name, email, password}).unwrap();
                console.log(res);
                toast.success('Updated successfully');
            } catch (err) {
                console.log(err)
                toast.error(`${err?.data?.message || err.error}`);
            }
        }
    }
    
  return (
    <>       
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex items-center justify-center gap-4">
            <form onSubmit={updateProfileHandler}  className="p-6 flex flex-col gap-8">
                <h3 className="text-2xl">Your Profile</h3>
                <div>
                    <label>Name </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name..." className="input input-bordered w-full " />
                </div>
                <div>
                    <label>Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email...." className="input input-bordered w-full " />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password..." className="input input-bordered w-full " />
                </div>

                <div>
                    <label>Confirm Password </label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="Re-Enter your password..." className="input input-bordered w-full" />
                </div>

                <button type="submit" className="btn-main uppercase"> {udpatingProfileLoader ? (<Loader />) : ('Update') } </button>

            </form>   
        </div>

        <div className="col-span-2 p-4">
        <h3 className="text-2xl mb-4">Your Orders </h3>
   
            {loadingOrders ? (<Loader />) : ordersError ? (<Message error={ordersError?.message || ordersError?.data?.message || "An error occurred"} />) : (
                
                <div className="overflow-x-auto">
                    <table className="table ">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                        </thead>
                        <tbody>

                            {orders.map((x, index) => (
                                <tr key={index}>
                                    <th>{x._id}</th>
                                    <th>{new Date(x.createdAt).toISOString().split('T')[0]}</th>
                                    <th>${x.totalPrice.toFixed(2)}</th>
                                    <th>{x.isPaid ? <FaCheck /> : <FaTimes />}</th>
                                    <th>{x.isDelieverd ? <FaCheck /> : <FaTimes />}</th>
                                    <th><Link to={`/orders/${x._id}`}>Details</Link></th>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

             
        
        
              
            )}
        </div>
        </div>
        
    </>
    
  )
}

export default ProfileScreen