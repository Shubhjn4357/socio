import { BellOutlined, MessageOutlined, PhoneOutlined, PieChartOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, Switch, Typography } from "antd";
import { Header } from "antd/es/layout/layout"
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../../redux/redux.hook";
import { changeTheme } from "../../redux/globalReducer";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import { AppDispatch } from "../../redux/store";
const Navbar=()=>{
    const {Title,Paragraph}=Typography;
    const [signOut] =useSignOut(auth);
    const dispatch:AppDispatch=useAppDispatch();
    const state=useAppSelector((state)=>state.state.value);
    const logOut=async()=>{
        await signOut()
    } 
    const navLinks=[
        {
            text:"Feeds",
            link:"/",
            icon:<PieChartOutlined />,
            active:false,
            notification:false
        },
        {
            text:"contact",
            link:"/contact",
            icon:<UserOutlined />,
            active:false,
            notification:false
        },
        {
            text:"Chats",
            link:"/chat",
            icon:<MessageOutlined />,
            active:false,
            notification:false
        },
        {
            text:"Setting",
            link:"/setting",
            icon:<SettingOutlined />,
            active:false,
            notification:false
        },
    ]
    return(
        <Header  className="flex justify-between items-center m-2 rounded glassmorphism">
            <nav className="d-center">
                <NavLink to="/" className="text-decoration-none">
                    <Title className="m-0 p-1" level={2}>Socio</Title>
                </NavLink>
                <div className="flex ms-4 absolute top-0 right-0 flex-col lg:relative lg:flex-row">
                {navLinks.map((i,k)=>{
                    return <NavLink
                    to={i.link}
                    key={k}
                    className={`${({ isActive,isPending }:{isActive:boolean,isPending:boolean}) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    } mx-2`}
                    >
                    <Button icon={i.icon} type="text" size="large">{i.text}</Button>
                </NavLink>
                })}
                </div>        
            </nav>
            <Space size={30}>
                <Space size={20} align="center">
                    <Switch className="bg-primary" onChange={()=>dispatch(changeTheme())}/>
                    <Button type="text" icon={<PhoneOutlined  style={{fontSize:"1.3rem"}} />}/>
                    <Button type="text" icon={<BellOutlined  style={{fontSize:"1.3rem"}} />}/>
                </Space>
                <Space size={20} className="d-center">
                    <div  className="flex justify-center items-end flex-col">
                        <Title className="m-0" level={5}>Hello ,{state.user?.displayName}</Title>
                        <Paragraph className="m-0" type="secondary">{state.user?.phoneNumber}</Paragraph>
                    </div>
                    <Dropdown   placement="bottom" 
                                arrow={{ pointAtCenter: true }}
                                dropdownRender={() => (
                                    <Button type="primary" danger onClick={logOut}>Log Out</Button>
                                     )}>
                    <Avatar  size="large" src={state.user?.photoURL?state.user?.photoURL:"https://i.pravatar.cc/100"}/>
                    </Dropdown>
                </Space>
            </Space>     
        </Header>        
    )
}
export default Navbar