import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";


// import LeavetimeLog from "../../features/leavelog/LeavetimeList";

import MyLeavetime from "../../features/leavelog/MyLeavetime";


import DepartmentDetails from "../../features/department/DepartmentDetails";
// component
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";

//
import OvertimeLog from "../../features/overlog/OvertimeList";
import ViewOvertimeLog from "../../features/overlog/ViewOvertime";


//
import ViewOtherTypes from "../../features/othertypes/ViewOtherTypes";

//
import DepartmentDetail from "../../features/department/DepartmentDetails";
import DepartmentList from "../../features/department/DepartmentList";
import CreateOtherTypes from "../../features/othertypes/CreateOtherTypes";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
       
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      //Them router ngay vi tri nay nhe!!
      { path: "/overtime", element: <OvertimeLog /> },
      { path: "/viewot", element: <ViewOvertimeLog /> },

      { path: "/myleavelist", element: <MyLeavetime /> },

      { path: '/viewothertypes' , element: <ViewOtherTypes/>},
      { path: '/createothertypes' , element: <CreateOtherTypes/>},

      { path: '/departments' , element: <DepartmentList/>},
      { path: '/departments/:id' , element: <DepartmentDetails />},

      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
