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

// Contract
import DetailContract from "../../features/detail_contract/DetailContract";
import EditContract from "../../features/edit_contract/EditContract";
import NewContract from "../../features/add_contract/NewContract";

// Overtime
import DetailOvertime from "../../features/detail_overtime/DetailOvertime";
import DetailOwnOvertime from "../../features/detail_own_overtime/DetailOwnOvertime";

// Leave

// Department
import DepartmentDetails from "../../features/department/DepartmentDetails";
import DepartmentList from "../../features/department/DepartmentList";

// Ticket
import MyTicketList from "../../features/othertypes/MyTicketList";
import OtherUsersTicketList from "../../features/othertypes/OtherUsersTicketList";

// Type

//
// import EditCandidate from "../../features/candidate/EditCandidate";

import TicketApprovalForm from "../../features/othertypes/TicketApprovalForm";
import PayslipDetail from "../../features/payslip/component/PayslipDetail";
import CandidateList from "../../features/candidate/CandidateList";
import CandidateDetails from "../../features/candidate/CandidateDetails";
import MyTicketDetails from "../../features/othertypes/MyTicketDetails";
import HomePage from "../../features/home/HomePage";
import { useAppSelector } from "../store/configureStore";

import StaffList from "../../features/employee/StaffList";
import EditInfo from "../../features/edit_employee/EditInfo";

import MyLeaveList from "../../features/detail_leavelog/MyLeaveList";
import MyLeaveDetails from "../../features/detail_leavelog/MyLeaveDetails";

import OtherLeaveList from "../../features/detail_leavelog/OtherLeaveList";

import ChipCustome from "../components/Custom/Chip/ChipCustome";
import MyPayroll from "../../features/payslip/component/MyPayroll";
import TypeCustome from "../components/Custom/Type/TypeCustome";
import DashBoard from "../../features/dashboard/DashBoard";
import Contracts from "../../features/list_contract/Contracts";
import MyOTList from "../../features/detail_overtime/MyOTList";
import OtherOTList from "../../features/detail_overtime/OtherOTList";
import Payslips from "../../features/payslip/Payslips";
import Payroll from "../../features/payslip/component/Payroll";
import LeaveApproval from "../../features/detail_leavelog/LeaveApproval";
import DetailLeave from "../../features/detail_leavelog/DetailLeave";
import LeaveDetail from "../../features/detail_leavelog/component/LeaveDetail";
import DetailEmployee from "../../features/detail_employee/DetailEmployee";
import DetailOvertime2 from "../../features/detail_overtime/component/DetailOvertime";
import DetailMyOT from "../../features/detail_overtime/DetailMyOT";
import MyPayslips from "../../features/payslip/MyPayslips";
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

      // Staff routes
      {
        element: <RequireAuth roles={['Staff']} />, children: [
          { path: "/own-log-leaves", element: <MyLeaveList /> },
          { path: "/own-log-leaves/:id", element: <MyLeaveDetails /> },
          { path: "/own-log-overtimes", element: <MyOTList /> },
          { path: "/own-log-overtimes/:id", element: <DetailMyOT /> },
          { path: "/own-tickets", element: <MyTicketList /> },
          { path: "/own-tickets/:id", element: <MyTicketDetails /> },
          // { path: "/own-payslips", element: <MyPayslips /> },
          // { path: "/own-payslips:payslipId/staffs/:staffId", element: <PayslipDetail /> },
        ]
      },
      //HR Staff routes
      {
        element: <RequireAuth roles={["HRStaff"]} />,
        children: [
          //Dashboard
          { path: "/dashboard", element: <DashBoard /> },
          { path: "/other-leave-list/:id", element: <LeaveApproval /> },
          // Others
          //department
          { path: "/departments", element: <DepartmentList /> },
          { path: "/departments/:id", element: <DepartmentDetails /> },
          //employeee
          { path: "/staffs", element: <StaffList /> },
          { path: "/staffs/:id", element: <EditInfo /> },
          { path: "/staffs/add", element: <AddNewEmployee /> },

          //candidate

          { path: "/candidates/", element: <CandidateList /> },
          { path: "/candidates/:id", element: <CandidateDetails /> },
          //contract
          { path: "/contracts", element: <Contracts /> },
          { path: "/contracts/:id/staffs/:staffid", element: <DetailContract /> },
          { path: "/contracts/:id/edit", element: <EditContract /> },
          { path: "/contracts/staffs/:id/add", element: <NewContract /> },

          //leave
          { path: "/log-leaves", element: <OtherLeaveList /> },
          { path: "/log-leaves/:id/staffs/:staffid", element: <LeaveApproval /> },
          { path: "/own-log-leaves", element: <MyLeaveList /> },
          { path: "/own-log-leaves/:id", element: <MyLeaveDetails /> },

          //ot
          { path: "/log-overtimes", element: <OtherOTList /> },
          // { path: "/log-overtimes/:id", element: <DetailOvertime /> },
          { path: "/log-overtimes/:id/staffs/:staffid", element: <DetailOvertime2 /> },
          { path: "/own-log-overtimes", element: <MyOTList /> },
          { path: "/own-log-overtimes/:id", element: <DetailMyOT /> },
          // { path: "/own-log-overtimes/:id", element: <DetailOwnOvertime /> },

          //other
          { path: "/own-tickets", element: <MyTicketList /> },
          { path: "/own-tickets/:id", element: <MyTicketDetails /> },
          { path: "/tickets", element: <OtherUsersTicketList /> },
          { path: "/tickets/:id", element: <TicketApprovalForm /> },
          // { path: "/detailEmployee/:id", element: <DetailEmployee /> },

          //payslip

          { path: "/payslips", element: <Payslips /> },
          { path: "/payslips/:payslipId/staffs/:staffId", element: <PayslipDetail /> },
          // { path: "/own-payslips", element: <MyPayslips /> },
          // { path: "/own-payslips:payslipId/staffs/:staffId", element: <PayslipDetail /> },
          //Contract
          { path: "/editcontract", element: <EditContract /> },
          // { path: "/contractdetail", element: <ContractDetail /> },
        ],
      },
      { path: "/", element: <HomePage /> },
      { path: "/my-payroll", element: <MyPayroll /> },


      // { path: "/payroll", element: <Payroll /> },

      // Others
      { path: "server-error", element: <ServerErrorPage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
