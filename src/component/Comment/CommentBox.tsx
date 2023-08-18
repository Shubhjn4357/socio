import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import { comment } from "../../pages/app/app.interface";

const CommentBox=({comment,allComs}:{key:number,comment:comment,allComs:boolean})=>{
    const {Text}=Typography;
    return <div>
        <div className="w-8/12 py-2">
    <div className="py-1 px-2  glassmorphism border rounded-pill">
                <div className="flex justify-start gap-4">
                  <Avatar src={comment.profileURL} size="large" />
                    <div className="flex flex-col">
                        <Text className="fw-bolder">{comment.username}</Text>
                        <Text ellipsis>{comment.msg}</Text>
                    </div>
                 </div>              
                </div>
                    <div className="flex justify-start ms-4 gap-1 items-center p-2">
                        <Button type="text" icon={ <LikeOutlined />} shape="circle"/>
                        <Button type="text" icon={ <CommentOutlined />} shape="circle"/>     
                    </div>
                </div>
                {comment.reply.slice(0,allComs?comment.reply.length:1).map((rep,k)=>{
                    return <div className=" ms-auto w-8/12" key={k}>
                    <div className="py-1 px-2 glassmorphism border rounded-pill">
                                <div className="flex justify-start gap-4">
                                  <Avatar src={rep.profileURL} size="large" />
                                    <div className="flex flex-col">
                                        <Text className="fw-bolder text-sm">{rep.username}</Text>
                                        <Text className="text-sm" ellipsis>{rep.msg}</Text>
                                    </div>
                                 </div>              
                                </div>
                                    <div className="flex justify-start ms-4 gap-1 items-center p-2">
                                        <Button type="text" icon={ <LikeOutlined />} shape="circle"/>
                                        <Button type="text" icon={ <CommentOutlined />} shape="circle"/>     
                                    </div>
                                </div>
                })}
    </div>
}
export default CommentBox;