import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { User } from 'firebase/auth'


interface GlobalState{
    loggedin?:boolean,
    firstUser?:boolean,
    theme?:string,
    user?:User|null|undefined
}

// Define the initial state using that type
const initialState:{value:GlobalState} = {
  value:{
    loggedin:false,
    firstUser:true,
    theme:'light',
    user:null
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
  },
})

export const { manageState } = globalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const rootState = (state: RootState) => state.state.value

export default globalSlice.reducer