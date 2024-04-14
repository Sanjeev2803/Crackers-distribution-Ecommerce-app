import axios from 'axios'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import circularJson from 'circular-json'
import {useDispatch, useSelector} from 'react-redux'
import { Toaster, toast } from 'sonner'
import { addNewproducts } from './Redux/Slices/SellerSlice'

function Addproducts() {
  const currentSeller=useSelector((state)=>state.login.currentUser)
  const dispatch=useDispatch()
    const {register,formState:{errors},handleSubmit}=useForm()
    const Navigate=useNavigate()
    const [file,setfile]=useState(null)
    const productadd = async (prodObj) => {
      console.log(prodObj);
    
      const formdata = new FormData();
      formdata.append('sellerObj', circularJson.stringify(prodObj)); // Convert to JSON string
      formdata.append('pic', file);
    
      try {
        let res = await axios.post('https://crackers-distribution-ecommerce-pgnljzoow.vercel.app/product-api/products', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('message from server',res.data.products);
        dispatch(addNewproducts(res.data.products))
        toast.success('Product added ')
        
      } catch (error) {
        console.log(error.message);
      }
      // Navigate('/sellerDashboard')
    };
    
    const fileUpload=(e)=>{
      setfile(e.target.files[0])
    }
  return (
    <div>
      {console.log(currentSeller)}
      <>
    <form onSubmit={handleSubmit(productadd)} >
      {/* {<p className='lead fs-1 text-center'>{err}</p>} */}
        
      {console.log(currentSeller)}
    
        <div className="mb-3 d-flex justify-content-center mt-3">
     
        <input type="text" name="" id="" className="form-control" {...register("FirstName",{required:true,minLength:5})}  placeholder='Enter SellerName' style={{maxWidth:"400px",width:"100%"}}/>
        </div>
        {errors?.FirstName?.type==="required"&&errors?.FirstName!==currentSeller?.FirstName &&(<p className='text-danger fs-4 d-flex justify-content-center'>Sellername first name should be valid</p>)}
      
      {errors?.FirstName?.length<=5 &&(<p className='text-danger fs-4'>Sellername should be above 5</p>)}
      

        <div className="mb-3 d-flex justify-content-center">
       
        <input type="text" name=""  className="form-control" {...register("productName",{required:"required"})} placeholder='Enter Product Name' style={{maxWidth:"400px",width:"100%"}}/>
        </div>
        {errors?.productName?.type==="required" &&(<p className='text-danger fs-4 text-center'>Product Name required</p>)}
        <div className="mb-3 d-flex justify-content-center">
       
        <input type="text" name=""  className="form-control" {...register("company",{required:"required"})} placeholder='Enter Company Name' style={{maxWidth:"400px",width:"100%"}}/>
        </div>
        {errors?.productName?.type==="required" &&(<p className='text-danger fs-4 text-center'>Company Name required</p>)}
        <div className="mb-3 d-flex justify-content-center">
       
        <input type="number" name=""  className="form-control" {...register("price",{required:"required"})} placeholder='Enter Price' style={{maxWidth:"400px",width:"100%"}}/>
        </div>
        {errors?.price?.type==="required" &&(<p className='text-danger fs-4 text-center'>Price required</p>)}
        <div className="mb-3 d-flex justify-content-center">
       
       <input type="text" name=""  className="form-control" {...register("Category",{required:"required"})} placeholder='Enter Product Category' style={{maxWidth:"400px",width:"100%"}}/>
       </div>
       {errors?.description?.type==="required" &&(<p className='text-danger fs-4 text-center'>Category required</p>)}
        <div className="mb-3 d-flex justify-content-center">
       
        <input type="text" name=""  className="form-control" {...register("description",{required:"required"})} placeholder='Enter Product Description' style={{maxWidth:"400px",width:"100%"}}/>
        </div>
        {errors?.description?.type==="required" &&(<p className='text-danger fs-4 text-center'>Description required</p>)}
        <div className="mb-3 d-flex justify-content-center">
        <input type="file" name="" accept='image/jpeg,image/jpg,image/png,image/WEBP' className="form-control"  placeholder='Upload Product Image' style={{maxWidth:"400px",width:"100%"}} onChange={fileUpload}/>
        </div>
        {errors?.description?.type==="required" &&(<p className='text-danger fs-4 text-center'>Product Pic required</p>)}
      
        <div className="mb-3 d-flex justify-content-center">
        <button type="submit" className='btn btn-primary' onClick={productadd}>Submit</button>
        </div>
      </form>
    
      </>
      <Toaster richColors />
    </div>
  )
}

export default Addproducts