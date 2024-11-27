import { useState } from "react";
import {Link} from "react-router-dom";
import Container from "../utils/Container";
import { setCredentials } from "../slices/authSlice";
import {useLoginUserMutation} from '../slices/userApiSlice'; 

import { useDispatch } from "react-redux";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email, password)

    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginUserMutation();

    const loginHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            if(res) {
                dispatch(setCredentials({...res}));

            }
            console.log(res);
        } catch (error) {
            console.log(error); // show toast here
        }        
    }

  return (
    <Container>
        <h1 className="text-xl uppercase text-center my-8 tracking-widest"> Please login to continue </h1>
        <div className="flex items-center justify-center">
            <form onSubmit={loginHandler} className="p-6 flex flex-col gap-8">
                <div>
                    <label>Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>

                <button type="submit" className="btn-main">Sign in</button>
                <Link to={'/register'} className="text-center font-light tracking-widest underline"> Create account </Link>
            </form>   
        </div>

    </Container>
  )
}

export default LoginScreen