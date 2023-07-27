import { Outlet, useNavigate } from "react-router-dom";
import loginbanner from "../../assets/chat.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import { useAppDispatch } from "../../redux/redux.hook";
import { useEffect } from "react";
import { manageState } from "../../redux/globalReducer";
import { Loader } from "../../component";
const Auth=()=>{
  const [user,loading]=useAuthState(auth);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  useEffect(()=>{
    const checkUser=async()=>{
      if(!loading){
        if(!user){
          return navigate("/auth")
        }
      }
      dispatch(manageState({loggedin:user?true:false}))
      return navigate("/")
    }
    checkUser();
  },[loading,dispatch,navigate,user])
  return (
  <section className="container-fluid bg-login h-screen d-center">
     {loading?<Loader />:<div className="row rounded glassmorphism">
          <div className="hidden md:flex col-md-6">
            <img className="w-[40rem] h-full" src={loginbanner} alt="loginbanner" />
          </div>
          <div className="col-md-6 ">
            <Outlet />
          </div>
      </div>} 
  </section>
  )
}
export default Auth;