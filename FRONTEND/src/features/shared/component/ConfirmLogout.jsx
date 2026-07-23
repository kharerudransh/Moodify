import React from 'react'
import { useAuth } from '../../auth/Hooks/useAuth';
import Loader from './Loader';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import './ConfirmLogout.scss'

const ConfirmLogout = () => {
    const {user , handleLogout, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    
    if(loading)return <Loader/>
    if(!user)return null;

    async function onConfirm(){
        setLoading(true);
        try{
            await handleLogout();
            toast.success("Logged out successfully");
            navigate('/login');
        }
        catch (error) {
            toast.error(error?.message || "Logout failed");
          } finally {
            setLoading(false);
          }
    }
    async function onCancel(){
        setLoading(true);
        navigate(-1);
        setLoading(false);
    }
    

  return (
    <div className='logout-overlay'>
        <div className='logout-modal'>
            <p>Do you want to logout?</p>
            <div className='logout-modal-actions'>
                <button className="confirm" onClick={onConfirm}>Yes</button>
                <button className="cancel" onClick={onCancel}>No</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmLogout