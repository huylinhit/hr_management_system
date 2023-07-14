import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/router";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";
import { request } from "http";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (var key in data.errors) {
            modelStateErrors.push(data.errors[key]);
          }
          throw modelStateErrors.flat();
        }

        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 404:

        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const Errors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorised'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
}

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const Contract = {
  list: () => requests.get("contracts"),
  validDetails: (id: number) => requests.get(`contracts/valid/${id}`),
  details: (id: number) => requests.get(`contracts/${id}`),
  create: (id: number, values: any) => requests.post(`contracts/staffs/${id}`, values),
  update: (contractId: number, staffId: number, values: any) => requests.put(`contracts/${contractId}/staffs/${staffId}`, values),
  patch: (id: number, values: any) => requests.patch(`contracts/${id}`, values),
};

const Department = {
  list: () => requests.get("departments"),
  details: (id: number) => requests.get(`departments/${id}`),
  create: (values: any) => requests.post("departments", values),
  update: (id: number, values: any) => requests.put(`departments/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`departments/${id}`, values),
};

const Ticket = {
  list: () => requests.get("tickets"),
  currentUserList: () => requests.get("tickets/currentusertickets"),
  otherUsersList: () => requests.get("tickets/otheruserstickets"),
  details: (id: number) => requests.get(`tickets/${id}`),
  create: (values: any) => requests.post("tickets", values),
  update: (id: number, values: any) => requests.put(`tickets/update/${id}`, values),
  updateStatus: (id: number, values: any) => requests.put(`tickets/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`tickets/${id}`, values),
  cancel: (id: number) => requests.delete(`tickets/${id}`),
};
const TicketType = {
  list: () => requests.get("tickettype"),
  details: (id: number) => requests.get(`tickettype/${id}`),
  create: (values: any) => requests.post("tickettype", values),
  update: (id: number, values: any) => requests.put(`tickettype/${id}`, values),
  delete: (id: number) => requests.delete(`tickettype/${id}`),
};

const Skill = {
  list: () => requests.get("skill"),
  details: (id: number) => requests.get(`skill/${id}`),
  create: (values: any) => requests.post("skill", values),
  update: (id: number, values: any) => requests.put(`skill/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`skill/${id}`, values),
};

const StaffSkill = {
  list: () => requests.get("staffskill"),
  details: (id: number) => requests.get(`staffskill/${id}`),
  create: (values: any) => requests.post("staffskill", values),
  delete: (id: number) => requests.delete(`staffskill/${id}`),
  update: (values: any) => requests.put(`staffskill`, values),
  patch: (id: number, values: any) => requests.patch(`staffskill/${id}`, values),
};

const Candidate = {
  list: () => requests.get("candidates"),
  details: (id: number) => requests.get(`candidates/${id}`),
  create: (values: any) => requests.post("candidates", values),
  update: (id: number, values: any) => requests.put(`candidates/${id}`, values),
};
const CandidateSkill = {
  list: () => requests.get("candidateskills"),
  details: (id: number) => requests.get(`candidateskills/${id}`),
  listByCandidateId: (id: number) => requests.get(`candidateskills/candidate/${id}`),
  create: (values: any) => requests.post("candidateskills", values),
  update: (values: any) => requests.put(`candidateskills`, values),
  delete: (id: number) => requests.delete(`candidateskills/${id}`),
};

const UserInfors = {
  list: () => requests.get("userinfor"),
  details: (id: number) => requests.get(`userinfor/${id}`),
};

const Payslip = {
  list: () => requests.get("payslips"),
  details: (id: number, staffId: number) => requests.get(`payslips/${id}/staffs/${staffId}`),
  listOfStaff: (staffId: number) => requests.get(`payslips/${staffId}`),
  createAllStaff: (time: any) => requests.post(`payslips/staffs/`, time),
  createByDepartment: (departmentId: number, time: any) => requests.post(`payslips/departments/${departmentId}`, time),
  createByStaffId: (staffId: number, time: any) => requests.post(`payslips/staffs/${staffId}`, time),
  update: (id: number, values: any) => requests.put(`payslips/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`payslips/${id}`, values),
};

const LogOt = {
  list: () => requests.get("logots"),
  details: (id: number) => requests.get(`logots/${id}}`),
  listOfStaff: (staffId: number) => requests.get(`logots/staffs/${staffId}`),
  create: (staffId: number, values: any) => requests.post(`logots/staffs/${staffId}`, values),
  update: (id: number, values: any) => requests.put(`logots/${id}`, values),
  patch: (logotId: number, staffId: number, values: any) => requests.patch(`logots/${logotId}/staffs/${staffId}`, values),
};

const LeaveDayDetail = {
  list: (staffId: number) => requests.get(`leave-day-detail/${staffId}`),
};
const LogLeave = {
  list: () => requests.get("log-leaves"),
  details: (logLeaveId: number, staffId: number) =>
    requests.get(`log-leaves/${logLeaveId}/staffs/${staffId}`),
  listOfStaff: (staffId: number) => requests.get(`log-leaves/staffs/${staffId}`),
  create: (id: number, values: any) => requests.post(`log-leaves/staffs/${id}`, values),
  update: (logLeaveId: number, staffId: number, values: any) =>
    requests.put(`log-leaves/${logLeaveId}/staffs/${staffId}`, values),
  patch: (logLeaveId: number, staffId: number, values: any) =>
    requests.patch(`log-leaves/${logLeaveId}/staffs/${staffId}`, values),
};

const Employees = {
  list: () => requests.get("userinfor"),
  details: (id: number) => requests.get(`userinfor/${id}`),
  create: (values: any) => requests.post("userinfor", values),
  delete: (id: number) => requests.delete(`userinfor/${id}`),
  update: (id: number, values: any) => requests.put(`userinfor/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`userinfor/${id}`, values),
};

const AllowanceType = {
  list: () => requests.get("allowance-types"),
};

const Allowance = {
  list: () => requests.get("allowances"),
  create: (id: number, values: any) => requests.post(`allowances/contracts/${id}`, values),
  update: (allowanceId: number, contractId: number, values: any) =>
    requests.put(`allowances/${allowanceId}/contracts/${contractId}`, values),
  patch: (allowanceId: number, contractId: number, values: any) =>
    requests.patch(`allowances/${allowanceId}/contracts/${contractId}`, values),
};
// -----------------------------------
const agent = {
  Account,
  AllowanceType,
  Allowance,
  Contract,
  Department,
  UserInfors,
  Employees,
  Ticket,
  Skill,
  StaffSkill,
  TicketType,
  Payslip,
  LogOt,
  LogLeave,
  Candidate,
  CandidateSkill,
  LeaveDayDetail,
  Errors

};

export default agent;
