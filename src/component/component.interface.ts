import React from "react";
export interface MenuItemProps{
    icon:React.ReactNode,
    text:string,
    onClick?:()=>void,
    notify?:number
}
export interface UserInfo{
    uname:string|undefined|null,
    name:string,
    code:string
}
// eslint-disable-next-line @typescript-eslint/ban-types


