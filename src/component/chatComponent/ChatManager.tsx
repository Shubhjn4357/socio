import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Input, Menu, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import SubMenu from "antd/es/menu/SubMenu";
import ChatBox from "./ChatBox";
import { UserDetail } from "..";

          
const ChatManager=()=>{
    const {Text}=Typography;
    const onSearch=()=>{
        console.log("Search");
    }
    const suffix = (
        
        <SearchOutlined
          style={{
            fontSize: 18,
          }}
        />
      );
      const menuGroup=[
        {
            title:"UnRead",
            child:[
                {
                    avatar:"https://picsum.photos/200",
                    title:"Shubh",
                    totalMessage:5,
                    lastMessage:"This Is A Test message to test Ellipsis"
                },
                {
                    avatar:"https://picsum.photos/200",
                    title:"John",
                    totalMessage:2,
                    lastMessage:"hello world"
                },
                
            ]
        },
        {
            title:"Pinned",
            child:[
                {
                    avatar:"https://picsum.photos/200",
                    title:"Woble",
                    totalMessage:6,
                    lastMessage:"Wats Upp ,Call u later,if urgent drop a message"
                },
                
            ]
        }
      ]
      
      const listOfItems= menuGroup.map((item, key) => {
          return (
            <SubMenu key={key} title={item.title} className="p-2 rounded-2xl">
              {item.child.map((chat, k) => {
                return (
                  <Menu.Item
                    key={`${item.title}-${k}`} // Use a unique key for each item
                    className="rounded-xl px-2 py-7 chat-item"
                  >
                    <Space size={15} className="w-4/5">
                      <Avatar src={chat.avatar} />
                      <span className="flex flex-col items-start">
                        <Text className="m-0">{chat.title}</Text>
                        <Text
                          className="text-ellipsis text-xs text-secondary w-3/5"
                          ellipsis={{ tooltip:chat?.lastMessage }}
                        >
                          {chat.lastMessage}
                        </Text>
                      </span>
                    </Space>
                    <span className="p-2 text-slate-900 rounded-full w-5 h-5 d-center bg-green-600 text-xs">
                      {chat.totalMessage}
                    </span>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
      });
      
    return(
        <Content className="container-fluid p-0 glassmorphism mx-2 rounded-lg">
            <div className="row">
                <div className="col-12 col-lg-3 py-4">
                <Input placeholder="Search"
                        allowClear
                        bordered={false}
                        className="rounded-pill p-2 glassmorphism"
                        size="large"
                        suffix={suffix}
                        onChange={onSearch}
                        />
                <Menu   defaultOpenKeys={['1']}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        className="bg-transparent py-2">
                      {listOfItems}
                           
                </Menu>
                </div>
                <div className="col-12 col-lg-6 px-3 py-4">
                    <ChatBox />
                </div>
                <div className="col-12 col-lg-3 px-3 py-4">
                    <UserDetail />
                </div>
            </div>
        </Content>
    )
}
export default ChatManager;
