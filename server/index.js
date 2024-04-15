

const express=require('express')
const Userapp=require('./Apis/UserApi')
const Productapp = require('./Apis/ProductApi')
const cors = require('cors');
const path=require('path')
const app=express()
// app.use(cors({
// origin:["https://crackers-distribution-ecommerce-bd57z4uha.vercel.app"],

// methods:["POST","GET","PUT","DELETE"],
// credentials:true
// }
//   ))

app.use(cors({
    origin: 'https://crackers-distribution-ecommerce-1114hyotc.vercel.app',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.use(function (req, res, next) {
//     // Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
// });
// app.use(cors(
//   {
//     'Access-Control-Allow-Origin':'*'

//   }
// ));

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




// const express=require('express')
// const Userapp=require('./Apis/UserApi')
// const Productapp = require('./Apis/ProductApi')
// const cors = require('cors');
// const path=require('path')
// const app=express()
// app.use(cors({
// origin:["https://crackers-distribution-ecommerce-h6tyxzvhn.vercel.app"],
// methods:["POST","GET","PUT","DELETE"],
// credentials:true
// }
//   ))
// // app.use(cors(
// //   {
// //     'Access-Control-Allow-Origin':'*'

// //   }
// // ));

// app.use(express.json())
// require('dotenv').config()

// function asynchandlerErr(err,req,res,next){
//     res.status(404).send({message:'error occured',payload:err.message})
// }
// app.use(express.static(path.join(__dirname,'../crackers/build')))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.use('/user-api',Userapp)
// app.use('/product-api',Productapp)
// app.use(express.urlencoded({ extended: false}));
// app.use(asynchandlerErr)
// app.listen(4000,()=>{
//     console.log('server started....')
// })
