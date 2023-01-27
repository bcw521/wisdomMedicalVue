import request from "@/utils/request";

export const updateAPI=(last_number,id)=>request(
    '/user/login?last_number='+last_number+'&id='+id,
    {
        method:'GET'
    }
)
export const updateAppointmentAPI=(last_number,name)=>request(
    '/user/login?last_number='+last_number+'&name='+name,
    {
        method:'PUT'
    }
)
export const updatadoctorinfo=(data)=>request(
    "/doctor/info/",
    {
        method:"put",
        data:data
    }
)
export const doctorupppwdAPI=(password,id)=>request(
    "/doctor/info/updatepwd?password="+password+"&id="+id,
    {
        method:"put",
    }
)
export const adminupppwdAPI=(password,id)=>request(
    "/admin/info/updatepwd?password="+password+"&id="+id,
    {
        method:"put",
    }
)
