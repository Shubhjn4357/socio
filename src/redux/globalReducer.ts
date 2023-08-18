import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'

// interface UserData{
//   uname:string,
//   name:string,
//   avatar:string,
//   createdAt:string,
//   uid:string,
// }
export interface GlobalState{
    loggedin?:boolean,
    firstUser?:boolean,
    theme?:boolean,
    user?:User|null|undefined,
    userData?:DocumentData|null|undefined,
}

// Define the initial state using that type
const initialState:{value:GlobalState} = {
  value:{
    loggedin:false,
    firstUser:true,
    theme:false,
    user:null,
    userData:null
  }
}

export const globalSlice = createSlice({
  name: 'globalState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    manageState: (state, action: PayloadAction<GlobalState>) => {
      state.value={...state.value,...action.payload}
    },
    changeTheme:(state)=>{
      state.value.theme=!state.value.theme;
    }
  },
})

export const { manageState,changeTheme } = globalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const rootState = (state: RootState) => state.state.value

export default globalSlice.reducer