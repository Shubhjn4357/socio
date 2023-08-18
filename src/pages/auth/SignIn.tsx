import { Button,Checkbox,Divider,Form,Input} from "antd";
import "./auth.css"
import { EyeInvisibleFilled, EyeTwoTone, InfoCircleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { formfield } from "./auth.interface";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../../../firebase.config";

const SignIn=()=>{
  const [signInWithEmailAndPassword,user] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);
    const [form]=useForm<formfield>();
    const navigate=useNavigate();
  const onFinish=async(value:formfield)=>{
    signInWithEmailAndPassword(value.email,value.password);
    if(user){
      navigate("/")
    }
    form.resetFields()
  }
  const GoogleSignIn=async()=>{
   signInWithGoogle()
    if(googleUser){
      navigate("/")
    }
  }
  return (<section className="auth-card d-center">
          <span className="text-2xl my-2">
            Sign In
          </span>
          <button className="google-button my-2" onClick={GoogleSignIn}>
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
              <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
              <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
              <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
              <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
            </svg>
            Continue with Google
          </button>
         <Divider>OR</Divider>
         <Form  name="Sign Up Form"
                className="login-form"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                scrollToFirstError
                >
         <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
           <Input bordered={false} className="form-input" placeholder="Enter Your Email" name="email"  prefix={<MailOutlined />}/>
           </Form.Item>
           <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
           <Input.Password bordered={false} className="form-input" placeholder="password..." name="password" prefix={<LockOutlined />} iconRender={(visible)=>visible?<EyeInvisibleFilled />:<EyeTwoTone />}/>
           </Form.Item>
            <div className="text-end text-danger">
              <NavLink to="register" className=" text-decoration-none text-sm">Create An Acount?</NavLink>
            </div>
            <Form.Item
              name="Remember"
              valuePropName="checked"
              tooltip={{ title: 'Remember For Next Time', icon: <InfoCircleOutlined /> }}
            >
              <Checkbox>
                Remember Me
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="btn btn-primary d-center bg-slate-500" shape="round" size="large" htmlType="submit">
                Login
              </Button>
            </Form.Item>
         </Form>
        </section>
      
  )
}

export default SignIn;