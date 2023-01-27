import request from "@/utils/request";

export const selectAPI=(id)=>request("/user/"+id,{
    method:'GET',
})
export const loginAPI=(data)=>request(
    "/user/login",
    {
        method:'POST',
        data:data
    }
)
export const selectAppointmentAPI=()=>request(
    '/user/info',
    {
        method:'get'
    }
)
export const selectAppointmentDAPI=(name)=>request(
    '/user/info/d',
    {
        method:'get',
        params:{
            name
        }
    }
)
export const loginUserAPI=(data)=>request(
    "/user/login/cx",
    {
        method:'POST',
        data:data
    }
)
export const searchAPI=(data)=>request(
    "/user/search?card="+data,
    {
        method:'GET',
    }
)
export const pageAPI=(pageNum,pageSize)=>request(
    "/user/page?pageNum="+pageNum+"&pageSize="+pageSize,
    {
        method:'GET'
    }
)
export const loginDoctorAPI=(data)=>request(
    "/doctor/login",
    {
        method:'post',
        data:data
    }
)
export const doctorInfoAPI=(name)=>request(
    "/doctor/info",
    {
        method:'get',
        params:{
            name:name
        }
    }
)
export const getrecordAPI=(name)=>request(
    "/doctor/record",
    {
        method:'get',
        params:{
            name:name
        }
    }
)
export const loginAdminAPI=(data)=>request(
    "/admin/login",
    {
        method:'post',
        data:data
    }
)
export const getdepIdAPI=(depName)=>request(
    "/admin/dep",
    {
        method:'get',
        params:{
            depName:depName
        }
    }
)
