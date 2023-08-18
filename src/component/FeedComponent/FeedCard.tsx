import { CommentOutlined, FileImageOutlined, LikeOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Row, Typography } from "antd";
import CommentBox from "../Comment/CommentBox";
import { post } from "../../pages/app/app.interface";

const FeedCard=({item,allComs}:{key:number,item:post,allComs:boolean})=>{
    const {Title,Paragraph,Text}=Typography;
    return <Card    hoverable 
                    className="glassmorphism mx-auto pt-2"
                    title={<div className="flex justify-between">
                        <div className="flex gap-2">
                            <Avatar src={item.avatar} size="large"/>
                            <div className="d-center flex-col">
                                <Title className="m-0" level={5}>{item.name}</Title>
                                <Paragraph className="text-secondary">{item.time}</Paragraph>
                            </div>
                        </div>
                        <div className="gap-2">
                            <Button type="text" icon={<FileImageOutlined className="text-green-500 text-xl"/>} size="large" shape="circle" className="w-full d-center text-lg fw-bolder btn-bounce"/>
                        </div>
                    </div>}
                    >
                <Paragraph className="text-start">{item.msg}</Paragraph>
                    <Row className="posts" gutter={2}>
                        <Col span={12}>
                            {item.type=="image"&&<img src={item.image} className="w-100 rounded-lg"/>}
                        </Col>
                        <Col span={12}>
                            {item.type=="image"&&<img src={item.image} className="w-100 rounded-lg"/>}
                        </Col>
                    </Row>

                <div className="flex justify-between mt-1">
                    <div className="d-center gap-1">
                        <Button type="text" icon={<LikeOutlined className=" text-xl"/>} size="large" shape="circle" className="w-full d-center text-lg fw-bolder btn-bounce"/>
                        <Button type="text" icon={<CommentOutlined className="text-xl"/>} size="large" shape="circle" className="w-full d-center text-lg fw-bolder btn-bounce"/>
                    </div>
                    <Button type="text" icon={<ShareAltOutlined className=" text-xl"/>} size="large" shape="circle" className="w-full d-center text-lg fw-bolder btn-bounce"/>
                </div>
                <Divider className="m-1" />
                <div className="glassmorphism rounded-2xl max-h-50 py-2 px-4 text-start">
                    <Text className="underline hover:underline-offset-2">view more Comment</Text>
                    {item.comments.slice(0,allComs?item.comments.length:1).map((c,ck)=>{
                        return <CommentBox  key={ck} comment={c} allComs={allComs}/>
                    })}
                </div>
</Card>
}
export default FeedCard;