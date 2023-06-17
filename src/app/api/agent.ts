import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/router";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (var key in data.errors) {
                    modelStateErrors.push(data.errors[key])
                }

                throw modelStateErrors.flat();
            }
            
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', { state: { error: data } })
            break;
        default:
            break;
    }

    return Promise.reject(error.response)
})


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

const Department = {
    list: () => requests.get('departments'), 
    details: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values),
}
const agent = {
    Account,
    Department
}

export default agent;
