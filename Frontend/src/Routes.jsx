import Home from "./components/Home";
import Hotels from "./pages/Hotels";
import Parks from "./pages/parks";
import Beaches from "./pages/Beaches";
import AddServicePage from "./pages/AddServicePage";
import Signup from "./components/signup";
import Login from "./components/login";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/parks",
    element: <Parks />,
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
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;