import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Link} from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import {useLoginUserMutation} from '../slices/userApiSlice'; 
import { useDispatch, useSelector } from "react-redux";

import Container from "../utils/Container";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    }, [redirect, redirect, userInfo])


    const [login, {isLoading}] = useLoginUserMutation();

    const loginHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            if(res) {
                dispatch(setCredentials({...res}));
            }
        } catch (err) {
           toast.error(`${err?.data?.message || err.error}`);
        }        
    }

  return (
    <Container>
        <h1 className="text-xl uppercase text-center my-8 tracking-widest"> Please login to continue </h1>
        <div className="flex items-center justify-center">
            <form onSubmit={loginHandler} className="p-6 flex flex-col gap-8">
                <div>
                    <label>Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email...." className="input input-bordered w-full max-w-xs mt-2" />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password...." className="input input-bordered w-full max-w-xs mt-2" />
                </div>

                <button type="submit" className="btn-main"> {isLoading  ? (<Loader />) : ('Sign in')} </button>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-center font-light tracking-widest underline"> Create account </Link>

            </form>   
        </div>

    </Container>
  )
}

export default LoginScreen