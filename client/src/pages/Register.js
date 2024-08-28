import React, { useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'
import { registerfunction } from '../services/Apis';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [passshow,setPassshow] = useState(true);
  const navigate=useNavigate();
  const [inputdata,setinputdata]=useState({
    fname:'',
    email:'',
    password:'',
  });
  console.log(inputdata)
  const handleChange=(e)=>{
     const {name,value}=e.target;
     setinputdata({...inputdata,[name]:value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {fname,email,password}=inputdata;
    if(fname===""){
      toast.error("Enter your name");
    }else if(email===""){
      toast.error("Enter your email")
    }else if(!email.includes('@')){
      toast.error("Enter valid email")
    }else if(password===""){
      toast.error('Enter your password')
    }else if(password.length < 6){
      toast.error('length minimum 6 characters')
    }else{
      const response = await registerfunction(inputdata)
      if(response.status===200){
        setinputdata({...inputdata,fname:'',email:'',password:''});
         navigate("/")
      }else{
        toast.error(response.data.error);
      }
      
    }
  }
  return (
    <><section>
    <div className="form_data">
       <div className='form_heading'> 
          <h1>Sign Up</h1>
          <p>Hii this is my sign up page</p>
       </div>
       <form>
          <div className="form_input">
              <label htmlFor='fname' >Name</label>
              <input type="text" name="fname" id="" onChange={handleChange} placeholder="Enter your Name"/>
             
          </div>
          <div className="form_input">
              <label htmlFor='email' >Email</label>
              <input type="email" name="email" id="" onChange={handleChange} placeholder="Enter your Email Address"/>
            
          </div>
          <div className="form_input">
              <label htmlFor='password' >Password</label>
              <div className='two'>
              <input type={passshow?"password":"text"}  name="password" id="" onChange={handleChange} placeholder="Enter your Password"/>
              <div className='showpass' onClick={()=>setPassshow(!passshow)}>
              {passshow?"Show":"Hide"}
              </div>
              </div>
          </div>
          <button className="btn" onClick={handleSubmit}>SignUp</button>
              <p>Don't have an account </p>
       </form>
    </div>
    <ToastContainer/>
  </section></>
  )
}

export default Register
