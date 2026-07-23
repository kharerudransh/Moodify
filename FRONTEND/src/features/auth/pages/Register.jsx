import React from 'react'
import { Link } from 'react-router'
import "../style/register.scss"
import FormGroup from '../component/FormGroup'
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import{useAuth} from "../Hooks/useAuth";
import {useNavigate} from "react-router";
import{toast} from "react-toastify";
import Loader from '../component/Loader';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {handleRegister,loading,setLoading}=useAuth();
    const navigate=useNavigate();
    //use State
    const[name,setName]=useState("");
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");


    async function handleSubmit(e){
        e.preventDefault();
        if(!name ||!username ||!email ||!password){
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true);
        try{
            await handleRegister({name,username,email,password});
            navigate("/");
            toast.success("Registration Successful");
        }
        catch (error) {
            console.log("Error in handleSubmit:", error);
            toast.error(error?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
    }
    if(loading){
        return(<Loader />);
    }
    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Register</h1>
                <p>Welcome to moodify</p>
                <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
                    <div className="user-box">
                        <FaUserAlt />
                        <FormGroup 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        label="Name" placeholder="Enter your name" />
                    </div>
                    <div className="username-box">
                        <MdAlternateEmail />
                        <FormGroup 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        label="Username" placeholder="Enter your username" />
                    </div>

                    <div className="user-box">
                        <HiOutlineMail />
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
                        type={showPassword ? "text" : "password"}
                            id="Password" name="Password" placeholder="Enter your password" />
                        {showPassword ? <FaRegEye onClick={() => setShowPassword(!showPassword)} /> : <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                    </div>


                    <button type="submit">Register</button>
                    <div className='NewUser'>
                        <hr />
                        <span>Already have an account ?</span>
                        <Link to="/login">Login</Link>
                        <hr />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register