import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";
import OvertimeLog from "../../features/overlog/OvertimeList";

// import LeavetimeLog from "../../features/leavelog/LeavetimeList";
import LeavetimeList from "../../features/leavelog/LeavetimeList";
import MyLeavetime from "../../features/leavelog/MyLeavetime";
import TypeLeavetime from "../../features/leavelog/TypeLeavetime";
import ViewOvertime from "../../features/overlog/ViewOvertime"; 
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import DepartmentDetails from "../../features/department/DepartmentDetails";
import DepartmentList from "../../features/department/DepartmentList";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
       
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      //Them router ngay vi tri nay nhe!!
      { path: "/leavetime", element: <LeavetimeList /> },
      { path: "/typeleavetime", element: <TypeLeavetime /> },
      { path: "/myleavelist", element: <MyLeavetime /> },

      { path: "/overtime", element: <OvertimeLog /> },
      { path: "/viewot", element: <ViewOvertime /> },

      { path: '/departments' , element: <DepartmentList/>},
      { path: '/departments/:id' , element: <DepartmentDetails />},

      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
