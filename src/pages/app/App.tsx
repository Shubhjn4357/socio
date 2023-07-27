import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../../redux/redux.hook";
import { manageState } from "../../redux/globalReducer";
import { Loader } from "../../component";
import { Button, ConfigProvider,Layout,ThemeConfig, Typography, theme} from "antd";
import { Content } from "antd/es/layout/layout";
const App=() => {
  const [user,loading]=useAuthState(auth);
  const {Text}=Typography;
  const {darkAlgorithm,defaultAlgorithm}=theme; 
  const [isDark,setDark]=useState("light");
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
  const lightToken={
    algorithm:defaultAlgorithm,
    "token":{
      "colorText": "rgb(46, 124, 242)",
      "colorPrimary": "rgb(46, 124, 242)",
      "fontSize": 15,
      "borderRadius": 8,
      "fontFamily":"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    },
  }
  const darkToken:ThemeConfig={
    algorithm:darkAlgorithm,
    "token":{
      "colorText": "rgb(242, 180, 46)",
      "colorPrimary": "rgb(242, 180, 46)",
      "fontSize": 15,
      "borderRadius": 8,
      "fontFamily":"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    },
  }
  return (
    <ConfigProvider theme={isDark==="dark"?darkToken:lightToken}>
     <Layout className="layout">
      <Content className="d-center h-screen">
        {loading?<Loader />:<div>
          <Text>welcome</Text>
          <Button type="primary" onClick={()=>setDark((pre)=>pre==="light"?"dark":"light")}>Theme {isDark}</Button>
        </div>}
      </Content>
    </Layout>
    </ConfigProvider>
  )
}

export default App;
