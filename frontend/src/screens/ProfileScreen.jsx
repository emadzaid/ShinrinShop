import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useProfileMutation } from "../slices/userApiSlice";

import Loader from "../components/Loader";
import Title from "../components/Title";
import { toast } from "react-toastify";


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
        <div className="flex items-center justify-center gap-4">
            <form onSubmit={updateProfileHandler}  className="p-6 flex flex-col gap-8">
                <Title text1={'MY'} text2={'PROFILE'} className={'text-2xl my-2'} />
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
       
  )
}

export default ProfileScreen