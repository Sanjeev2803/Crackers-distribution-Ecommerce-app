const mongoose=require('mongoose')

const env=require('dotenv').config()
const generateUserId = () => mongoose.Types.ObjectId().toString();
const userSchema=new mongoose.Schema({
    userId: {
        type: String,
        // Assign the function as the default value
        unique: true
    },
    FirstName:String,
    LastName:String,
    email:String,
    password:String,
    Locality:String,
    Country:String,
    Mobile:Number,
    Gender:String,
    DOB:Date,
    CountryCode:String,
    profileImageUrl:String,
    state:String,
    Cart: [{
        ProductName: String,
        price: Number,
        quantity: Number,
        productImgUrl:String
    }],
    Orders:[{
        orderId:String,
        paymentId:String,
        orderedItems:[]
    }]
})
userSchema.pre('save', function(next) {
    // Generate a unique userId using ObjectId
    this.userId = new mongoose.Types.ObjectId().toString();
    next();
});
const sellerSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    email:String,
    password:String,
    Locality:String,
    Country:String,
    Mobile:Number,
    Gender:String,
   Company:String,
    CountryCode:String,
    profileImageUrl:String,
    state:String,
    Products:[
        {
            ProductName:String,
            price:Number,
            company:String,
            description:String,
            productImgUrl:String,
            Category:String
        }
    ]
})
const adminSchema=new mongoose.Schema({
    email:String,
    password:String
})
const User=mongoose.model('user',userSchema)
const Seller=mongoose.model('seller',sellerSchema)
const Admin=mongoose.model('admin',adminSchema)
const password = encodeURIComponent('Sanjeev@123');
// Brr8alDQV1NTjlF6
mongoose.connect(`mongodb://Sanjeev:${process.env.MONGODB_PASS}@ac-ayhzlfz-shard-00-00.jtxl9is.mongodb.net:27017,ac-ayhzlfz-shard-00-01.jtxl9is.mongodb.net:27017,ac-ayhzlfz-shard-00-02.jtxl9is.mongodb.net:27017/crackers?ssl=true&replicaSet=atlas-10su63-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`).then(()=>console.log('db connected')).catch(e=>console.log('error occured',e))
module.exports={User,Seller,Admin}






