import axios from "axios";
const request =axios.create(
    {
        baseURL:'http://localhost:9090/'
    }
)
// request.interceptors.request.use(
//     function (config) {
//         config.headers.token=localStorage.getItem("token");
//         // 在发送请求之前做些什么
//         return config;
//     }, function (error) {
//         // 对请求错误做些什么
//         return Promise.reject(error);
//     }
// )
export default request;
