import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";
import OvertimeLog from "../../features/overlog/OvertimeList";
import LeavetimeLog from "../../features/leavelog/LeavetimeList";
import ContractDetails from "../../features/contract/ContractDetails";
import CreateOvertime from "../../features/overlog/CreateOvertime";

import LeavetimeList from "../../features/leavelog/LeavetimeList";
import ViewOvertime from "../../features/overlog/ViewOvertime";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/overtime", element: <OvertimeLog /> },
      //Them router ngay vi tri nay nhe!!
      { path: "/leavetime", element: <LeavetimeLog /> },
      { path: "/contract", element: <ContractDetails /> },
      { path: "/overlog", element: <CreateOvertime /> },
      { path: "/viewoverlog", element: <ViewOvertime /> },
      { path: "/leavelog", element: <LeavetimeList /> },


      

      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
