const express=require('express')
const cors=require('cors')
const asyncHandler=require('express-async-handler')
const multer = require('multer')
const { upload } = require('../MiddleWare/CloudinaryUpload')
const { RegisterUser, loginUser, RegisterSeller, loginSeller, getallProducts, updateCartUsers,deleteCart, handlePayment, updateCartQuantityafterChanges, paymentValidate,adminLogin, getUsers, getSellers} = require('../Controllers/userController')
const verifytoken = require('../MiddleWare/VerifyToken')

const Userapp=express.Router()
Userapp.use(cors(
    {
        'Access-Control-Allow-Origin':'*'
    }
))
Userapp.post('/payment',handlePayment)
Userapp.post('/Register',upload.single('pic'), asyncHandler(RegisterUser))
Userapp.post('/login',asyncHandler(loginUser))
Userapp.post('/sellers',upload.single('pic'),asyncHandler(RegisterSeller))
Userapp.post('/login',asyncHandler(loginUser))
Userapp.post('/sellerlogin',asyncHandler(loginSeller))
Userapp.put('/users',asyncHandler(updateCartUsers))
Userapp.get('/userProducts',asyncHandler(getallProducts))
Userapp.delete('/cart',asyncHandler(deleteCart))
Userapp.put('/afterChangeCartQuantity',asyncHandler(updateCartQuantityafterChanges))
Userapp.post('/orderValidate',asyncHandler(paymentValidate))
Userapp.post('/adminlogin',asyncHandler(adminLogin))
Userapp.get('/users',asyncHandler(getUsers))
Userapp.get('/sellers',asyncHandler(getSellers))
module.exports=Userapp