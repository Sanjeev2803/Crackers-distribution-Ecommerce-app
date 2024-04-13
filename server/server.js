const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const express=require('express')
const Userapp=require('./Apis/UserApi')
const Productapp = require('./Apis/ProductApi')
const cors = require('cors');
const path=require('path')
const app=express()
app.use(allowCors)
app.use(cors(
  {
    'Access-Control-Allow-Origin':'*'

  }
));

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