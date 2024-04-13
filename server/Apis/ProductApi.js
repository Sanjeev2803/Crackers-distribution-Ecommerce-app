const express=require('express')
const Productapp=express.Router()
const { upload } = require('../MiddleWare/CloudinaryUpload')
const asynchandler=require('express-async-handler')
const { Addproducts, editProducts,urlNochangeEdit,deleteProducts} = require('../Controllers/ProductController')
const cors=require('cors')
Productapp.use(cors(
    
        // 'Access-Control-Allow-Origin':'*'
       
    
))

Productapp.post('/products',upload.single('pic'),asynchandler(Addproducts))
Productapp.post('/sellerEdit',upload.single('pic'),asynchandler(editProducts))
Productapp.post('urlNochangeEdit',asynchandler(urlNochangeEdit))
Productapp.delete('/deleteproducts',asynchandler(deleteProducts))

module.exports=Productapp