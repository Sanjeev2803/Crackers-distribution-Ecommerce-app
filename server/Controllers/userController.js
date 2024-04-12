const { User, Seller, Admin} = require("../Db");

const { cloudinary } = require("../MiddleWare/CloudinaryUpload");
const fs=require('fs')
const mongoose = require('mongoose');
const jsontoken=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const Razorpay=require('razorpay')
const crypto=require('crypto');


const RegisterUser = async (req, res) => {
    console.log(req.body);
  
    try {
      let userdata = JSON.parse(req.body.userObj);;
  
  
  
      let DupUser;
  
      // console.log('Address finding', userdata.hasOwnProperty('address'));
      DupUser = await User.findOne({email: userdata.email });
  
      if (DupUser === null) {
        console.log(userdata);
        const cloudinaryRes = await cloudinary.uploader.upload(req.file.path);
        userdata.profileImageUrl = cloudinaryRes.url;
        console.log(userdata)
        const registerUser = await User.create(userdata);
  console.log(userdata.profileImageUrl)
  
        fs.unlink(req.file.path, (err) => {
          if (err) {
            throw err;
          } else {
            console.log('Image removed from local folder');
          }
        });
  
        
        console.log(registerUser);
        return res.status(201).send({ message: 'New User Registered', payload: registerUser });
      } else {
        return res.status(401).send({ message: 'User already Existed!!' });
      }
    } catch (error) {
      console.error(error);
      
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  };
  const RegisterSeller = async (req, res) => {
    console.log(req.body);
  
    try {
      let userdata = JSON.parse(req.body.userObj);;
  
  
  
      let DupUser;
  
      // console.log('Address finding', userdata.hasOwnProperty('address'));
      DupUser = await Seller.findOne({email: userdata.email });
  
      if (DupUser === null) {
        console.log(userdata);
        const cloudinaryRes = await cloudinary.uploader.upload(req.file.path);
        userdata.profileImageUrl = cloudinaryRes.url;
        console.log(userdata)
        const registerUser = await Seller.create(userdata);
  console.log(userdata.profileImageUrl)
  
        fs.unlink(req.file.path, (err) => {
          if (err) {
            throw err;
          } else {
            console.log('Image removed from local folder');
          }
        });
  
        
        console.log(registerUser);
        return res.status(201).send({ message: 'New Seller Registered', payload: registerUser });
      } else {
        return res.status(401).send({ message: 'Seller already Existed!!' });
      }
    } catch (error) {
      console.error(error);
      
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  };

 
 
  const loginUser=async(req,res)=>{
    const userData=req.body
    const userSearch=await User.findOne({email:userData.email})
if(userSearch===null){
  res.status(200).send({'message':'Invalid creditentials'})
}
else{
  if(userData.email===userSearch.email){
    const validPass=await bcryptjs.compare(userData.password,userSearch.password)
    if(validPass){
      userData.password=userSearch.password
      const jwt=jsontoken.sign({userData},process.env.JWT_SECRET_KEY,{expiresIn:'2hr'})
      res.status(201).send({'message':'login successful',payload:{userSearch,token:jwt}})
    }
    else{
      res.status(200).send({'message':'password incorrect'})
  }
  }
  else{
    res.status(200).send({'message':'username incorrect'})
}
}
  }

  const loginSeller=async(req,res)=>{
    const userData=req.body
    const userSearch=await Seller.findOne({email:userData.email})
if(userSearch===null){
  res.status(200).send({'message':'Invalid creditentials'})
}
else{
  if(userData.email===userSearch.email){
    const validPass=await bcryptjs.compare(userData.password,userSearch.password)
    if(validPass){
      userData.password=userSearch.password
      const jwt = jwt.sign({ userData }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
      res.status(201).send({'message':'login successful',payload:{userSearch,token:jwt}})
    }
    else{
      res.status(200).send({'message':'password incorrect'})
  }
  }
  else{
    res.status(200).send({'message':'username incorrect'})
}
}
  }
  const getallProducts=async(req,res)=>{
    const allProducts=await Seller.find()
    res.status(200).send({'message':'products fetched',payload:allProducts})
  }

  const updateCartUsers = async (req, res) => {
    try {
        const { ProductName, price, quantity, userId,FirstName,productImgUrl } = req.body;
        console.log('Request Body:', req.body);
        console.log(userId, 'userId');

        // Find the user by ID
        let user = await User.findOne({ FirstName:FirstName });
        console.log('user:', user);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure the user has a cart array
        if (!user.Cart) {
            user.Cart = []; // Initialize cart if it doesn't exist
        }

        // Check if the product already exists in the user's cart
        const existingProductIndex = user.Cart.findIndex(item => item.ProductName === ProductName);

        if (existingProductIndex !== -1) {
            // If product already exists, update its quantity
            user.Cart[existingProductIndex].quantity += quantity;
        } else {
            // If product doesn't exist, add it to the cart
            user.Cart.push({ ProductName, price,quantity,productImgUrl});
        }

        // Save the updated user document
        await user.save();
console.log("user cart:",user.Cart)
        res.status(200).json({ message: 'Cart updated successfully', cart: user.Cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteCart = async (req, res) => {
  console.log(req.body)
 
  try {
    const { ProductName, FirstName } = req.body;

    // Update the user's cart by removing the item with the specified productName
    const result = await User.updateOne(
      { FirstName: FirstName },
      { $pull: { Cart: { ProductName: ProductName } } }
    );
const updatedCart=await User.findOne({FirstName:FirstName})
    res.status(200).send({ message: 'Item deleted successfully', cart: updatedCart.Cart });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const handlePayment = async (req, res) => {
  try {
      const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET_KEY
      });

      const options = req.body;
      let order;

      try {
          order = await razorpay.orders.create(options);
      } catch (createError) {
          throw new Error(`Error creating order: ${createError.message}`);
      }

      if (!order) {
          res.status(500).send("Error!");
      } else {
          res.status(200).send({ message: "Order successful!", order: order });
      }
  } catch (error) {
      res.status(500).send({ message: "Internal Server Error!" });
  }
};
const updateCartQuantityafterChanges = async (req, res) => {
  try {
    const { cartItems, FirstName } = req.body;

    // Find the user by ID
    const user = await User.findOne({FirstName:FirstName});

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the quantity for each item in the cart
    cartItems.forEach(async (item) => {
      const existingProductIndex = user.Cart.findIndex(cartItem => cartItem.ProductName === item.ProductName);
      if (existingProductIndex !== -1) {
        user.Cart[existingProductIndex].quantity = item.quantity;
      }
    });

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Cart quantities updated successfully', cart: user.Cart });
  } catch (error) {
    console.error('Error updating cart quantities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const paymentValidate = async (req, res) => {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Create a SHA-256 hash using the secret key and order/payment IDs
  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest('hex');

  // Check if the generated hash matches the signature provided
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: 'Transaction is not legitimate!' });
  }

  try {
    // Find the user based on the provided first name
    const user = await User.findOne({ FirstName: req.body.FirstName });

    // Assuming orderId, paymentId, and user.Cart are defined elsewhere
    // const { orderId, paymentId } = req.body;
    
    // Add the order details to the user's Orders array
    user.Orders.push({ orderId:razorpay_order_id, paymentId:razorpay_payment_id, orderedItems: user.Cart });

    // Save the updated user object
    await user.save();

    // Send success response
    res.status(200).send({
      msg: 'Success',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
const adminLogin=async(req,res)=>{
  const adminData=req.body
  const adminSearch=await Admin.findOne({email:adminData.email})
if(adminSearch===null){
res.status(200).send({'message':'Invalid creditentials'})
}
else{
if(adminData.email===adminSearch.email){
  const validPass=await bcryptjs.compare(adminData.password,adminSearch.password)
  if(validPass){
    adminData.password=adminSearch.password
    const jwt=jsontoken.sign({adminData},'123456',{expiresIn:6000})
    res.status(201).send({'message':'login successful',payload:{adminSearch,token:jwt}})
  }
  else{
    res.status(200).send({'message':'password incorrect'})
}
}
else{
  res.status(200).send({'message':'username incorrect'})
}
}
}

const getUsers=async(req,res)=>{
  const getUsers=await User.find()
  res.status(200).send({payload:getUsers})
}
const getSellers=async(req,res)=>{
  const getUsers=await Seller.find()
  res.status(200).send({payload:getUsers})
}
   module.exports={RegisterUser,loginUser,RegisterSeller,adminLogin,loginSeller,getallProducts,updateCartUsers,deleteCart,handlePayment,updateCartQuantityafterChanges,paymentValidate,getUsers,getSellers}