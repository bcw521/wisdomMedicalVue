import request from "@/utils/request";
export const InsertAPI = (data) => request("/user",{
    method:'post',
    data:data
})
export const InsertAppointmentAPI=(data)=>request(
    "/user/info",
    {
        method:'post',
        data:data
    }
)
export const InsertRecordAPI=(data)=>request(
    "/doctor/record",
    {
        method:'post',
        data:data
    }
)
export const InsertDAPI=(account,password,phone)=>request(
    '/admin/addinfo',
    {
        method:'post',
        params:{
            account:account,
            password:password,
            phone:phone
        }
    }
)
export const AdddictorAPI=(depid,name,phone,sex,account,password,dictor_time,number,last_number)=>request(
    '/admin/adddictor',
    {
        method:'post',
        params:{
            depid:depid,
            name:name,
            phone:phone,
            sex:sex,
            account: account,
            password: password,
            dictor_time:dictor_time,
            number:number,
            last_number:last_number
        }
    }
)

