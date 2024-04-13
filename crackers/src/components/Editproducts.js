import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import circularJson from 'circular-json'
import { sellerCycle } from './Redux/Slices/SellerSlice';
import axios from 'axios';

function Editproducts() {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const [file,setfile]=useState(null)
  
  const dispatch=useDispatch()
const [isedit,setisedit]=useState(true)
const oldproductdata=useSelector((state)=>state.seller.oldProducts)
console.log(oldproductdata)
  const currentSeller=useSelector((state)=>state.login.currentUser)
  const productEdit = async(newProduct) => {
    if(!isedit){
    delete newProduct.productName;
    const sellerspecificProduct = { ...newProduct, Firstname: currentSeller.FirstName, ProductName: oldproductdata.title,oldproductImgUrl:oldproductdata.imgSrc};
    const formdata = new FormData();
      formdata.append('sellerEditObj', circularJson.stringify(sellerspecificProduct)); // Convert to JSON string
      formdata.append('pic', file);
      try {
        let res = await axios.post('https://crackers-distribution-ecommerce-m5mbl03s8.vercel.app/product-api/sellerEdit', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }else {
      try {
        delete newProduct.productName;
        const sellerspecificProduct = { ...newProduct, Firstname: currentSeller.FirstName, ProductName: oldproductdata.title }
        let res = await axios.post('https://crackers-distribution-ecommerce-m5mbl03s8.vercel.app/product-api/urlNochangeEdit', sellerspecificProduct);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handlefileEdit=()=>{
    setisedit(false)
  }

  const fileUpload=(e)=>{
    console.log(e.target.files[0])
  setfile(e.target.files[0])
  }
  return (
    <div>
    
    <>
  <form onSubmit={handleSubmit(productEdit)} >
    {/* {<p className='lead fs-1 text-center'>{err}</p>} */}
      
    {/* {console.log(currentSeller)} */}
  
    
    

      <div className="mb-3 d-flex justify-content-center">
     
      <input type="text" name=""  className="form-control" {...register("newProductname",{required:"required"})} placeholder='Enter Product Name' style={{maxWidth:"400px",width:"100%"}} defaultValue={oldproductdata?.title}/>
      </div>
      {errors?.productName?.type==="required" &&(<p className='text-danger fs-4 text-center'>Product Name required</p>)}
      
     
      <div className="mb-3 d-flex justify-content-center">
     
      <input type="number" name=""  className="form-control" {...register("price",{required:"required"})} placeholder='Enter Price' style={{maxWidth:"400px",width:"100%"}} defaultValue={oldproductdata?.price}/>
      </div>
      {errors?.price?.type==="required" &&(<p className='text-danger fs-4 text-center'>Price required</p>)}
      <div className="mb-3 d-flex justify-content-center">
     
     <input type="text" name=""  className="form-control" {...register("Category",{required:"required"})} placeholder='Enter Product Category' style={{maxWidth:"400px",width:"100%"}} defaultValue={oldproductdata?.category}/>
     </div>
     {errors?.description?.type==="required" &&(<p className='text-danger fs-4 text-center'>Category required</p>)}
      <div className="mb-3 d-flex justify-content-center">
     
      <input type="text" name=""  className="form-control" {...register("description",{required:"required"})} placeholder='Enter Product Description' style={{maxWidth:"400px",width:"100%"}} defaultValue={oldproductdata?.description}/>
      </div>
      {errors?.description?.type==="required" &&(<p className='text-danger fs-4 text-center'>Description required</p>)}
      {isedit&&<div className="mb-3 d-flex justify-content-center">
      <input type="text" name="" accept='image/jpeg,image/jpg,image/png,image/WEBP' className="form-control"  placeholder='Upload Product Image' style={{maxWidth:"400px",width:"100%"}} defaultValue={oldproductdata?.imgSrc}/><FaEdit className='mx-1 ' style={{height:'50px'}} onClick={handlefileEdit} />
      </div>
}

      {!isedit&&<div className="mb-3 d-flex justify-content-center">
      <input type="file" name="" accept='image/jpeg,image/jpg,image/png,image/WEBP' className="form-control"  placeholder='Upload Product Image' style={{maxWidth:"400px",width:"100%"}} onChange={fileUpload} />
      </div>
}
      
  
    
      <div className="mb-3 d-flex justify-content-center">
      <button type="submit" className='btn btn-primary' onClick={productEdit}>Submit</button>
      </div>
    </form>
   
    </>
  </div>
  )
}

export default Editproducts