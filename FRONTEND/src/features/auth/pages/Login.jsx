import React from 'react'
import { Link } from 'react-router'
import "../style/login.scss"
import FormGroup from '../component/FormGroup'
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate } from 'react-router';
import{toast} from "react-toastify";
import Loader from '../component/Loader';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {handleLogin,loading,setLoading}=useAuth();
    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        if(!email ||!password){
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true);
        try{
            await handleLogin({email,password});
            navigate("/");
            toast.success("Login Successful");
        }
        catch(error){
            console.log("Error in handleSubmit:", error);
            toast.error(error?.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }
    if(loading){
        return <Loader />;
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <p>Enter your details to login</p>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <FaUserAlt />
                        <FormGroup 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        label="Email" placeholder="Enter your email" />
                    </div>


                    <div className="password-box">
                        <TbPasswordFingerprint />
                        <label htmlFor="Password">Password</label>
                        <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type={showPassword?"text":"password"}
                         id="Password" name="Password" placeholder="Enter your password" />
                        {showPassword ? <FaRegEye onClick={()=>setShowPassword(!showPassword)} /> : <FaRegEyeSlash onClick={()=>setShowPassword(!showPassword)} />}
                    </div>

                    <button type="submit">Login</button>
                    <div className='NewUser'>
                        <hr />
                        <span>New User?</span>
                        <Link to="/register">Register</Link>
                        <hr />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login