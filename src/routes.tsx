import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import Monitor from './pages/Monitor';

export const routesList = [
  { 
    path: "/", 
    name: "Home",
    to: "/",
    element: <Home/>
  },
  { 
    path: "/monitor/*", 
    to: "/monitor",
    name: "Monitor",
    element: <Monitor/> 
  },
]

export const router = createBrowserRouter(routesList);