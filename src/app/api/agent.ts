import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/router";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

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
  update: (id: number, values: any) => requests.put(`tickets/${id}`, values),
  updateStatus: (id: number, values: any) => requests.put(`tickets/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`tickets/${id}`, values),
};
const TicketType = {
  list: () => requests.get("tickettype"),
  details: (id: number) => requests.get(`tickettype/${id}`),
  create: (values: any) => requests.post("tickettype", values),
  update: (id: number, values: any) => requests.put(`tickettype/${id}`, values),
  delete: (id: number) => requests.delete(`tickettype/${id}`),
}

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
  update: (id: number, values: any) => requests.put(`staffskill/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`staffskill/${id}`, values),
};

const UserInfors = {
  list: () => requests.get("userinfor"),
  details: (id: number) => requests.get(`userinfor/${id}`),
};

// -----------------------------------
const Employees = {
  list: () => requests.get("staffskill"),
  details: (id: number) => requests.get(`staffskill/${id}`),
  create: (values: any) => requests.post("staffskill", values),
  update: (id: number, values: any) => requests.put(`staffskill/${id}`, values),
  patch: (id: number, values: any) => requests.patch(`staffskill/${id}`, values),
};

const agent = {
  Account,
  Department,
  UserInfors,
  Employees,
  Ticket,
  Skill,
  StaffSkill,
  TicketType
};

export default agent;
