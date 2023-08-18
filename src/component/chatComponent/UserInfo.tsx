import { Button, Form, Input, Modal, message } from "antd"
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useAppSelector } from "../../redux/redux.hook";
import { useForm } from "antd/es/form/Form";
import { UserInfo } from "../component.interface";
import { useEffect, useState } from "react";
import Upload from "antd/es/upload";
import { PlusOutlined, UserOutlined} from "@ant-design/icons";
import useCustomUpload from "../../hooks/useCustomUpload";
import { auth, db } from "../../../firebase.config";
import { collection, doc, query, serverTimestamp, setDoc, where} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { GlobalState } from "../../redux/globalReducer";
interface  close{
  close:()=>void
}
const Userinfo=({close}:close)=>{
    const [form]=useForm<UserInfo>();
    const [updateProfile] = useUpdateProfile(auth);
    const {user}=useAppSelector((state: { state: { value: GlobalState; }; })=>state.state.value);
    const [Uname,setUname]=useState<{
      uname: string|null|undefined;
      error: boolean;
      }>({
      uname:"",
      error:false
    });
    const [previewImage,setPreviewImage]=useState(false)
    const { progress, successData, error,onUpload } = useCustomUpload();
    const collectionRef = collection(db,`users`);
    const snapquery = query(collectionRef,where('uname', '==', Uname.uname));
    const [snapshot,snaploading,snaperror] = useCollection(snapquery,{
      snapshotListenOptions: { includeMetadataChanges: true },
    });
    // Assume you have initialized your Firestore instance as `db`

// Function to check if a username is available
const checkUsernameAvailability=(uname:string|null|undefined)=> {
    setUname({...Uname,uname});
    if (!snaploading && !snaperror) {
      return snapshot?.empty?true:false// Error occurred
    } 
    return false
  }

    const beforeUpload = (file: File) => {
      // You can perform any custom validation here before the actual upload
      // For example, check file size, file type, etc.
      const isFileSizeValid = file.size / 1024 / 1024 < 5; // Limit file size to 5MB
      if (!isFileSizeValid) {
        message.error('File size exceeds the limit (5MB)!');
        return false;
      }
      return true;
    };
    const isValidUsername=(username:string)=> {
      const regex = /^[a-zA-Z0-9_]+$/;
      // Check if the username contains only allowed characters
      if (!regex.test(username)) {
        return false;
      }
      // Check if the username starts with a letter or number (not an underscore)
      if (/^[^a-zA-Z0-9]/.test(username)) {
        return false;
      }
      return true;
    }
    
    
    const onFinish=async(value:UserInfo)=>{
      if(checkUsernameAvailability(value?.uname)){
        setUname({...Uname,error:false})
        updateProfile({displayName:value.name,photoURL:successData?.downloadUrl?successData?.downloadUrl:user?.photoURL});
        if(user?.uid){   
          const data={
              uname:value.uname,
              name:value.name,
              photoUrl:successData?.downloadUrl||user.photoURL,
              createdAt: serverTimestamp(),
              uid:user?.uid,
              messages:[],
              post:[],
          }        
          const collRef=doc(db,`users`,user?.uid);
          await setDoc(collRef,data);
          message.success(`Welcome To The Family,${value.uname}`);
          close();  
      } 
      else{
          console.log("error")
          message.success(`Something Went Wrong, Please Try Again Later`)
      }
        form.resetFields()
    }
    else{
      setUname({...Uname,error:true})
    }
}
    useEffect(()=>{
        form.setFields([
            {name:'name',value:user?.displayName},
        ])      
        successData?.downloadUrl?setPreviewImage(true):null
    },[form, successData?.downloadUrl, user])

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setPreviewImage(false);
    };
    return <section className="absolute w-screen h-screen grid place-items-center top-0 z-50 bg-neutral-800 opacity-90">
        <div className="container w-auto p-4 bg-white rounded-lg glassmorphism">
            <div className="row">
                <div className="col">
                    <span className="py-4 text-lg">Update User Info</span>
                    <Form name="user info"               
                          className="login-form"
                          form={form}
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          scrollToFirstError>
                            <Upload name="file"
                                    listType="picture-circle"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    customRequest={({ file }) => {
                                      if (file instanceof File) {
                                        onUpload(file);
                                      }
                                    }}
                                    onChange={() => {}} // Dummy onChange function to avoid console warnings
                                  >
                                    {successData?.downloadUrl ||user?.photoURL?null:
                                    (typeof progress === 'number'&& progress!==0) ? (
                                        <div>Progress: {progress}%</div>
                                      ) : (
                                      uploadButton
                                    )}
                                  </Upload>
                                  <Modal open={previewImage} title="Image Preview" footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={successData?.downloadUrl||user?.photoURL as string} />
                                  </Modal>
                                  {/* {successData && <div>Download URL: {successData.downloadUrl}</div>} */}
                                  {error && <div>Error: {error.message}</div>}
                                  
                          
                        <Form.Item
                          name="uname"
                          hasFeedback
                          validateStatus={snaploading?"validating":""}
                          rules={[
                          {
                            required: true,
                            message: 'UserName Is Required',
                          },
                          () => ({
                            validator(_, value) {
                              if (!value || isValidUsername(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Invalid User Name'));
                            },
                          }),
                          ]}>
                            
                            <Input bordered={false}  placeholder="UserName"  name="uname"  prefix={"@"}/>
                        </Form.Item>

                          <Form.Item
                          name="name"
                          rules={[
                          {
                            required: true,
                            message: 'Name Is Required',
                          }]}>
                      
                            <Input bordered={false}  placeholder="Name"  name="name"  prefix={<UserOutlined />}/>
                        </Form.Item>
                        <Form.Item>
                            <Button id="update-info" type="primary" className="d-center" shape="round" size="large" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                      </Form>

                </div>
            </div>
        </div>
    </section>
}
export default Userinfo