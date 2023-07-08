import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../layout/App";

import ServerErrorPage from "../errors/ServerErrorPage";
import NotFound from "../errors/NotFound";

// component
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";

// Employee
import AddNewEmployee from "../../features/add_employee/AddNewEmployee";
import DetailEmployee from "../../features/detail_employee/DetailEmployee";
import EmployeeList from "../../features/employee/EmployeeList";
import EditEmployee from "../../features/edit_employee/EditEmployee";

// Contract
import DetailContract from "../../features/detail_contract/DetailContract";
import ContractList from "../../features/list_contract/ContractList";
import EditContract from "../../features/edit_contract/EditContract";

// Overtime
import ViewOvertimeLog from "../../features/overlog/ViewOvertime";
import DetailOvertime from "../../features/detail_overtime/DetailOvertime";
import MyViewOvertime from "../../features/myoverlog/MyViewOvetime";
import DetailOwnOvertime from "../../features/detail_own_overtime/DetailOwnOvertime";

// Leave
import MyLeavetime from "../../features/leavelog/MyLeavetime";
import DetailLeave from "../../features/detail_leavelog/DetailLeave";
import MyViewLeavetime from "../../features/myleavelog/MyViewLeavetime";
import DetailOwnLeave from "../../features/detail_own_leave/DetailOwnLeave";

// Department
import DepartmentDetails from "../../features/department/DepartmentDetails";
import DepartmentList from "../../features/department/DepartmentList";

// Ticket
import ViewOtherTypes from "../../features/othertypes/ViewOtherTypes";
import CreateOtherTypes from "../../features/othertypes/CreateOtherTypes";
import CreateTicketForm from "../../features/othertypes/CreateTicketForm";
import MyTicketList from "../../features/othertypes/MyTicketList";
import DetailOwnTicket from "../../features/detail_own_ticket/DetailOwnTicket";
import OtherUsersTicketList from "../../features/othertypes/OtherUsersTicketList";
import ApproveTicketForm from "../../features/othertypes/ApproveTicketForm";

// Type
import CreateTicketTypeForm from "../../features/othertypes/CreateTicketTypeForm";
import EditOtherType from "../../features/othertypes/TicketApprovalForm";

//
import ViewCandidate from "../../features/candidate/ViewCadidate";
import CreateCandidate from "../../features/candidate/CreateCandidate";
// import EditCandidate from "../../features/candidate/EditCandidate";
import Candidate from "../../features/candidate/Candidate";

import CreateStaffSkill from "../../features/skills/CreateStaffSkill";
import DeleteStaffSkillFormm from "../../features/skills/DeleteStaffSkillForm";
import TicketApprovalForm from "../../features/othertypes/TicketApprovalForm";
import StaffSkillsList from "../../features/skills/StaffSkillsList";
import Payroll from "../../features/payslip/component/Payroll";
import PayslipDetail from "../../features/payslip/component/PayslipDetail";
import DetailAllowance from "../../features/allowance/DetailAllowance";
import CandidateList from "../../features/candidate/CandidateList";
import CandidateDetails from "../../features/candidate/CandidateDetails";
import MyTicketDetails from "../../features/othertypes/MyTicketDetails";
import HomePage from "../../features/home/HomePage";
import { useAppSelector } from "../store/configureStore";

const PrivateRoute = ({ path, element }: any) => {
  const {user} = useAppSelector(state => state.account);
  const navigate = useNavigate();
  if (!user) {
    return element;
  } else {
    navigate("/departments"); // Redirect to home page if not authenticated
    return null;
  }
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //Login dont need to Authen or Author
      { path: "login", element: <Login /> },
      { path: "/", element: <HomePage /> },

      //HR Staff routes 
      {
        element: <RequireAuth roles={['HRStaff']} />, children: [
          // Allowance

          // Department
          { path: "/departments", element: <DepartmentList /> },
          { path: "/departments/:id", element: <DepartmentDetails /> },

          // Employee
          { path: "/register", element: <Register /> },
          { path: '/employeelist', element: <EmployeeList /> },
          { path: "/detail-employee/:id", element: <DetailEmployee /> },
          { path: "/edit-employee/:id", element: <EditEmployee /> },

          // Candidate
          { path: "/viewcandidate", element: <ViewCandidate /> },
          { path: "/candidates/", element: <CandidateList /> },
          { path: "/candidates/:id", element: <CandidateDetails /> },
          { path: "/detailcandidate/:id", element: <Candidate /> },

          // Department 
          { path: '/departments', element: <DepartmentList /> },
          { path: '/departments/:id', element: <DepartmentDetails /> },
          { path: '/staffskills', element: <StaffSkillsList /> },
          { path: '/deletestaffskill', element: <DeleteStaffSkillFormm /> },

          //payslip
          { path: '/payslips', element: <Payroll /> },
          { path: '/payslips/:payslipId/staffs/:staffId', element: <PayslipDetail /> },


          // Contract
          { path: "/list-contract", element: <ContractList /> },
          { path: "/detail-contract/:id", element: <DetailContract /> },

          // Overtime
          { path: "/viewot", element: <ViewOvertimeLog /> },
          { path: "/detail-overtime-log/:id", element: <DetailOvertime /> },
          { path: "/detail-own-overtime-log/:id", element: <DetailOwnOvertime /> },

          //MyOT
          { path: "/myovertime", element: <MyViewOvertime /> },

          //MyLeavetime
          { path: "/myleavetime", element: <MyViewLeavetime /> },

          // Leave
          { path: "/myleavelist", element: <MyLeavetime /> },
          { path: "/detail-leave-log/:id", element: <DetailLeave /> },
          { path: "/detail-own-leave-log/", element: <DetailOwnLeave /> },

          // Ticket
          { path: '/viewothertypes', element: <ViewOtherTypes /> },
          { path: '/editothertype/:id', element: <EditOtherType /> },
          { path: "/createtickettype", element: <CreateTicketTypeForm /> },
          { path: "/mytickets", element: <MyTicketList /> },
          { path: "/mytickets/:id", element: <MyTicketDetails /> },
          { path: "/detail-own-ticket", element: <DetailOwnTicket /> },
          { path: "/otheruserstickets", element: <OtherUsersTicketList /> },
          { path: "/otheruserstickets/:id", element: <TicketApprovalForm /> },
          { path: "/approveticket", element: <ApproveTicketForm /> },

          // Others
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFound /> },
          { path: "*", element: <Navigate replace to="not-found" /> },

          //Contract
          { path: "/editcontract", element: <EditContract /> },
          { path: "/contractdetail", element: <DetailContract /> },
        ]
      },
      { path: "/", element: <HomePage /> },

      //Staff routes 
      // {
      //   element: <RequireAuth roles={['Staff']} />, children: [

      //   ]
      // },

      { path: "login", element: <PrivateRoute element={<Login />} /> },
      { path: "register", element: <Register /> },

      //Them router ngay vi tri nay nhe!!
      // Allowance

      // Employee
      { path: "/create-new-employee", element: <AddNewEmployee /> },
      { path: "/employeelist", element: <EmployeeList /> },
      { path: "/detail-employee/:id", element: <DetailEmployee /> },
      { path: "/edit-employee/:id", element: <EditEmployee /> },

      // Contract
      { path: "/list-contract", element: <ContractList /> },
      { path: "/detail-contract/:id", element: <DetailContract /> },
      { path: "/edit-contract/:id", element: <EditContract /> },

      // Overtime
      { path: "/viewot", element: <ViewOvertimeLog /> },
      { path: "/detail-overtime-log/:id", element: <DetailOvertime /> },
      { path: "/detail-own-overtime-log/:id", element: <DetailOwnOvertime /> },

      //MyOT
      { path: "/myovertime", element: <MyViewOvertime /> },

      //MyLeavetime
      { path: "/myleavetime", element: <MyViewLeavetime /> },

      // Leave
      { path: "/myleavelist", element: <MyLeavetime /> },
      { path: "/detail-leave-log/:id", element: <DetailLeave /> },
      { path: "/detail-own-leave-log/", element: <DetailOwnLeave /> },

      // Ticket
      { path: "/viewothertypes", element: <ViewOtherTypes /> },
      { path: "/editothertype/:id", element: <EditOtherType /> },
      { path: "/createtickettype", element: <CreateTicketTypeForm /> },
      { path: "/mytickets", element: <MyTicketList /> },
      { path: "/mytickets/:id", element: <MyTicketDetails /> },
      { path: "/detail-own-ticket", element: <DetailOwnTicket /> },
      { path: "/otheruserstickets", element: <OtherUsersTicketList /> },
      { path: "/otheruserstickets/:id", element: <TicketApprovalForm /> },
      { path: "/approveticket", element: <ApproveTicketForm /> },

      // Candidate
      { path: "/viewcandidate", element: <ViewCandidate /> },
      { path: "/candidates", element: <CandidateList /> },
      { path: "/candidates/:id", element: <CandidateDetails /> },
      { path: "/detailcandidate/:id", element: <Candidate /> },

      // Department
      { path: "/departments", element: <DepartmentList /> },
      { path: "/departments/:id", element: <DepartmentDetails /> },

      { path: "/staffskills", element: <StaffSkillsList /> },
      { path: "/deletestaffskill", element: <DeleteStaffSkillFormm /> },

      //payslip
      { path: '/payslips' , element: <Payroll/>},
      { path: '/payslips/:payslipId/staffs/:staffId' , element: <PayslipDetail/>},


      // Others
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
