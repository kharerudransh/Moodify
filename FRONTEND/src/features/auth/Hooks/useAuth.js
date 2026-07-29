import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context";
import { useNavigate } from "react-router";
import{login,register,getMe,logout} from "../services/auth.api";
import { toast } from "react-toastify";
import { useSong } from "../../home/hooks/useSong";

export const useAuth=()=>{
    const context=useContext(AuthContext);
    const {playList,setPlayList}=useSong();
    const {user,setUser,loading,setLoading}=context;
    const navigate=useNavigate();
    async function handleRegister({name, username,email,password}){
        setLoading(true);
        try{
            const data=await register({name,username,email,password});
            setUser(data.user);
            navigate("/");
        }
        catch (error) {
            console.log("Error in handleRegister:", error);
           // toast.error(error?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
    }
    async function handleLogin({email,password}){
        setLoading(true);
        try{
            const data=await login({email,password});
            setUser(data.user);
            navigate("/");
        }
        catch (error) {
            console.log("Error in handleLogin:", error);
            throw error;
            //toast.error(error?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
    }
    async function handleLogout(){
        setLoading(true);
        try {
            await logout();
            setUser(null);
            setPlayList([]);
            navigate("/login");
        } catch (error) {
            console.log("Error in handleLogout:", error);
           // toast.error(error?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
    }
    async function handleGetMe(){
        setLoading(true);
        try{
            const data=await getMe();
            setUser(data.user);
        }
        catch (error) {
            console.log("Error in handleGetMe:", error);
            throw error;
           // toast.error(error?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
    }

    return {
        user,
        setUser,
        setLoading,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    };

}