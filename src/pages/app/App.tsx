import "./App.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hook";
import { manageState } from "../../redux/globalReducer";
import {  Loader, Navbar, Sidebar, Userinfo } from "../../component";
import { ConfigProvider,Layout,ThemeConfig,theme} from "antd";
import { Content } from "antd/es/layout/layout";
import { collection, query, where} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
const App=() => {
  const [user,loading]=useAuthState(auth);
  const [UserInfo,setOpenUserDetail]=useState(false);
  const {darkAlgorithm,defaultAlgorithm}=theme; 
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const state=useAppSelector((state)=>state.state.value);
  const collectionRef = collection(db,`users`);
  const snapquery = query(collectionRef,where('uid', '==',user?user.uid:""));
    const [snapshot] = useCollection(snapquery,{
      snapshotListenOptions: { includeMetadataChanges: true },
    });
  useEffect(()=>{ 
    const checkUser=async()=>{
      if(!loading){
        if(!user){
          return navigate("/auth")
        }
      }
      if(!user?.displayName || !user?.photoURL||snapshot?.empty){
          setOpenUserDetail(true);
        }
      else{
        setOpenUserDetail(false);
      }
      dispatch(manageState({loggedin:user?true:false,user:user}))
    }
    checkUser();
  },[loading, dispatch, navigate, user, snapshot])
  const lightToken={
    algorithm:defaultAlgorithm,
    "token":{
      "colorText": "rgb(44, 44, 44)",
      "colorPrimary": "rgb(46, 124, 242)",
      "colorBgContainer":"rgb(255,255,255)",
      "fontSize": 15,
      "borderRadius": 8,
      "fontFamily":"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    }
  }
  const darkToken:ThemeConfig={
    algorithm:darkAlgorithm,
    "token":{
      "colorText": "rgb(209, 209, 209)",
      "colorPrimary": "rgb(242, 180, 46)",
      "colorBgContainer":"rgb(36, 36, 36)",
      "fontSize": 15,
      "borderRadius": 8,
      "fontFamily":"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    },
  }
  return (
    <ConfigProvider theme={state.theme?darkToken:lightToken}>
     <Layout className={`layout  ${state.theme?"bg-App-dark":"bg-App"}`}>
      <Content className="text-center">
        {loading?<Loader />:<>
          <Navbar/>
          {UserInfo?<Userinfo close={()=>setOpenUserDetail(false)}/>:""}
          <Layout className="bg-transparent">
            <Sidebar />
            <Outlet />
          </Layout>
        </>}
      </Content>
    </Layout>
    </ConfigProvider>
  )
}

export default App;
