import React, { useState } from 'react'
import '../styles/mix.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer,toast} from 'react-toastify'
import { sendOtpFunction } from '../services/Apis'
import Spinner from 'react-bootstrap/Spinner';
const Login = () => {
  const [email,setEmail]=useState("");
  const [spinner,setSpinner]=useState(false);
  const navigate=useNavigate();

  const sendOtp= async(e)=>{
      e.preventDefault();
      if(email === ""){
         toast.error("Enter your Email");
      }else if(!email.includes("@")){
        toast.error("Eneter Valid Email")
      }else{
        setSpinner(true);
        const data={
          email:email,
        }
        const response = await sendOtpFunction(data);
        if(response.status===200){
          setSpinner(false);
          navigate('/user/otp',{state:email})
        }else{
          toast.error(response.response.data.error);
        }
      }
  }
  console.log(email);
  return (
    <>
    <section>
      <div className="form_data">
         <div className='form_heading'> 
            <h1>Welcome Back Login</h1>
            <p>Hii this  is my project</p>
         </div>
         <form>
            <div className="form_input">
                <label htmlFor='email' >Email</label>
                <input type="email" name="email" id="" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email Address"/>
                <button className="btn" onClick={sendOtp}>Login
                  {
                    spinner ? <span> <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /></span>:""
                  }
                </button>
                <p>Don't have an account <NavLink to='/register'>SignUp</NavLink></p>
            </div>
         </form>
      </div>
      <ToastContainer/>
    </section>
    </>
  )
}

export default Login