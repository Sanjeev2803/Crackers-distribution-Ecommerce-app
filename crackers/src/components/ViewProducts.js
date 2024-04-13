import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "./LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, oldProduct, productDesc, relatedProducts, sellerCycle } from "./Redux/Slices/SellerSlice";
import { FaSearch } from "react-icons/fa";
import { FaHeart} from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import './ViewProducts.css'
import Editproducts from "./Editproducts";
import { Modal } from "react-bootstrap";
import { Toaster, toast } from 'sonner';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// ... (imports)

function ViewProducts() {
  const userType = useSelector((state) => state.login.userRole);
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectCategory,setselectCategory]=useState('')
  
const [currentPage, setCurrentPage] = useState(1);
const [price1,setprice1]=useState(0)
const [isAsc,setisAsc]=useState(false)
const [isdesc,setisdesc]=useState(false)
  const currentUser = useSelector((state) => state.login.currentUser);
  const [price2,setprice2]=useState(0)
  const [isCategoryChange,setisCategoryChange]=useState(false)
  const [ispriceFilterChange,setispriceFilterChange]=useState(false)
  const [search,setsearch]=useState('')
  const editproducts=useSelector((state=>state.seller.updatedProducts))
  const [showAddProductModal, setShowAddProductModal] = useState(false); 
  const handleEditClick = (product) => {
    // Call the onEdit function and pass the current product object
    onEdit({
      imgSrc: product.productImgUrl,
      title: product.ProductName,
      description: product.description,
      price: product.price,
      newprice: product.newprice, // Assuming this property exists
      category: product.Category,
    });
  };
  
  const handledeleteClick = (product) => {
    // Call the onDelete function and pass the current product object
    onDelete({
      imgSrc: product.productImgUrl,
      title: product.ProductName,
      description: product.description,
      price: product.price,
      newprice: product.newprice, // Assuming this property exists
      category: product.Category,
      SellerName: userType === 'Seller' ? currentUser.FirstName : '',
    });
  };
  const onEdit = (product) => {
    // Implementation for editing product
    console.log('Editing product:', product);

    dispatch(oldProduct(product));

    // dispatch(sellerCycle(product))

    handleShowAddProductModal();
  };

  const onDelete = (product) => {
    // Implementation for handling delete
    console.log('Deleting product:', product);
    toast.success('Item Deleted !!');
    dispatch(deleteProduct(product));
  };
  const handlePrice1=(e)=>{
    setprice1(e.target.value)
  }
  
  const handlePrice2=(e)=>{
    setprice2(e.target.value)
  }
  const getRandomRating = () => {
    // Generate a random rating between 3 and 5 (inclusive)
    return Math.floor(Math.random() * (5 - 3 + 1) + 3);
  };
  console.log(currentUser)
  const dispatch = useDispatch();
  
  const productsPerPage = 6;

  // Calculate the total number of pages based on the total number of products
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Get the subset of products for the current page
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const addItemtoCart = () => {
    // Implementation for adding item to cart
  };

  const handleEdit = (product) => {
    // Access the product data in this function
    console.log('Editing product:', product);
    
    

dispatch(oldProduct(product))

// dispatch(sellerCycle(product))

handleShowAddProductModal()

  };
  const handleDelete = (product) => {
    // Implementation for handling delete
    console.log("product is clicked",product)
    toast.success('Item Deleted !!')
    dispatch(deleteProduct(product))

  };
 

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const handleShowAddProductModal = () => {
    setShowAddProductModal(true);
  };
  const handleSearch = (e) => {
    const searchTerm=e.target.value.toLowerCase()
    setsearch(searchTerm);
    const searchProducts = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchTerm)
    );
    setProducts(searchProducts)
  };
  

  console.log(editproducts)
const handleCategory=(category)=>{
  setselectCategory((prevCategories)=>{
    if(prevCategories.includes(category)){
      return prevCategories.filter((c)=>c!==category)
    }
    else{
      return [...prevCategories,category]
    }
    
  })
  setCurrentPage(1);
  setisCategoryChange(true)
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userType === 'User') {
          const response = await axios.get('https://crackers-distribution-ecommerce-m5mbl03s8.vercel.app/user-api/userProducts');
          const productData = response.data.payload;
console.log(productData)
          const finalProduct = productData.map((product) => {
            const {  Products, ...rest } = product;
            return Products;
          });
          const modifiedProduct = finalProduct.flat();
          let filteredProducts = modifiedProduct;
          if (isAsc === true) {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
            console.log("asc",filteredProducts)
          } else if (isdesc === true) {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
          }
          if (selectCategory.length > 0 && isCategoryChange) {
            filteredProducts = filteredProducts.filter((product) => selectCategory.includes(product.Category));
          }
  
          // Apply price filter
          if (price1 > 0 && price2 > 0 && ispriceFilterChange) {
            filteredProducts = filteredProducts.filter((product) => product.price >= price1 && product.price <= price2);
          }
  
          setProducts(filteredProducts);
          
        } else if (userType === 'Seller') {
          
          setProducts(currentUser.Products);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [userType, currentUser.FirstName,selectCategory,price1,price2, editproducts,isCategoryChange,currentUser.Products, ispriceFilterChange,isAsc,isdesc]); // Added dependencies for useEffect
const handlePriceSubmit=()=>{
  const priceFilteredProducts=products.filter((product)=>product.price>=price1&&product.price<=price2)
  console.log(priceFilteredProducts)
  setispriceFilterChange(true)
}
const handlePriceSelectFilter=(e) => {
  const selectedValue = e.target.value;
  if (selectedValue === 'Low-High') {
    setisAsc(true);
    setisdesc(false);
  } else if (selectedValue === 'High-Low') {
    setisAsc(false);
    setisdesc(true);
  } else {
    setisAsc(false);
    setisdesc(false);
  }
}
const handleProductDesc=(product)=>{
  console.log('selected card',product)
  dispatch(productDesc(product))
  const relatedCategoryProducts=products.filter((allProduct)=>product!==allProduct&&allProduct.Category===product.Category)
console.log(relatedCategoryProducts)
dispatch(relatedProducts(relatedCategoryProducts))
  Navigate('/productDescription')
}

  return (

    <div>
        {userType==='Seller'&&<div><button className="d-flex justify-content-end btn btn-primary mt-2 mx-2 p-1 mb-2" onClick={()=>{Navigate('/sellerDashboard')}}>Back</button></div>}
      {userType==='User'&&<div className="container mt-4">
      <div className="d-flex justify-content-center mb-2">
  <div className="d-flex justify-content-center">
    <select
      className="form-select mb-2"
      aria-label="Default select example"
      onChange={handlePriceSelectFilter}
    >
      <option selected>Sort by Price</option>
      <option value="Low-High">Low-High</option>
      <option value="High-Low">High-Low</option>
    </select>
  </div>

  <div className="d-flex justify-content-center mx-1">
    <div className="input-group" style={{ maxWidth: '80%' }}>
      <input
        type="text"
        className="form-control"
        id="search"
        placeholder="Search here..."
        onChange={handleSearch}
      />
      <label className="input-group-text" htmlFor="search">
        <FaSearch className="" />
      </label>
    </div>
  </div>
</div>

          
    <div className="row">
      <div className="col-md-3 mb-3">
        {/* Sidebar content (Cart, Categories, Colors) */}
        <div id="sidebar">
          {/* Cart */}
          <h3>CART</h3>
          <div id="cart">
            <span className="empty">No items in cart.</span>
          </div>

          {/* Categories */}
          <h3>CATEGORIES</h3>
          <div className=''>
  <div className="checklist categories">
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="newArrivals" onChange={()=>handleCategory('Aerial crackers')} checked={selectCategory.includes('Aerial crackers')} />
      <label className="form-check-label" htmlFor="newArrivals">Aerial crackers</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="accessories" onChange={()=>handleCategory('Gift box crackers')} checked={selectCategory.includes('Gift box crackers')} />
      <label className="form-check-label" htmlFor="accessories">Gift box crackers</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="bags" onChange={()=>handleCategory('Flower Pot')} checked={selectCategory.includes('Flower Pot')} />
      <label className="form-check-label" htmlFor="bags">Flower Pot</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="dresses" />
      <label className="form-check-label" htmlFor="dresses">Dresses</label>
    </div>
    {/* ... Remaining categories ... */}
  </div>

  {/* Colors */}
 
  <div className="checklist colors">
    <div className="row">
      {/* Colors checkboxes */}
      
      
    </div>
  </div>

  {/* Search Input */}
  
</div>


          {/* Colors */}
          <h3>COLORS</h3>
          <div className="checklist categories">
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="newArrivals" />
      <label className="form-check-label" htmlFor="newArrivals">New Arrivals</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="accessories" />
      <label className="form-check-label" htmlFor="accessories">Accessories</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="bags" />
      <label className="form-check-label" htmlFor="bags">Bags</label>
    </div>
    <div className="form-check form-check-inline d-lg-block">
      <input type="checkbox" className="form-check-input" id="dresses" />
      <label className="form-check-label" htmlFor="dresses">Dresses</label>
    </div>
    {/* ... Remaining categories ... */}
  </div>
        </div>
 
        
            <div className="btn-group-vertical">
           
            {/* Add more buttons as needed */}
          </div>
          <div class="d-lg-block mt-4 mb-4">
    <div class="wrapper">
      <header>
        <h2>Price Range</h2>
        <p>Use slider or enter min and max price</p>
      </header>
      <div class="price-input">
        <div class="field">
          <span>Min</span>
          <input type="number" class="input-min" value={price1}/>
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>Max</span>
          <input type="number" class="input-max" value={price2}/>
        </div>
      </div>
      <div class="slider">
        <div class="progress"></div>
      </div>
      <div class="range-input">
        <input type="range" class="range-min" min="10" max="300" onChange={handlePrice1} step={10} />
        <input type="range" class="range-max" min={price1} max="300" onChange={handlePrice2} step={10} />
      </div>
      <div className="d-flex justify-content-center">
<button className="btn btn-success mt-2 "onClick={handlePriceSubmit} >Apply</button></div>
    </div>
  </div>
</div>
      <div className="col-md-9">
        {/* Product Grid */}
        <div className="row">
          {/* Product 1 */}
          
          {currentProducts?.map((product,i) => (
           <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" onClick={()=>handleProductDesc(product)}>
         
           <div className="card">
             <img src={product.productImgUrl} className="card-img-top" alt="Product" />
             <div className="card-body">
               <h5 className="card-title">{product.ProductName}</h5>
               <h6>{product.Category}</h6>
               <p className="card-text">₹{product.price}</p>
               <p className="card-text">{product.description}</p>
               <span>Rating: {Array.from({ length: getRandomRating() }, (_, index) => (
  <IoStarSharp key={index} />
))}</span>
<div className="d-flex justify-content-between"><FaShoppingBag/><FaHeart/></div>
             </div>
           </div>
         </div>
        ))}

         
        </div>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''} mx-1`}>
                <Link
                  className="page-link"
                  
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
      </div>
    </div>
  </div>
      }
      {userType==='Seller'&&
      <div className="row">
      {editproducts?.length <= 0 &&
        products?.map((product, i) => (
          
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" key={i}>
         
         <div className="card">
           <img src={product.productImgUrl} className="card-img-top" alt="Product" />
           <div className="card-body">
             <h5 className="card-title">{product.ProductName}</h5>
             <h6>{product.Category}</h6>
             <p className="card-text">₹{product.price}</p>
             <p className="card-text">{product.description}</p>
             
<div className="d-flex justify-content-between"><FaEdit onClick={()=>handleEditClick(product)}/><MdDelete onClick={()=>handledeleteClick(product)}/></div>
           </div>
         </div>
       </div>
          
        ))}
      {editproducts?.length > 0 &&
        editproducts?.map((product, i) => (
          
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3" key={i}>
         
          <div className="card">
            <img src={product.productImgUrl} className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">{product.ProductName}</h5>
              <h6>{product.Category}</h6>
              <p className="card-text">₹{product.price}</p>
              <p className="card-text">{product.description}</p>
              
 <div className="d-flex justify-content-between"><FaEdit onClick={()=>handleEditClick(product)}/><MdDelete onClick={()=>handledeleteClick(product)}/></div>
            </div>
          </div>
        </div>
        ))}
         
    </div>
    
}
<Modal show={showAddProductModal} onHide={handleCloseAddProductModal} centered>
        <Modal.Header closeButton style={{display:'flex',justifyContent:'center'}}>
          <Modal.Title >Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Editproducts/>
        </Modal.Body>
      </Modal>
      <Toaster richColors />
    </div>
  );
}

export default ViewProducts;
