import Home from "./components/home";
import Hotels from "./pages/Hotels";
import Parks from "./pages/parks";
import Beaches from "./pages/Beaches";
import AddServicePage from "./pages/AddServicePage";
import Signup from "./components/signup"
import Login from "./components/login";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
      {
        path: "/hotels",
        element: <Hotels />,
      },
      {
        path: "/parks",
        element: <Parks/>,
      },
      {
        path: "/beaches",
        element: <Beaches />,
      },
      {
        path: "/add-service",
        element: <AddServicePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      }

    
]


export default routes;
