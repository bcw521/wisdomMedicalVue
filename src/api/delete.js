import request from "@/utils/request";

export const deleteAPI=(id)=>request(
    '/user/'+id,
    {
        method:'delete',
    }
)

