import React, { useEffect, useState } from 'react';
import './ProductCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from './Redux/Slices/CartSlice';
import { IoMdCloseCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import axios from 'axios';
import logo from '../Images/logo.png'
const CartTable = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUserFirstName = useSelector((state) => state.login.currentUser.FirstName);
  const currentUser = useSelector((state) => state.login.currentUser);
const currentUserCart=useSelector((state)=>state.login.currentUser.Cart)
console.log('cart intial',currentUser.Cart)
  const [localCartItems, setLocalCartItems] = useState(currentUser.Cart);
  // console.log('intial cart login items',localCartItems)
const [orderDetails,setorderDetails]=useState({})
const [unsavedChanges, setUnsavedChanges] = useState(false);
  // Update localCartItems when cartItems changes
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleIncrease = (index) => {
    const updatedCartItems = [...localCartItems];
    updatedCartItems[index] = { ...updatedCartItems[index], quantity: updatedCartItems[index].quantity + 1 };
    setLocalCartItems(updatedCartItems);
    setUnsavedChanges(true);
  };
  useEffect(() => {
    // Initialize localCartItems with the current user's cart items
    setLocalCartItems([...currentUserCart]);
  }, [currentUserCart]);
  
  const handleDecrease = (index) => {
    const updatedCartItems = [...localCartItems];
    updatedCartItems[index] = { ...updatedCartItems[index], quantity: Math.max(updatedCartItems[index].quantity - 1, 0) };
    setLocalCartItems(updatedCartItems);
    setUnsavedChanges(true);
  };

  const handleRemove = (item) => {
    const itemWithSpecificUser = { ...item, FirstName: currentUserFirstName };
    dispatch(removeCartItem(itemWithSpecificUser));
  };
  const handlePayment = async (e) => {
    const amount = (totalBill() + 25) * 100;
    const currency = "INR";
    const order = { amount: amount, currency: currency };
    const res = await axios.post('https://crackers-distribution-ecommerce-app.vercel.app/user-api/payment', order);
    const orderData = res.data.order;
    console.log(orderData);
  
    let options = {
      key: "rzp_test_uw3yYSHmwSQVmG",
      amount,
      currency,
      name: "Crackle Crafts",
      description: "Test Transaction",
      image: logo,
      order_id: orderData.id,
      method: 'netbanking',
      handler:async function(response){
        const body={FirstName:currentUserFirstName,...response}
        console.log(response)
        const validate= await axios.post('https://crackers-distribution-ecommerce-app.vercel.app/user-api/orderValidate',body)
        console.log(validate.data)
        window.alert(`${validate.data.msg}`)
setorderDetails({
  payment_id:response.razorpay_payment_id,
  order_id:response.razorpay_order_id,
  signature:response.razorpay_signature
})
// window.alert(response.razorpay_payment_id)
// window.alert(response.razorpay_order_id)
// window.alert(response.razorpay_signature)
      },
      prefill: {
        name: "Web Dev Matrix",
        email: currentUser.email,
        contact: 8074767945,
      },
      
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    let rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      window.alert(response.error.code);
      window.alert(response.error.description);
      window.alert(response.error.source);
      window.alert(response.error.step);
      window.alert(response.error.reason);
      alert(response.error.metadata.order_id);
      window.alert(response.error.metadata.payment_id);
    });
  
    

 
    rzp1.open();
    
    e.preventDefault();
  }
  console.log(orderDetails)
  const totalBill = () => {
    let bill = 0;
    localCartItems.forEach((item) => {
      bill += item.price * item.quantity;
    });
    return bill;
  };
  


  const handleSaveChanges = async () => {
    const confirmChanges = window.confirm('Do you want to save the changes?');
    if (confirmChanges) {
      try {
        // Send a POST request to the backend to update the quantity
        const response = await axios.put('https://crackers-distribution-ecommerce-app.vercel.app/user-api/afterChangeCartQuantity', { cartItems: localCartItems,FirstName:currentUserFirstName });
        // Handle success response
        console.log('Quantity updated successfully:', response.data);
        setUnsavedChanges(false);
        window.alert('saved successfully!') // Reset unsavedChanges flag after saving changes
      } catch (error) {
        // Handle error
        console.error('Error updating quantity:', error);
        // You may want to display an error message to the user
      }
    }
  };
  
  return (
    <div className='mt-2 p-2'>
      <div className="card">
        <div className="row">
          {/* Cart items */}
          <div className="col-md-8 col-xs-12 cart">
            <div className="title-Cart">
              <div className="row">
                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                <div className="col align-self-center text-right text-muted">{localCartItems.length} items</div>
              </div>
            </div>
            {/* Cart items list */}
            {localCartItems.map((item, index) => (
              <div className="row border-top border-bottom" key={index}>
                <div className="row main align-items-center">
                  <div className="col-2 "><img className="img-fluid" src={item.productImgUrl} alt="Product 1" /></div>
                  <div className="col">
                    <div className="row text-muted">{item.ProductName}</div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-row">
                      <button className="btn btn-primary btn-sm mx-2" onClick={() => handleDecrease(index)}>-</button>
                      <span style={{fontSize:'0.7em'}}>{item.quantity}</span>
                      <button className="btn btn-primary btn-sm mx-2" onClick={() => handleIncrease(index)}>+</button>
                    </div>
                  </div>
                  <div className="col"><div className='d-flex' style={{ fontSize: '0.8em'}}><FaRupeeSign size={12} style={{fontSize:'0.8em'}}/>{item.quantity * item.price}</div></div>
                  <div className='col'><IoMdCloseCircle style={{ fontSize: '1em'}} onClick={() => handleRemove(item)} /></div>
                </div>
              </div>
            ))}
            {/* No items message */}
            {console.log(localCartItems)}
            {console.log(localCartItems.length)}
            {localCartItems.length === 0 && (
              <p className='text-center fs-lead mb-3 p-2 text-warning'>No Items in the Cart😢 !!</p>
            )}
            {/* Back to shop button */}
            <div className="back-to-shop-container">
              <button className="back-to-shop-link btn btn-primary p-1 mt-2 mx-2 mb-3" style={{ textDecoration: 'none' }} onClick={() => { Navigate('/viewProduct') }}>
                <IoArrowBackCircle />Continue Shopping
              </button>
            </div>
          </div>

          {/* Summary card */}
          <div className="col-md-4 mb-2">
            {/* Summary content */}
           <div className="summary-card">
              <h5 className='text-center'>Summary</h5>
              <hr />
              {/* Summary items */}
              <div className="summary-item">
                {/* Total items */}
                <div className="row p-2">
                  <div className="col">ITEMS</div>
                  <div className="col text-right">{localCartItems.length}</div>
                </div>
                {/* Total price */}
                <div className="row">
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right"><FaRupeeSign />{totalBill()}</div>
                </div>
                {/* Shipping */}
                <div className="row">
                  <div className="col">SHIPPING</div>
                  <div className="col text-right" style={{fontSize:'0.8em'}}>Delivery- <FaRupeeSign />25.00</div>
                </div>
                {/* Give code */}
                <div className="row">
                  <div className="col">GIVE CODE</div>
                  <div className="col text-right"><input id="code" className="form-control" placeholder="Enter your code" /></div>
                </div>
              </div>
              {/* Total */}
              <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                <div className="col">TOTAL</div>
                <div className="col text-right"><FaRupeeSign size={8}/>{ totalBill()+25.00}</div>
              </div>
              <div className='d-flex justify-content-end'>
                <button className="btn btn-primary btn-block" onClick={handlePayment}>CHECKOUT</button>
              </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
