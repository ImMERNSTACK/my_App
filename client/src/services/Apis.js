import { commonRequest } from "./ApiCall";
import { BackendURL } from "./helper";

export const registerfunction = async(data)=>{
    return await commonRequest("POST",`${BackendURL}/user/register`,data);
}
export const sendOtpFunction = async(data)=>{
    return await commonRequest("POST",`${BackendURL}/user/sendOtp`,data);
}
export const userVerify = async(data)=>{
    return await commonRequest("POST",`${BackendURL}/user/login`,data);
}