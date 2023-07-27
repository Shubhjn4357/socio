import  {createBrowserRouter} from "react-router-dom";
import { App, Auth, ErrorPage, SignIn, SignUp } from "./pages";



  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement:<ErrorPage />
    },
    {
      path: "/auth",
      element: <Auth/>,
      errorElement:<ErrorPage />,
      children:[
        {
          path:"",
          element:<SignIn />
        },
        {
          path:"register",
          element:<SignUp />
        }
      ]
    },
  ]);
  export default routes