import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { userVerify } from '../services/Apis';

const Otp = () => {
  const [otp,setOtp]=useState("");
  const location=useLocation();
  const navigate=useNavigate();
  const LoginUser = async(e)=>{
    e.preventDefault();
    if(otp===''){
      toast.error("Enter Your Otp");
    }else if(!/[^a-zA-Z]/.test(otp)){
       toast.error("Enter Valid Otp");
    }else if(otp.length < 6){
      toast.error("otp length min 6 digit");
    }else{
      const data={
        otp,email:location.state
      }

      const response = await userVerify(data); 
      if(response.status === 200){
         localStorage.setItem("userdbtoken",response.data.userToken);
         toast.success(response.data.message);
         setTimeout(()=>{
            navigate("/dashboard");
         },5000);
      }else{
        toast.error(response.response.data.error);
      }
    }
  }
  
  return (
    <section>
      <div className="form_data">
         <div className='form_heading'> 
            <h1>Please Enter Your OTP</h1>
            
         </div>
         <form>
            <div className="form_input">
                <label htmlFor='otp' >OTP</label>
                <input type="text" name="otp" id="" onChange={(e)=>setOtp(e.target.value)} placeholder="Enter Your OTP"/>
                <button className="btn" onClick={LoginUser}>Submit</button>
            </div>
         </form>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default Otp