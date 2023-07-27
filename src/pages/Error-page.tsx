import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate=useNavigate();
    const error: unknown = useRouteError()
    return (
      <div
        id='error-page'
        className='flex flex-col gap-8 justify-center items-center h-screen'
      >
        <h1 className='text-4xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-slate-400'>
          <i>
            {(error as Error)?.message ||
              (error as { statusText?: string })?.statusText}
          </i>
        </p>

        <Button onClick={()=>navigate(-1)}>Go Back</Button>
      </div>
    )
  }
  
  export default ErrorPage