import React, { useState } from 'react'
import './ProductDescription.css'
import { FaHeart} from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { relatedProducts } from './Redux/Slices/SellerSlice';
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addItemtoCart,  fetchCartItems } from './Redux/Slices/CartSlice';
import { Toaster, toast } from 'sonner';
import {useNavigate} from 'react-router-dom'
function ProductDescription() {
const dispatch=useDispatch()
  const productDetails=useSelector((state)=>state.seller.productdesc)
const RelatedProducts=useSelector((state)=>state.seller.relatedProducts)
const  currentUser=useSelector((state)=>state.login.currentUser)
const [index, setIndex] = useState(0);
const [qty,setqty]=useState(1)
const Navigate=useNavigate()

const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,  // Adjust this based on your design
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200, // Breakpoint for xl screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 992, // Breakpoint for large screens
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // Breakpoint for medium screens
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const handleQuantity=(e)=>{
setqty(e.target.value)

}
const addCart=(product)=>{
  console.log(product)
  setTimeout(() => {
    toast.success('item added !!')
  }, 1000);
  
  const currentUserId=currentUser.userId
  
  console.log(currentUserId)
  const productWithQty={...product,quantity:parseInt(qty),userId:currentUserId,FirstName:currentUser.FirstName}
  console.log(productWithQty)
  dispatch(fetchCartItems(productWithQty))
}

const handleSelect = (selectedIndex, e) => {
  setIndex(selectedIndex);
};

const nextItem = () => {
  setIndex((prevIndex) => (prevIndex + 1) % RelatedProducts.length);
};

const prevItem = () => {
  setIndex((prevIndex) => (prevIndex - 1 + RelatedProducts.length) % RelatedProducts.length);
};
  return (
    <div> <div><button className="d-flex justify-content-end btn btn-primary mt-2 mx-2 p-1" onClick={()=>{Navigate('/viewProduct')}}>Back</button></div>  <div class="container my-5">
    <div class="row details-snippet1">
        <div class="col-md-7">
        <div className="row">
  <div className="col-md-2 mini-preview col-2">
    <img className="img-fluid" src={productDetails.productImgUrl} alt="Preview" />
    <img className="img-fluid" src={productDetails.productImgUrl} alt="Preview" />
    <img className="img-fluid" src={productDetails.productImgUrl} alt="Preview" />
    <img className="img-fluid" src={productDetails.productImgUrl} alt="Preview" />
  </div>
  <div className="col-md-10 col-10">
    <div className="product-image">
      <img className="img1-fluid" src={productDetails.productImgUrl} alt="Main Image" />
    </div>
  </div>
</div>


        </div>
        <div class="col-md-5">
            <div class="category"><span class="theme-text">Category:</span> {productDetails.Category}</div>
            <div class="title">{productDetails.ProductName}</div>
            <div class="ratings my-2">
                
            <div class="price my-2 mx-2">₹{productDetails.price}<strike class="original-price mx-2">₹{productDetails.price+Math.floor(Math.random(1,10)*10)}</strike></div>
            {/* <div className='d-flex justify-content-between'><span><FaShoppingBag/></span> <label htmlFor="qty mx-1">Qty:</label>
  <button className="btn btn-primary" id='qty'>+</button>
  <span className="quantity-display">{0}</span>
  <button className="btn btn-primary">-</button></div> */}
            <div class="theme-text subtitle">Brief Description:</div>
            <div class="brief-description">
               {productDetails.description}
            </div>

            <div>
                <div class="subtitle my-3 theme-text">Colors:</div>
                <div class="select-colors d-flex">
                    <div class="color red"></div>
                    <div class="color silver"></div>
                    <div class="color black"></div>
                </div>
            </div>

            <hr/>
            <div class="row">
           

            </div>
            
    <div class="col-md-6">
      
        <div class="d-flex justify-content-between mx-1 mt-2 mb-4">
        <FaShoppingBag size={32} onClick={()=>addCart(productDetails)}/>
           
            <input type="number" class="form-control w-50" id="qty" placeholder='choose Quantity' onChange={handleQuantity} required/>
        </div>
    </div>
    <Toaster richColors style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000', padding: '10px' }} />

            </div>
            <div class="stars d-flex">
                    <div class="theme-text mr-2">Product Ratings: </div>
                    <div>&#9733;</div>
                    <div>&#9733;</div>
                    <div>&#9733;</div>
                    <div>&#9733;</div>
                    <div>&#9733;</div>
                    <div class="ml-2">(4.5) 50 Reviews</div>
                </div>

        </div>
    </div>




    <div class="related-products details-snippet1">

        <div class="related-heading theme-text">Related Products</div>

        
  
    {/* // <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" key={i}>
    //   <div class="related-product">
    //     <img class="img-fluid" src={product.productImgUrl} alt="Related Product" />
    //   </div>
    //   <div class="related-title d-flex justify-content-center">{product.ProductName}</div>
    //   <div class="d-flex justify-content-center">
    //     <div class="related-price mr-auto">{product.price}</div>
    //     <div class="stars d-flex">
    //       <div>&#9733;</div>
    //       <div>&#9733;</div>
    //       <div>&#9733;</div>
    //       <div>&#9733;</div>
    //       <div>&#9733;</div>
    //     </div>
    //   </div>
    // </div> */}
<Slider {...settings}>
        {RelatedProducts.map((product, index) => (
          <div key={index} className="related-product">
            <img src={product.productImgUrl} alt={`Related Product ${index}`} className="img-fluid" />
           <div className='d-flex justify-content-center'>
            <div className="related-title">{product.ProductName}</div>
            
            </div>
          </div>
        ))}
      </Slider>
    
    

</div>
    </div>



</div>
  )
}

export default ProductDescription