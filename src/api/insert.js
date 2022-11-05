import request from "@/utils/request";
export const InsertAPI = (data) => request("/user",{
    method:'post',
    data:data
})


