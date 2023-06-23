import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";

// component
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";

//
import DetailEmployee from "../../features/detail_employee/DetailEmployee";

//
import OvertimeLog from "../../features/overlog/OvertimeList";
import ViewOvertimeLog from "../../features/overlog/ViewOvertime";
import DetailOvertime from "../../features/detail_overtime/DetailOvertime";

//
import MyLeavetime from "../../features/leavelog/MyLeavetime";
import DetailLeave from "../../features/detail_leavelog/DetailLeave";

//
import ViewOtherTypes from "../../features/othertypes/ViewOtherTypes";

//
import DepartmentDetails from "../../features/department/DepartmentDetails";
import DepartmentList from "../../features/department/DepartmentList";

import CreateOtherTypes from "../../features/othertypes/CreateOtherTypes";
import CreateTicketForm from "../../features/othertypes/CreateTicketForm";
import RequireAuth from "./RequireAuth";
import CreateTicketTypeForm from "../../features/othertypes/CreateTicketTypeForm";

import EmployeeList from "../../features/employee/EmployeeList";
import Firststep from "../../features/employee/Firststep";
import EditOtherType from "../../features/othertypes/EditOtherType";
import CreateStaffSkill from "../../features/skills/CreateStaffSkill";
import DeleteStaffSkillFormm from "../../features/skills/DeleteStaffSkillForm";
import MyTicketList from "../../features/othertypes/MyTicketList";
import OtherUsersTicketList from "../../features/othertypes/OtherUsersTicketList";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/departments", element: <DepartmentList /> },
          { path: "/departments/:id", element: <DepartmentDetails /> },
        ],
      },

      { path: "", element: <HomePage /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      //Them router ngay vi tri nay nhe!!
      // Employee
      { path: "/detail-employee", element: <DetailEmployee /> },

      // Overtime
      { path: "/overtime", element: <OvertimeLog /> },
      { path: "/viewot", element: <ViewOvertimeLog /> },
      { path: "/detail-overtime-log/:id", element: <DetailOvertime /> },

      // Leave
      { path: "/myleavelist", element: <MyLeavetime /> },
      { path: "/detail-leave-log/:id", element: <DetailLeave /> },

      // Ticket

      { path: '/viewothertypes' , element: <ViewOtherTypes/>},
      { path: '/editothertype/:id' , element: <EditOtherType/>},
      { path: "/createtickettype", element: <CreateTicketTypeForm /> },
      { path: "/myticketlist", element: <MyTicketList /> },
      { path: "/otherusersticketlist", element: <OtherUsersTicketList /> },


      { path: '/departments' , element: <DepartmentList/>},
      { path: '/department-detail' , element: <DepartmentDetails />},
      { path: "/firststep", element: <Firststep /> },

      { path: '/employeelist' , element: <EmployeeList />},
      { path: '/departments' , element: <DepartmentList/>},
      { path: '/departments/:id' , element: <DepartmentDetails />},

      { path: '/createstaffskill' , element: <CreateStaffSkill />},
      { path: '/deletestaffskill' , element: <DeleteStaffSkillFormm />},



      // Others
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
