import {
  createBrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import Monitor from './pages/Monitor';

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/monitor", element: <Monitor/> },
]);

export {
  router
};