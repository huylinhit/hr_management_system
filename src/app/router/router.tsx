import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";

// component
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";

//
import OvertimeLog from "../../features/overlog/OvertimeList";
import ViewOvertimeLog from "../../features/overlog/ViewOvertime";

//
import MyLeavetime from "../../features/leavelog/MyLeavetime";

//
import ViewOtherTypes from "../../features/othertypes/ViewOtherTypes";

//
import DepartmentDetail from "../../features/department/DepartmentDetail";
import DepartmentList from "../../features/department/DepartmentList";
import EditOvertime from "../../features/overlog/EditOvertime";
import EditOtherType from "../../features/othertypes/EditOtherType";




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
      { path: "/editot/:id", element: <EditOvertime /> },
      { path: "/myleavelist", element: <MyLeavetime /> },

      { path: '/viewothertypes' , element: <ViewOtherTypes/>},
      { path: '/editothertype/:id' , element: <EditOtherType/>},
      { path: '/department-list' , element: <DepartmentList/>},
      { path: '/department-detail' , element: <DepartmentDetail />},

      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
