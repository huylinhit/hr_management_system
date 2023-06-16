import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";

import OvertimeLog from "../../features/overlog/OvertimeList";
import LeavetimeList from "../../features/leavelog/LeavetimeList";
import MyLeavetime from "../../features/leavelog/MyLeavetime";
import TypeLeavetime from "../../features/leavelog/TypeLeavetime";
import ViewOvertime from "../../features/overlog/ViewOvertime";
import DepartmentPage from "../../features/department/DepartmentPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import DetailOvertime from "../../features/detail_overtime/DetailOvertime";
import DetailLeave from "../../features/detail_leavelog/DetailLeave";
import DetailTicket from "../../features/detail_ticket/DetailTicket";

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
      { path: '/department-list' , element: <DepartmentPage/>},

      
      { path: "/viewot", element: <ViewOvertime /> },
      { path: "/detail-overtime", element: <DetailOvertime /> },

      { path: "/myleavelist", element: <MyLeavetime /> },
      { path: "/leavetime", element: <LeavetimeList /> },
      { path: "/typeleavetime", element: <TypeLeavetime /> },
      { path: "/detail-leave-log", element: <DetailLeave /> },

      { path: "/detail-ticket", element: <DetailTicket /> },
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
