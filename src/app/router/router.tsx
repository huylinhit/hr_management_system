import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";
import OvertimeLog from "../../features/overlog/OvertimeList";

// import LeavetimeLog from "../../features/leavelog/LeavetimeList";

import MyLeavetime from "../../features/leavelog/MyLeavetime";

import ViewOvertime from "../../features/overlog/ViewOvertime";
import DepartmentPage from "../../features/department/DepartmentPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import ViewOtherTypes from "../../features/othertypes/ViewOtherTypes";
import EditOtherType from "../../features/othertypes/EditOtherType";
import EditOvertime from "../../features/overlog/EditOvertime";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/overtime", element: <OvertimeLog /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      //Them router ngay vi tri nay nhe!!
     
      
      { path: "/viewot", element: <ViewOvertime /> },
      { path: "/editot/:id", element: <EditOvertime /> },
      { path: '/department-list' , element: <DepartmentPage/>},
      { path: '/viewothertypes' , element: <ViewOtherTypes/>},
      { path: '/editothertype/:id' , element: <EditOtherType/>},
      { path: "/myleavelist", element: <MyLeavetime /> },
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
