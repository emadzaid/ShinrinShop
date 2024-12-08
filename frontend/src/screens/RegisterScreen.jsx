import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Link} from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Container from "../utils/Container";
import Loader from "../components/Loader";

import { useRegisterUserMutation } from "../slices/userApiSlice";
import {toast} from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect); 
        }
    }, [redirect, navigate, userInfo])

    const [registerUserApiCall, {isLoading}] = useRegisterUserMutation();
    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            if(password !== confirmPassword) {
                toast.error('Password does not match');

            } else {
                const res = await registerUserApiCall({name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
            }
     
        } catch (err) {
            toast.error(`${err?.data?.message || err.error}`);
        }

    }

  return (
    <Container>
        <h1 className="text-xl uppercase text-center my-8 tracking-widest"> Please register to continue </h1>
        <div className="flex items-center justify-center">
            <form onSubmit={registerHandler} className="p-6 flex flex-col gap-8">
                <div>
                    <label>Name </label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name..." className="input input-bordered w-full max-w-xs mt-2" />
                </div>
                <div>
                    <label>Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email...." className="input input-bordered w-full max-w-xs mt-2" />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password..." className="input input-bordered w-full max-w-xs mt-2" />
                </div>

                <div>
                    <label>Confirm Password </label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="Re-Enter your password..." className="input input-bordered w-full max-w-xs mt-2" />
                </div>

                <button type="submit" className="btn-main"> Sign up </button>
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-center font-light tracking-widest underline"> {isLoading ? (<Loader />) : ('Sign in')}  </Link>

            </form>   
        </div>

    </Container>
  )
}

export default RegisterScreen;