import { User } from "firebase/auth";
export interface reply{
    username:string|undefined,
    profileURL:string|undefined,
    msg:string|undefined,
    like:number |null,
}
export interface comment{
        username:string|undefined,
        profileURL:string|undefined,
        msg:string|undefined,
        like:number |null,
        reply:Array<reply>
}
export  interface uploads{
    type:string,
    url:string
}
export type post={
        avatar:string|undefined,
        msg:string | undefined,
        posts:Array<uploads>,
        time:string|undefined,
        name:string|undefined,
        type:string|undefined,
        share:number |null,
        user:User|null|undefined,
        // stories:[],
        comments:Array<comment>,
        // likes:[],
        // dislikes:[],
        isLiked:boolean,
        isDisliked:boolean,
        isShared:boolean,


    }