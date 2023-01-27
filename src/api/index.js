import {AdddictorAPI, InsertAPI, InsertAppointmentAPI, InsertDAPI, InsertRecordAPI} from "@/api/insert";
import {
    doctorInfoAPI, getdepIdAPI, getdoctorAPI, getrecordAPI, loginAdminAPI,
    loginAPI,
    loginDoctorAPI,
    loginUserAPI,
    pageAPI,
    searchAPI,
    selectAPI,
    selectAppointmentAPI, selectAppointmentDAPI
} from "@/api/select";
import {
    adminupppwdAPI,
    doctorupppwdAPI,
    updatadoctorinfo,
    updatadoctorpwd,
    updateAPI,
    updateAppointmentAPI
} from "@/api/update";
import {deleteAPI} from "@/api/delete";
export const insert=InsertAPI
export const select=selectAPI
export const login=loginAPI
export const update=updateAPI
export const insertAppointment=InsertAppointmentAPI
export const selectAppointment=selectAppointmentAPI
export const deleteById=deleteAPI
export const loginUser=loginUserAPI
export const updateAppointment=updateAppointmentAPI
export const search=searchAPI
export const page=pageAPI
export const loginDoctor=loginDoctorAPI
export const doctorInfo=doctorInfoAPI
export const doctorupinfo=updatadoctorinfo
export const doctorupppwd=doctorupppwdAPI
export const selectAppointmentD=selectAppointmentDAPI
export const insertrecord=InsertRecordAPI
export const getrecord=getrecordAPI
export const loginAdmin=loginAdminAPI
export const adminuppwd=adminupppwdAPI
export const depId=getdepIdAPI
export const adddictor=AdddictorAPI
