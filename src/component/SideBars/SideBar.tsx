import { Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuItemProps } from "../component.interface";
import { AppstoreOutlined, CommentOutlined, DeleteOutlined, FileZipOutlined, StopOutlined, TagsOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/redux.hook";



const Sidebar=()=>{
    const state=useAppSelector((state)=>state.state.value);
    const MenuItem:MenuItemProps[]=[
        {
            icon:<TagsOutlined style={{fontSize:"1.3rem"}} />,
            text:"Pinned",
            notify:1
        },
        {
            icon:<AppstoreOutlined style={{fontSize:"1.3rem"}} />,
            text:"All",
            notify:35
        },
        {
            icon:<CommentOutlined style={{fontSize:"1.3rem"}}/>,
            text:"Chats",
            notify:5
        },
        {
            icon:<FileZipOutlined style={{fontSize:"1.3rem"}}/>,
            text:"Archived",
        },
        {
            icon:<StopOutlined style={{fontSize:"1.3rem"}}/>,
            text:"Blocked",
        },
        {
            icon:<DeleteOutlined style={{fontSize:"1.3rem"}}/>,
            text:"Trash",
        },
    ]
    return (
    <Sider  breakpoint="md"
            width={200}
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            theme="light"
            className="bg-transparent ms-2"
            >
                <Menu   mode="inline"
                        className="glassmorphism rounded-lg flex flex-col items-start p-3 justify-around"
                        >
                    {MenuItem.map((i,k)=>{
                        return<Menu.Item className={`side-menu-item ${state.theme?"dark":"light"}`} key={k}>
                            {i.icon}
                            <span className="me-4">{i.text}</span>
                            <span>{i.notify}</span>
                    </Menu.Item>
                    })}
                </Menu>
    </Sider>
    )
}
export default Sidebar;