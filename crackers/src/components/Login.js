import React, { useEffect, useState } from 'react'
import './Login.css'
import loginbg from '../Images/loginbg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserLoginLifecycle } from './Redux/Slices/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner';
function Login() {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  const[userCred,setUserCred]=useState({})
  const loginStatus=useSelector((state)=>state.login.loginStatus)
  const status=useSelector((state)=>state.login.status)
  const errorMessage=useSelector((state)=>state.login.errorMessage)
  console.log(loginStatus)
  const loginSubmit=(userObj)=>{
  
    setUserCred({...userObj})
    console.log(userObj)
dispatch(UserLoginLifecycle(userObj))
if(loginStatus){
toast.success(`${status}`)
}
else{
  toast.success(`${status}`)
}

  }
  useEffect(()=>{
    setTimeout(() => {
      if (loginStatus && userCred.role === 'User') {
          toast.success(`${status}`);
          Navigate('/viewProduct');
      }
      if (loginStatus && userCred.role === 'Seller') {
          toast.success(`${status}`);
          Navigate('/sellerDashboard');
      }
    //   if (loginStatus && userCred.role === 'Admin') {
    //     toast.success(`${status}`);
    //     Navigate('/adminMonitor');
    // }
  }, 2000);
  },[loginStatus,status])
  return (
   <>
      <div className='display-3 d-flex justify-content-center mb-2 ' style={{ color: '#99D380' }}>Login into your account!</div>
      <div class="container-fluid login-form p-2">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center login-image">
            <img
              src={loginbg}
              className="img-fluid"
              alt="CrackleShop Logo"
              style={{ borderRadius: '20%' }}
            />
          </div>

          <div class="col-md-6">
            <div class="form-2-wrapper mt-1">
              <h2 class="text-center mb-4">Sign Into Your Account</h2>
              {errorMessage.length > 0 && <p className="display-4 d-flex justify-content-center text-danger mb-3">{errorMessage}</p>}
              <div className='d-flex justify-content-center'>
              <select
  className="form-select mb-2"
  aria-label="Default select example"
  {...register("role", {
    validate: value => value !== "Choose Role" // Custom validation rule
  })}
  style={{ maxWidth: '50%' }}
  
>
  
  <option>Choose Role</option>
  <option value='Seller'>Seller</option>
  <option value='User'>User</option>
  {/* <option value="Admin">Admin</option> */}
</select>
              </div>
              {errors.role && (
                <p className='text-danger fs-7 text-center'>Select Role</p>
              )}

              <form onSubmit={handleSubmit(loginSubmit)}>
                <div class="mb-3 form-box">
                  <input type="email" class="form-control" id="email" name="email" placeholder="Enter Your Email" {...register("email", { required: true })} />
                </div>
                {errors?.email?.type === "required" && (<p className='text-danger fs-7 text-center'>Invalid/email not Existed</p>)}
                <div class="mb-3">
                  <input type="password" class="form-control" id="password" name="password" placeholder="Enter Your Password" {...register("password", { required: true })} />
                </div>
                {errors?.password?.type === "required" && (<p className='text-danger fs-7 text-center'>Invalid password</p>)}
                
                <button type="submit" class="btn btn-outline-secondary login-btn w-100 mb-3">Login</button>
              </form>
              <p class="text-center register-test mt-3">Don't have an account? <Link to='/Register' class="text-decoration-none">Register here</Link></p>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </>
  )
}
 
export default Login