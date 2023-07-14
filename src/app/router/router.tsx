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
import NewContract from "../../features/add_contract/NewContract";

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

import StaffList from "../../features/employee/StaffList";
import EditInfo from "../../features/edit_employee/component/EditInfo";

import MyLeaveList from "../../features/detail_leavelog/MyLeaveList";
import MyLeaveDetails from "../../features/detail_leavelog/MyLeaveDetails";

import OtherLeaveList from "../../features/detail_leavelog/OtherLeaveList";
import LeaveApproval from "../../features/detail_leavelog/LeaveApproval";

import ChipCustome from "../components/Custom/Chip/ChipCustome";
import MyPayroll from "../../features/payslip/component/MyPayroll";
import ViewMyOvertime from "../../features/overlog/ViewMyOvertime";
import TypeCustome from "../components/Custom/Type/TypeCustome";
import DashBoard from "../../features/dashboard/DashBoard";
import Contracts from "../../features/list_contract/Contracts";
import MyOTList from "../../features/detail_overtime/MyOTList";
import OtherOTList from "../../features/detail_overtime/OtherOTList";
import Payslips from "../../features/payslip/Payslips";
import ListContract from "../../features/list_contract/ListContract";
import ListLeave from "../../features/leavelog/ListLeave";
// import Payroll from "../../features/payslip/component/Payroll";
// import PayslipDetail from "../../features/payslip/component/PayslipDetail";

const PrivateRoute = ({ path, element }: any) => {
  const { user } = useAppSelector((state) => state.account);
  const navigate = useNavigate();
  if (!user) {
    return element;
  } else {
    return <Navigate to="/departments" replace={true} />;
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
      // { path: "/list-contract", element: <ListContract/>},
      // { path: "/list-leave", element: <ListLeave /> },

      { path: "/chip", element: <ChipCustome status="approved">here</ChipCustome> },
      {
        path: "/type",
        element: <TypeCustome typeId={3}>Làm thêm ngày nghỉ và ngày lễ</TypeCustome>,
      },
      // { path: "/my-overtime", element: <ViewMyOvertime /> },

      //HR Staff routes
      {
        element: <RequireAuth roles={["HRStaff"]} />,
        children: [
          //Dashboard
          { path: "/dashboard", element: <DashBoard /> },

          // Allowance

          // Department


          // Employee
          // { path: "/register", element: <Register /> },
          // { path: "/employeelist", element: <EmployeeList /> },


          //Xóa
          // { path: "/detail-employee/:id", element: <DetailEmployee /> },
          // { path: "/edit-employee/:id", element: <EditEmployee /> },

          // Candidate
          // { path: "/viewcandidate", element: <ViewCandidate /> },
          // { path: "/detailcandidate/:id", element: <Candidate /> },

          // Department
          // { path: "/departments", element: <DepartmentList /> },
          // { path: "/departments/:id", element: <DepartmentDetails /> },


          // { path: "/staffskills", element: <StaffSkillsList /> },
          // { path: "/deletestaffskill", element: <DeleteStaffSkillFormm /> },

          //payslip
          // { path: "/payslips", element: <Payroll /> },

          //NEW VERSION 13/7 , 8:56PM

          // Contract

          // Overtime
          // { path: "/list-overtime", element: <ViewOvertimeLog /> },
          // { path: "/own-overtime", element: <ViewMyOvertime /> },



          //MyOT
          // { path: "/myovertime", element: <MyViewOvertime /> },

          // Leave
          // { path: "/myleavelist", element: <MyLeavetime /> },
          // { path: "/detail-leave-log/:id", element: <DetailLeave /> },
          // { path: "/detail-own-leave-log", element: <DetailOwnLeave /> },

          // Ticket
          // { path: "/viewothertypes", element: <ViewOtherTypes /> },
          // { path: "/editothertype/:id", element: <EditOtherType /> },
          // { path: "/createtickettype", element: <CreateTicketTypeForm /> },
          // { path: "/detail-own-ticket", element: <DetailOwnTicket /> },
          // { path: "/approveticket", element: <ApproveTicketForm /> },

          // Others
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFound /> },
          { path: "*", element: <Navigate replace to="not-found" /> },

          //Contract
          { path: "/editcontract", element: <EditContract /> },
          // { path: "/contractdetail", element: <ContractDetail /> },
        ],
      },
      { path: "/", element: <HomePage /> },
      { path: "/my-payroll", element: <MyPayroll /> },

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

      // { path: "/employeelist", element: <EmployeeList /> },
      // { path: "/detail-employee/:id", element: <DetailEmployee /> },
      // { path: "/edit-employee/:id", element: <EditEmployee /> },

      // Contract
      // { path: "/list-contract", element: <Contracts /> },



      // Overtime



      //MyOT

      // { path: "/leave-list/:id", element: <MyLeaveDetails /> },

      // Ticket
      // { path: "/viewothertypes", element: <ViewOtherTypes /> },
      // { path: "/editothertype/:id", element: <EditOtherType /> },
      // { path: "/createtickettype", element: <CreateTicketTypeForm /> },
      // { path: "/detail-own-ticket", element: <DetailOwnTicket /> },
      // { path: "/approveticket", element: <ApproveTicketForm /> },

      // Candidate
      // { path: "/viewcandidate", element: <ViewCandidate /> },
      // { path: "/candidates", element: <CandidateList /> },
      // { path: "/candidates/:id", element: <CandidateDetails /> },
      // { path: "/detailcandidate/:id", element: <Candidate /> },

      // Department
      // { path: "/departments", element: <DepartmentList /> },
      // { path: "/departments/:id", element: <DepartmentDetails /> },

      // { path: "/staffskills", element: <StaffSkillsList /> },
      // { path: "/deletestaffskill", element: <DeleteStaffSkillFormm /> },

      //payslip
      // { path: "/payslips", element: <Payroll /> },

      // { path: "/payslips/:payslipId/staffs/:staffId", element: <PayslipDetail /> },


      //department
      { path: "/departments", element: <DepartmentList /> },
      { path: "/departments/:id", element: <DepartmentDetails /> }, 
      //employeee
      { path: "/staffs", element: <StaffList /> },
      { path: "/staffs/:id", element: <EditInfo /> },
      { path: "/create-new-staff", element: <AddNewEmployee /> },
      //candidate

      { path: "/candidates/", element: <CandidateList /> },
      { path: "/candidates/:id", element: <CandidateDetails /> },
      //contract
      { path: "/contracts", element: <Contracts /> },
      { path: "/contracts/:id", element: <DetailContract /> },
      { path: "/edit-contract/:id", element: <EditContract /> },
      { path: "/add-contract/:id", element: <NewContract /> },  
      //ot
      { path: "/other-list-overtime", element: <OtherOTList /> },
      { path: "/detail-overtime-log/:id", element: <DetailOvertime /> },
      { path: "/my-list-overtime", element: <MyOTList /> },
      { path: "/detail-own-overtime-log/:id", element: <DetailOwnOvertime /> },

      //leave
      { path: "/other-leave-list", element: <OtherLeaveList /> },
      { path: "/my-leave-list", element: <MyLeaveList /> },
      { path: "/my-leave-list/:id", element: <MyLeaveDetails /> },
      //other
      { path: "/mytickets", element: <MyTicketList /> },
      { path: "/mytickets/:id", element: <MyTicketDetails /> },
      { path: "/other-users-tickets", element: <OtherUsersTicketList /> },
      { path: "/other-users-tickets/:id", element: <TicketApprovalForm /> },

      //payslip

      { path: "/payslips", element: <Payslips /> },
      { path: "/payslips/:payslipId/staffs/:staffId", element: <PayslipDetail /> },


      // Others
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
