import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { formfield } from "../pages/auth/auth.interface"
import { auth } from "../../firebase.config"
import { FirebaseError } from "firebase/app"
import { GoogleAuthProvider } from "firebase/auth/cordova"


//Register with email and Passowrd
const SignUpWithEmailPassword=async(value:formfield)=>{
    try {
      const credential=await createUserWithEmailAndPassword(auth,value.email,value.password)
      return {credential}
    } catch (error) {
      if(error instanceof FirebaseError){
        console.log(error.message,error.code)
        return {error}
      }
    }
  }

//Login with email and Passowrd
const SignInWithEmailPassword=async(value:formfield)=>{
  try {
    const credential=await signInWithEmailAndPassword(auth,value.email,value.password)
    return {credential}
  } catch (error) {
    if(error instanceof FirebaseError){
      console.log(error.message,error.code)
      return {error}
    }
  }
}
//Create and Login with Google Auth Provider
const GoogleRegister=async()=>{
  
  try{
    const provider=await new GoogleAuthProvider();
    const result=await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log(token)
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    return {credential}
  }
  catch(error){
          // Handle Errors here.
          if(error instanceof FirebaseError){
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error?.customData?.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              console.log(errorCode,errorMessage,email,credential)
              return {error}
          }
          // ...
      }
}
export {SignUpWithEmailPassword,SignInWithEmailPassword,GoogleRegister}