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
import DepartmentPage from "../../features/department/DepartmentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/overtime", element: <OvertimeLog /> },
      //Them router ngay vi tri nay nhe!!
      { path: "/leavetime", element: <LeavetimeList /> },
      { path: "/typeleavetime", element: <TypeLeavetime /> },
      { path: '/department-list' , element: <DepartmentPage/>},

      { path: "/myleavelist", element: <MyLeavetime /> },
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
