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
export const getProducts = async(data)=>{
    return await commonRequest("POST",`${BackendURL}/products/get_all`,{},data);
}
export const getProductById = async (data,auth)=>{
    return await commonRequest("POST",`${BackendURL}/products/product`,data,auth);
}
export const createProduct =async (data,auth)=>{
    return await commonRequest("POST",`${BackendURL}/products/create`,data,auth)
}
export const addToCart = async (data,auth)=>{
    return await commonRequest("POST",`${BackendURL}/add-to-cart`,data,auth);
}
export const get_Cart = async (data,auth)=>{
    return await commonRequest("POST",`${BackendURL}/get-cart`,data,auth);
}
export const removeItemFromCart = async (data,auth)=>{
    return await commonRequest("POST",`${BackendURL}/remove-from-cart`,data,auth);
}