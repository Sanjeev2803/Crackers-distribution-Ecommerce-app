import React, { useEffect, useState } from 'react'


import { Navbar, Nav, NavDropdown, Container, Modal } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { FaShopLock } from "react-icons/fa6";
import './MainNav.css'; // Create this CSS file for custom styling
import { useDispatch, useSelector } from 'react-redux';
import { clearAllListeners } from '@reduxjs/toolkit';
import { clearState } from './Redux/Slices/loginSlice';
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import logo from '../Images/logo.png'
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import Contact from './Contact';
import { clearCartItems } from './Redux/Slices/CartSlice';

function MainNav() {
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  const currentUser=useSelector((state)=>state?.login?.currentUser)
  const loginstatus=useSelector((state)=>state.login.loginStatus)
  const userType=useSelector((state)=>state?.login.userRole)
  const cartLength=useSelector((state)=>state?.cart.cartLength)
  const cartItems = useSelector((state) => state?.cart.cartItems);
  const [cartlength,setcartlength]=useState(currentUser?.Cart?.length)
  const [showAddProductModal, setShowAddProductModal] = useState(false);
   // State to control modal visibility
  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };
  const handleShowAddProductModal = () => {
    setShowAddProductModal(true);
  };
  useEffect(() => {
    // Perform some side effect when cartLength changes
    console.log("Cart length has changed:", cartLength);
    setcartlength(cartLength)
    // You can put any side effect logic here
  }, [cartLength])
  const logout=()=>{
    dispatch(clearState())
    dispatch(clearCartItems())
  }
  return (
//     <div>
    
//     <Navbar bg="dark" variant="dark" expand="lg">
//   <Container className='d-flex'>
//     <Navbar.Brand href="#home" className="text-orange-500 text-2xl font-bold">
//       CrackerShop
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="mr-auto">
//         <NavLink to='/Home' className="text-gray-300 hover:text-white transition duration-300 " style={{textDecoration:'none'}}>
//           Home
//         </NavLink>
//         <Nav.Link href="#shop" className="text-gray-300 hover:text-white transition duration-300">
//         <FaShopLock />shop
//         </Nav.Link>
//         <NavDropdown title="Categories" id="basic-nav-dropdown" className="text-gray-300">
//           <NavDropdown.Item href="#diwali">Diwali Specials</NavDropdown.Item>
//           <NavDropdown.Item href="#kids">Kids' Favorites</NavDropdown.Item>
//           <NavDropdown.Item href="#classic">Classic Collection</NavDropdown.Item>
//           <NavDropdown.Item href="#decor">Decor Items</NavDropdown.Item>
//           <NavDropdown.Item href="#gifts">Gift Sets</NavDropdown.Item>
//           {/* Add more categories as needed */}
//         </NavDropdown>
//         <Nav.Link href="#deals" className="text-gray-300 hover:text-white transition duration-300">
//           <IoSparkles/> Deals
//         </Nav.Link>
//       </Nav>
      
//       <Nav className="ml-auto"style={{ marginRight: '0' }}>
//       <NavLink to="/cart" className="text-orange-500 flex items-center hover:text-white transition duration-300">
//       <FaShoppingBag />
//       <span className='badge badge-warning' id='lblCartCount'>
//         {loginstatus ? cartlength : 0}
//       </span>
//         </NavLink>
//         {!loginstatus&&<Nav.Link href="/Login" className="text-orange-500 flex items-end hover:text-white transition duration-300">
//           Login/Register
//         </Nav.Link>}
//         {loginstatus&&<Nav.Link href="/Login" className="text-orange-500 flex items-end hover:text-white transition duration-300" onClick={logout}>
//           Logout
//         </Nav.Link>}
//       </Nav>
      
//     </Navbar.Collapse>
//   </Container>
// </Navbar>



//  </div>
 <div>
 <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="Coding Yaar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="d-lg-flex">
            
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">Home</Nav.Link>
          
            
          
            
          </Nav>
          <Nav className=''>
          <div className='ms-lg-auto d-lg-flex'>
            {!loginstatus&&<Nav.Link as={NavLink} to="/Login" activeClassName="active">Register/Login</Nav.Link>}
            {loginstatus&&<Nav.Link as={NavLink} to="/Login" activeClassName="active" onClick={logout}>Logout</Nav.Link>}
            <Nav.Link onClick={handleShowAddProductModal}>Contact us</Nav.Link>
            </div>
            </Nav>
            </div>
          <div className="search-and-icons">
            <form className="d-flex mb-2 me-2" role="search">
              <input className="form-control me-2" type="search" aria-label="Search" />
            </form>
            <div className="user-icons d-flex">
           { loginstatus===false?<div className="profile"><CgProfile size={32} /></div>:<div className="profile"><img src={currentUser?.profileImageUrl} alt="" className='image-fluid' style={{borderRadius:'50%',maxWidth:'3em'}}/></div>}
             
              {userType==='User'&&<div className="cart1"><FaShoppingBag  size={30} onClick={()=>{if(loginstatus){Navigate('/cart')}else{Navigate('/Login')}}}/>{loginstatus?<span class='badge badge-warning' id='lblCartCount'> {cartItems.length} </span>:<span class='badge badge-warning' id='lblCartCount'>0</span>}</div>}
              <div className="settings"><IoIosSettings size={32} onClick={()=>Navigate('/settings')}/></div>
              {loginstatus&&<Nav.Link as={NavLink} to="/orderHistory" activeClassName="active"><FaHistory size={32}/></Nav.Link>}

            </div>
          </div>
          <div className="contact-info d-md-flex">
            <p>+0987654321</p>
            <p><a href="mailto:">Cracklecrafts@sparkle.in</a></p>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <Modal show={showAddProductModal} onHide={handleCloseAddProductModal} centered>
        <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center' }}>
         
        </Modal.Header>
        <Modal.Body>
          <Contact/>
        </Modal.Body>
      </Modal>
    </div> 
  );
};

export default MainNav;
