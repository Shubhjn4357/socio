// useCustomUpload.ts
import { useState } from 'react';
import 'firebase/firestore';
import { CustomUploadHook, UploadError, UploadState, UploadSuccess } from './hooks.interface';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';
import { message } from 'antd';

const useCustomUpload = (): CustomUploadHook => {
  const [progress, setProgress] = useState<number>(0);
  const [state, setState] = useState<UploadState>({
    percent:0
  });

  const onSuccess = (downloadUrl: string) => {
    setState({ downloadUrl });
  };

  const onError = (message: string) => {
    setState({ message });
  };
  const metadata = {
    contentType: 'image/jpeg',
  };
  
  const onUpload = async (file: File) => {
    setState({ percent: 0 });
    try {
      const ImageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(ImageRef, file, metadata);


      uploadTask.on(
        'state_changed',
        (snapshot: {
          state: string; bytesTransferred: number; totalBytes: number; 
}) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              message.warning("Upload Paused")
              break;
            case 'running':
              message.loading('Upload is running');
              break;
          }
      
          setProgress(progress); 
        },
        (error: UploadError) => {
          console.log(error)
          message.error("Error Uploading File")
          onError('Error uploading file!');
        },
        async () => {
          try {
            // Get the download URL of the uploaded file
            
            
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                onSuccess(downloadURL);
              });
           
          } catch (error) {
            onError('Error getting download URL!');
          }
        }
      );
    } catch (error) {
      onError('Error uploading file!');
    }
};

  return {
    progress: progress,
    successData: (state as UploadSuccess).downloadUrl ? (state as UploadSuccess) : null,
    error: (state as UploadError).message ? (state as UploadError) : null,
    onUpload,
  };
}

export default useCustomUpload;
