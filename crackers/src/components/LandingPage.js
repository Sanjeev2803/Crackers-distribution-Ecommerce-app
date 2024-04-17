import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaHeart} from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import dealImg from '../Images/exclusivedeals.png'
import bgImg from '../Images/Diwali1.jpg'
import bgImg2 from '../Images/Diwali2.jpg'
import bgImg3 from '../Images/Diwali3.jpg'
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'; // Import modal component from React Bootstrap
import Banner from '../Images/BannerAd.png';
import { IoMdCloseCircle } from "react-icons/io";
import './LandingPage.css'

export const ProductCard = ({ imgSrc, title, description, price, newprice, category,onEdit,onDelete,SellerName}) => {
  const [isdeals,setisdeals]=useState(false)
  const loginStatus=useSelector((state)=>state.login.loginStatus)
  const currentuserType = useSelector((state) => state.login.userRole);
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate()
   // Empty dependency array ensures the effect runs only once on mount
   const popupModal=()=>{
    setShowModal(false)
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };
const handleProductCardClick=()=>{
 if(!loginStatus){
  setShowModal(true)
 }
 else{
  navigate('/login')
 }
}
  const handleEditClick = () => {
    // Call the onEdit function and pass the current product object
    onEdit({ imgSrc, title, description, price, newprice, category });
  };
  const handledeleteClick=()=>{
    onDelete({ imgSrc, title, description, price, newprice, category,SellerName });
  }
  return (
    <>
    {currentuserType !== 'Seller' ? (
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
        <div className="card" onClick={handleProductCardClick}>
          <img className="card-img img-fluid" src={imgSrc} alt="Vans" />
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <h6 className="card-subtitle mb-2 text-muted">Category: {category}</h6>
            <p className="card-text">{description}</p>

            <div className="buy d-flex justify-content-between align-items-center">
              <div className='price-container'>
              <span className="price-user">₹{price}</span>
              <span className="new-price-user">₹{newprice}</span>
              </div>
              {loginStatus?<FaShoppingBag onClick={()=>{ navigate('/viewProduct')}} />:<FaShoppingBag onClick={()=>{ navigate('/login')}} />}
              
              
              
            </div>
          </div>
        </div>
        { loginStatus==='false'&&
            <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
  <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto', padding: 0 }}>
    {/* Content of your modal */}
    Login to get access!!
    <div className='d-flex justify-content-between'>
    <button className='d-flex justify-content-center btn btn-primary' onClick={()=>{navigate('/login')}}>Yes</button>
    <button className='d-flex justify-content-center btn btn-primary' onClick={handleCloseModal}>No</button>
    </div>
  </Modal.Body>
</Modal>
}
      </div>
    ) : (
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
        <div className="card" >
          <img className="card-img img-fluid" src={imgSrc} alt="Vans" />
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="price d-flex justify-content-center">₹{price}</p>
            <h6 className="card-subtitle mb-2 text-muted">Category:{category}</h6>
            <p className="card-text">{description}</p>
            
            <div className="buy d-flex justify-content-between align-items-center">
             
              {isdeals&&<span className="new-price">₹{newprice}</span>}
              
                
               
                {/* {loginStatus&&currentuserType==='Seller'&&<>
              <a href="#" className="btn mt-3">
                
              <FaEdit onClick={handleEditClick} />
              </a>
              <a href="#" className="btn mt-3"><MdDelete onClick={handledeleteClick}/></a>
            
              </>
    } */}
                
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};


function LandingPage() {
  const navigate=useNavigate()
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  useEffect(() => {
    setShowModal(true); // Show modal by default when component mounts
  }, []);
  const loginStatus = useSelector((state) => state.login.loginStatus);
  return (
    
    <div className=''>
      <section className="hero text-center position-relative">
      <Carousel className="w-100">
  <Carousel.Item>
    <img src={bgImg} alt="Diwali" className="img-fluid" />
    <Carousel.Caption className='text-center mx-auto'>
      <h4 className='' style={{ color: 'yellow', fontSize: '0.8em' }}>Unwrap the Joy of Savings and Surprises!</h4>
      
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
  <img src={bgImg2} alt="Diwali" className="img-fluid" />
  <Carousel.Caption className="text-center">
    <h4 style={{ color: '#F5F4E9', fontSize: '1em' }}>
      Light Up the Night Sky with Dazzling Fireworks!
    </h4>
  </Carousel.Caption>
</Carousel.Item>


  <Carousel.Item>
    <img src={bgImg3} alt="Diwali" className="img-fluid" />
    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


        <div className="cracker-container">
          {/* ... (your content) ... */}
        </div>
      </section>

      <section className="text-center py-5 mt-1" id="best-selling">
        <h2 className="fw-bold">Best Selling</h2>
        <p>Aliquam gravida nisl a suscipit condimentum</p>
        <div className="container">
          <div className="row">
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2023/06/Money-in-the-Bank.jpg"
              title="Money in the Bank"
             
              price="125"
              newprice='8'
              category='flower Pots'
             
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2023/06/Crackling-SOda.jpg"
              title="Crackling-Soda"
             
              price="125"
              newprice='8'
              category='sparkles'
          
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Flower-Bomb-II.jpg"
              title="Flower-Bomb-II"
             
              price="125"
              newprice='8'
              category='Aerial Crackers'
              
            />
             <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Flower-Bomb-II.jpg"
              title="Flower-Bomb-II"
            
              price="125"
              newprice='8'
              category='sparkles'
            
            />
                 <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Flower-Bomb-II.jpg"
              title="Flower-Bomb-II"
             
              price="125"
              newprice='8'
              category='sparkles'
             
            />
                 <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Flower-Bomb-II.jpg"
              title="Flower-Bomb-II"
           price='60'
              newprice='8'
              category='flower pots'
              
            />

          
          </div>
        </div>
        {loginStatus===true?<Link to='/viewProduct' className="btn btn-success mb-2">Explore More</Link>:<Link to='/Login' className="btn btn-success mb-2">Explore More</Link>}
        <h2 className="fw-bold">Most Loved Collections</h2>

      </section>
     {/* <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
  <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto', padding: 0 }}>
   
    <img
      src={Banner}
      className='img-fluid'
      alt=""
      style={{ objectFit: 'cover', objectPosition: 'center', maxHeight: '100%', width: '100%' }}
    />
    <button type="button" className="close" aria-label="Close" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '9999' }} onClick={handleCloseModal}>
      <IoMdCloseCircle />
    </button>
  </Modal.Body>
</Modal>  */}


      <section className="text-center py-5" id="gallery">
        {/* <img src={dealImg} className="img-fluid mb-2" alt="" /> */}
        <div className="container">
          <div className="row">
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/27-300x300.jpg"
              title="Peacock Glitter"
             category='sparkles'
              price="12.5"
              newprice='8'
              
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Magic-Buzz-300x300.jpg"
              title="Magic Buzz"
             category='flower pots'
              price="9"
              newprice='7'
              
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Ganga-jamuna.jpg"
              title="Ganga-jamuna"
             category='deluxe crackers'
              price="6"
              newprice='4'
              
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/1000-Wala-300x300.jpg"
              title="1000-Wala"
              category='flower pots'
              price="5"
              newprice='3.5'
              
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/5000-Wala-300x300.jpg"
              title="5000-Wala"
             category='flower pots'
              price="7.5"
              newprice="5"
              
            />
            <ProductCard
              imgSrc="https://ajantafireworks.co.in/wp-content/uploads/2021/07/Silver-gift-box-from-ajanta-300x300.jpg"
              title="Silver-gift-box"
             category='sparkles'
              price="8"
              newprice='6'
              
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
