import { Avatar, Button, Input } from "antd";
import { useAppSelector } from "../../redux/redux.hook";
import { FileExclamationOutlined,  FileImageOutlined } from "@ant-design/icons";
import FeedCard from "../../component/FeedComponent/FeedCard";
import CustomIcon from "../../component/customs/CustomIcon";
const Feed=()=>{
    const {user}=useAppSelector(state=>state.state.value)
    const post=[
        {
            avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            msg:"This is the msg of the post",
            posts:[
                {type:'image',url:"https://picsum.photos/200"},
                {type:'video',url:"https://picsum.photos/200"},
            ],
        
            time:"12:00 PM",
            name:"<NAME>",
            type:"image",
            share:0,
            user:user,
            // stories:[],
            comments:[
                {
                    username:"shubh",
                    profileURL:"https://picsum.photos/200",
                    msg:"helllo shubh",
                    like:0,
                    reply:[
                        {
                            username:"shubh",
                            profileURL:"https://picsum.photos/200",
                            msg:"helllo shubh",
                            like:1,
                        },
                        {
                            username:"shubh",
                            profileURL:"https://picsum.photos/200",
                            msg:"helllo shubh",
                            like:1,
                        }

                    ]
                },
                {
                    username:"shubh",
                    profileURL:"https://picsum.photos/200",
                    msg:"helllo shubh",
                    like:0,
                    reply:[
                        {
                            username:"shubh",
                            profileURL:"https://picsum.photos/200",
                            msg:"helllo shubh",
                            like:1,
                        },
                        {
                            username:"shubh",
                            profileURL:"https://picsum.photos/200",
                            msg:"helllo shubh",
                            like:1,
                        }

                    ]
                }
            ],
            // likes:[],
            // dislikes:[],
            isLiked:false,
            isDisliked:false,
            isShared:false,
        }
    ];
    const {TextArea}=Input;
    const FeedButton=[
        {
            text:"Camera",
            icon:<CustomIcon icon='fa fa-home' width={24} height={24} fill={"#fff"}/>,
            command:()=>{},
        },
        {
            text:"Images/Video",
            icon:<FileImageOutlined className="text-green-500 text-xl"/>,
            command:()=>{},
        },
        {
            text:"Feeling/Activity",
            icon:<FileExclamationOutlined className="text-yellow-500 text-xl"/>,
            command:()=>{},
        },
    ]
    return <>

        <div className="container glassmorphism m-1">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="feed-form glassmorphism shadow-lg rounded-xl p-4">
                        <div className="d-center gap-2">
                            <Avatar src={user?.photoURL} size={"large"}/>
                            <TextArea bordered={false} maxLength={50} className="feed-input rounded-pill glassmorphism" placeholder={`Whats On Your Mind ${user?.displayName}`}/>
                        </div>
                        <div className="flex p-2">
                            {FeedButton.map((i,k)=><Button key={k} onClick={i.command} type="text" icon={i.icon} size="large" className="w-full d-center text-lg fw-bolder btn-bounce">
                                {i.text}
                            </Button>)}
                        </div>
                    </div>
                    {post.map((i,k)=>{
                        return <FeedCard key={k} item={i} allComs={false}/>
                })}
                </div>
                <div className="col-12 col-lg-4">
                    ref
                </div>
            </div>
        </div>
    </>
}
export default Feed;