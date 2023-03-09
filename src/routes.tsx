import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import Monitor from './pages/Monitor';
import SignUp from "./pages/SignUp";

export const routesList = [
  { 
    path: "/", 
    to: "/",
    name: "Home",
    element: <Home/>
  },
  {
    path: "/sign-up",
    to: "/sign-up",
    name: "Sign up",
    element: <SignUp/>
  },
  { 
    path: "/monitor/*", 
    to: "/monitor",
    name: "Monitor",
    element: <Monitor/> 
  },
]

export const router = createBrowserRouter(routesList);