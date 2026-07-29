import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../auth/Hooks/useAuth';
import { IoIosLogOut } from "react-icons/io";
import "./Nav.scss"
import Loader from './Loader';
import { useNavigate } from 'react-router';
import { RiFolderMusicFill, RiHomeFill } from "react-icons/ri";
import Home from "../../home/pages/Home"


const Nav = () => {
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    if (loading) return <Loader/>
    if (!user) return null;
    return (
        <nav className='nav-container'>
            <div className="user-profile">
                <CgProfile />
                <p>{user.name}</p>
            </div>
            <div className='home-nav'>
                <button onClick={()=> navigate("/home")}>
                    <RiHomeFill />
                    <p>Home</p>
                </button>
            </div>
            <div className="upload">
                <button onClick={()=> navigate("/upload")}>
                    <RiFolderMusicFill />Upload
                </button>
            </div>
            <div className="logout">
                <button onClick={()=> navigate("/logout")}>
                    <IoIosLogOut />
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Nav