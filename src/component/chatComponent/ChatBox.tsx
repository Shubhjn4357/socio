import { MehOutlined,  MessageOutlined ,SearchOutlined, SendOutlined, StepBackwardOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Layout, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../../../firebase.config";
import { addDoc, collection,  serverTimestamp } from "firebase/firestore";
import { useForm } from "antd/es/form/Form";
import { useAppSelector } from "../../redux/redux.hook";
const ChatBox=()=>{
    const {user}=useAppSelector((state)=>state.state.value);
    const {Title,Paragraph}=Typography;
    const [form]=useForm();
    const [snapshot] = useCollection(
        collection(db,`user/${user?.uid}/messages`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
    const onFinish=async(value:{msg:string})=>{     
        console.log(user?.uid)  
        if(user?.uid){   
            const data={
                message:value.msg,
                name: user?.displayName,
                avatar: user?.photoURL,
                createdAt: serverTimestamp(),
                uid:user?.uid,
            }        
            const docRef=await addDoc(collection(db,`user/${user.uid}/messages`),data)
            
            // const ref=await setDoc(docRef, data);
            console.log(docRef)
        } 
        else{
            console.log("error")
        }
        form.resetFields()
    }
    return <Layout className="glassmorphism rounded-2xl">
        <Header className=" bg-transparent p-2">
            <nav className="flex items-center justify-between p-2">
                <div className="d-center">
                    <Button shape="circle" className="d-center" type="text" icon={<StepBackwardOutlined/>}/>
                    <Button className="d-center" type="text">
                        <Title className="m-0" level={4}>Shubh</Title>
                    </Button>
                </div>
                <Space className="d-center">
                    <Button shape="circle"  className="d-center" type="text" icon={<SearchOutlined/>}/>
                    <Button shape="circle"  className="d-center" type="text" icon={<MehOutlined/>}/>
                </Space>
            </nav>
        </Header>
        <Content className="chat-content">
            <div className="">
            {snapshot?.docs.map((doc) => {
                const {avatar,message,uid}=doc.data()
              return <div key={doc.id} className={`message ${user?.uid===uid?"sent":"recieve"}`}>
              {avatar?<Avatar size="small" className="avatar" src={avatar}/>:""}
              <Paragraph className="message-content dark">
                  {message}
              </Paragraph>
             
          </div>
            })}
                {/* <div className="message recieve">
                    <Avatar size="small" className="avatar" src="https://picsum.photos/200"/>
                    <Paragraph  className="message-content light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus saepe qui, blanditiis dolorem mollitia adipisci enim ex sequi ipsa obcaecati animi laudantium quod velit exercitationem asperiores, porro error, a eaque.
                    </Paragraph>
                </div>*/}
                 
            </div>
        </Content>
        <Footer className="bg-transparent px-4 py-0">          
                <Form form={form} initialValues={{ remember: true }} onFinish={onFinish} scrollToFirstError className="d-center justify-between">
                    <Form.Item className="w-full" name="msg"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Empty Message Cannot be send',
                                    },
                                ]}>
                        <Input type="text" className="chat-input" placeholder="write Here" name="msg" prefix={<MessageOutlined />}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" size="large" type="text" className="d-center" shape="circle"><SendOutlined /></Button>
                    </Form.Item>
                </Form>            
        </Footer>
    </Layout>

}
export default ChatBox;