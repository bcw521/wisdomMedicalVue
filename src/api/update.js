import request from "@/utils/request";

export const updateAPI=(last_number)=>request(
    '/user/login/'+last_number,
    {
        method:'GET'
    }
)
