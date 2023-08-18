import  {createBrowserRouter} from "react-router-dom";
import { App, Auth, ErrorPage, SignIn, SignUp } from "./pages";
import Feed from "./pages/app/Feed";
import { ChatManager } from "./component";



  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: "/",
          element: <Feed/>
        },
        {
          path: "/chat",
          element: <ChatManager/>
        }
      ],
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