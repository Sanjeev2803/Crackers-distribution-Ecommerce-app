const express=require('express')
const Userapp=require('./Apis/UserApi')
const Productapp = require('./Apis/ProductApi')
const cors = require('cors');
const path=require('path')
const app=express()
app.use(cors());
app.use(express.json())
require('dotenv').config()

function asynchandlerErr(err,req,res,next){
    res.status(404).send({message:'error occured',payload:err.message})
}
app.use(express.static(path.join(__dirname,'../crackers/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/user-api',Userapp)
app.use('/product-api',Productapp)
app.use(express.urlencoded({ extended: false}));
app.use(asynchandlerErr)
app.listen(4000,()=>{
    console.log('server started....')
})
